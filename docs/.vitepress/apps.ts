import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { MarkdownRenderer } from 'vitepress';
import { categoryIcon, icons, platforms, type IconName } from './icons';

type Token = ReturnType<MarkdownRenderer['parse']>[number];
type StateCore = Parameters<Parameters<MarkdownRenderer['core']['ruler']['push']>[1]>[0];

const iconDir = fileURLToPath(new URL('../public/icons/', import.meta.url));
const platformSlugs: readonly string[] = platforms.map((p) => p.slug);

export const slugify = (name: string) =>
    name
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

export function iconFile(slug: string) {
    for (const ext of ['svg', 'webp']) {
        if (existsSync(`${iconDir}${slug}.${ext}`)) return `/icons/${slug}.${ext}`;
    }
}

/** Link fields an app can have in the `apps` frontmatter, in the words used for button tooltips */
const linkFields = {
    website: { text: 'Website', icon: 'globe' },
    source: { text: 'Source code', icon: 'code' },
    'f-droid': { text: 'F-Droid', icon: 'fdroid' },
    'f-droid repo': { text: 'F-Droid repo', icon: 'fdroid' },
    'google play': { text: 'Google Play', icon: 'googleplay' },
    'app store': { text: 'App Store', icon: 'appstore' },
    apk: { text: 'APK', icon: 'android' },
    sidestore: { text: 'SideStore', icon: 'download' },
    telegram: { text: 'Telegram', icon: 'telegram' },
    repo: { text: 'Jailbreak repo', icon: 'package' },
    download: { text: 'Download', icon: 'download' },
} satisfies Record<string, { text: string; icon: IconName }>;

type LinkField = keyof typeof linkFields;

export interface Link {
    field: LinkField;
    url: string;
    /** Set for labeled values like `download: { install script: <url> }` */
    label?: string;
}

export interface App {
    name: string;
    purpose?: string;
    tags: string[];
    links: Link[];
    /** Values that aren't URLs, e.g. `source: No longer available` */
    notes: { field: LinkField; text: string }[];
    install?: { note?: string; commands: { lang: string; code: string }[] };
    forks: App[];
}

export interface Category {
    name: string;
    apps: App[];
}

const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

function str(x: unknown, where: string) {
    if (typeof x !== 'string' || !x.trim()) throw new Error(`${where}: expected text, got ${JSON.stringify(x)}`);
    return x.trim();
}

function parseApp(name: string, raw: unknown, where: string): App {
    where = `${where} › ${name}`;
    const app: App = { name, tags: [], links: [], notes: [], forks: [] };
    if (raw == null) return app;
    if (!isRecord(raw)) throw new Error(`${where}: expected fields, got ${JSON.stringify(raw)}`);

    for (const [key, value] of Object.entries(raw)) {
        const at = `${where} › ${key}`;
        if (key === 'purpose') app.purpose = str(value, at);
        else if (key === 'tags') {
            if (!Array.isArray(value)) throw new Error(`${at}: expected a list like [Discontinued]`);
            app.tags = value.map((tag) => str(tag, at));
        } else if (key === 'forks') {
            if (!isRecord(value)) throw new Error(`${at}: expected apps`);
            app.forks = Object.entries(value).map(([fork, fields]) => parseApp(fork, fields, at));
        } else if (key === 'install') {
            if (!isRecord(value)) throw new Error(`${at}: expected a note and commands by language`);
            const { note, ...commands } = value;
            app.install = {
                note: note === undefined ? undefined : str(note, at),
                commands: Object.entries(commands).map(([lang, code]) => ({ lang, code: str(code, `${at} › ${lang}`) })),
            };
        } else if (key in linkFields) {
            const field = key as LinkField;
            for (const item of Array.isArray(value) ? value : [value]) {
                const entries: [string | undefined, unknown][] = isRecord(item) ? Object.entries(item) : [[undefined, item]];
                for (const [label, v] of entries) {
                    const text = str(v, at);
                    if (!/^https?:\/\//.test(text)) app.notes.push({ field, text });
                    else if (URL.canParse(text)) app.links.push({ field, url: text, label });
                    else throw new Error(`${at}: invalid URL ${text}`);
                }
            }
        } else {
            throw new Error(`${at}: unknown field. Use one of: purpose, tags, install, forks, ${Object.keys(linkFields).join(', ')}`);
        }
    }
    return app;
}

/** Reads the `apps` frontmatter of a platform page: categories of apps, both in file order */
export function parseApps(raw: unknown, where: string): Category[] {
    if (raw == null) return [];
    if (!isRecord(raw)) throw new Error(`${where}: "apps" must map category names to apps`);
    return Object.entries(raw).map(([name, apps]) => {
        if (apps != null && !isRecord(apps)) throw new Error(`${where} › ${name}: expected apps`);
        return { name, apps: Object.entries(apps ?? {}).map(([app, fields]) => parseApp(app, fields, `${where} › ${name}`)) };
    });
}

function sourceIcon(url: string): IconName {
    const host = new URL(url).hostname;
    if (host === 'github.com') return 'github';
    if (host === 'codeberg.org') return 'codeberg';
    if (host === 'invent.kde.org') return 'kde';
    if (host.includes('sourceforge')) return 'sourceforge';
    if (host.includes('gitlab')) return 'gitlab';
    return 'code';
}

/** Button icon and tooltip for a link */
function linkMeta({ field, url, label }: Link): { icon: IconName; text: string } {
    const meta: { icon: IconName; text: string } =
        field === 'source' ? { icon: sourceIcon(url), text: linkFields.source.text }
        : field === 'download' && new URL(url).hostname === 'apps.microsoft.com' ? { icon: 'windows', text: 'Microsoft Store' }
        : linkFields[field];
    return label ? { ...meta, text: `${meta.text} (${label})` } : meta;
}

// Stable per-name hash, so monogram colors and sticker tilt don't change between builds
const hash = (name: string) => [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 3600, 7);

/**
 * Turns the `apps` frontmatter of platform pages into a gallery: every category becomes a panel
 * with an `<h2>`, and every app a card with an `<h3>` and icon buttons. Forks are `<h4>` sub-entries inside their card.
 * The headings are real Markdown headings, so they get anchors, show up in search, and can be linked to.
 */
export function appCards(md: MarkdownRenderer) {
    const esc = md.utils.escapeHtml;

    function iconHtml(name: string) {
        const icon = iconFile(slugify(name));
        const h = hash(name);
        const tilt = `--tilt: ${(h % 7) - 3}deg`;
        return icon
            ? `<img class="app-icon" src="${icon}" style="${tilt}" alt="" width="44" height="44" loading="lazy" decoding="async">`
            : `<span class="app-icon app-icon-mono" style="${tilt}; --hue: ${h % 360}" aria-hidden="true">${esc([...name][0].toUpperCase())}</span>`;
    }

    function detailsHtml(app: App) {
        const tags = app.tags.map((tag) => `<span class="app-tag" data-tag="${esc(slugify(tag))}">${esc(tag)}</span>`).join('');
        const notes = [
            ...(app.install?.note ? [`Install: ${app.install.note}`] : []),
            ...app.notes.map((n) => `${linkFields[n.field].text}: ${n.text}`),
        ];
        const links = app.links.map((link) => {
            const { icon, text } = linkMeta(link);
            return `<a class="app-link" href="${esc(link.url)}" target="_blank" rel="noreferrer" aria-label="${esc(text)}" data-tip="${esc(text)}">${icons[icon]}</a>`;
        });
        return (tags ? `<span class="app-tags">${tags}</span>` : '') +
            (app.purpose ? `<p class="app-purpose">${esc(app.purpose)}</p>` : '') +
            notes.map((n) => `<p class="app-note">${esc(n)}</p>`).join('') +
            (links.length ? `<div class="app-links">${links.join('')}</div>` : '');
    }

    function tokens(state: StateCore, categories: Category[]) {
        const out: Token[] = [];
        const html = (content: string) => {
            const t = new state.Token('html_block', '', 0);
            t.content = content;
            out.push(t);
        };
        const heading = (level: number, text: string) => {
            const tag = `h${level}`;
            const open = new state.Token('heading_open', tag, 1);
            open.markup = '#'.repeat(level);
            open.block = true;
            // The core "inline" rule parses this into children, like any heading text
            const inline = new state.Token('inline', '', 0);
            inline.content = text;
            inline.children = [];
            const close = new state.Token('heading_close', tag, -1);
            close.markup = open.markup;
            close.block = true;
            out.push(open, inline, close);
        };

        categories.forEach((category, i) => {
            // Big categories span all columns, so they don't tower over the rest
            const wide = category.apps.length >= 6 ? ' app-group-wide' : '';
            html(`${i ? '</section>' : '<div class="app-groups">'}<section class="app-group${wide}">`);
            heading(2, category.name);
            for (const app of category.apps) {
                // Details are the heading's siblings, so search excerpts show them
                html(`<article class="app-card">${iconHtml(app.name)}<div class="app-body">`);
                heading(3, app.name);
                html(detailsHtml(app));
                for (const fork of app.forks) {
                    html('<div class="app-sub">');
                    heading(4, fork.name);
                    html(`${detailsHtml(fork)}</div>`);
                }
                html('</div>');
                // Install commands stay inside the card, below the links
                for (const { lang, code } of app.install?.commands ?? []) {
                    const fence = new state.Token('fence', 'code', 0);
                    fence.info = lang;
                    fence.markup = '```';
                    fence.content = `${code}\n`;
                    fence.block = true;
                    out.push(fence);
                }
                html('</article>');
            }
        });
        if (categories.length) html('</section></div>');
        return out;
    }

    const platformOf = (state: StateCore) => {
        const dir = String(state.env.relativePath ?? '').split('/')[0];
        return platformSlugs.includes(dir) ? dir : undefined;
    };

    // Before "inline", so the heading texts get parsed, and before the anchor plugin, so they get ids
    md.core.ruler.after('block', 'app_cards', (state) => {
        const dir = platformOf(state);
        if (!dir) return;
        state.tokens.push(...tokens(state, parseApps(state.env.frontmatter?.apps, `${dir}/index.md`)));
    });

    md.core.ruler.push('app_headings', (state) => {
        if (!platformOf(state)) return;
        const src = state.tokens;
        const isHeading = (t: Token | undefined, ...tags: string[]) => t?.type === 'heading_open' && tags.includes(t.tag);

        // Category index: replaces the scroll-spy outline, which can't follow a column layout.
        // Kept out of the search index, where the chips would match nearly every query
        if (!state.env.searchIndex) {
            const groups: { id: string; name: string; apps: number }[] = [];
            for (let i = 0; i < src.length; i++) {
                if (isHeading(src[i], 'h2')) groups.push({ id: src[i].attrGet('id') ?? '', name: src[i + 1].content, apps: 0 });
                else if (isHeading(src[i], 'h3') && groups.length) groups[groups.length - 1].apps++;
            }
            const total = groups.reduce((n, g) => n + g.apps, 0);
            const index = groups
                .map((g) => `<a class="app-index-link" href="#${esc(g.id)}">${categoryIcon(g.name)}${esc(g.name)} <span>${g.apps}</span></a>`)
                .join('');
            const h1 = src.findIndex((t) => t.type === 'heading_close' && t.tag === 'h1');
            const meta = new state.Token('html_block', '', 0);
            meta.content = `<p class="platform-meta">${total} apps in ${groups.length} categories</p>` +
                `<nav class="app-index" aria-label="Categories">${index}</nav>`;
            if (h1 >= 0) src.splice(h1 + 1, 0, meta);
        }

        // Keep each heading's copy-link button glued to the last word, so it can be
        // centered with flexbox (consistent across browsers) and never wraps alone.
        // Skipped for the search index: VitePress only splits sections at headings that end in `</a></hN>`.
        for (let i = 0; !state.env.searchIndex && i < src.length; i++) {
            const kids = isHeading(src[i], 'h2', 'h3', 'h4') ? src[i + 1].children ?? [] : [];
            let k = kids.findIndex((x) => x.type === 'link_open' && x.attrGet('class')?.includes('header-anchor'));
            // The anchor plugin adds the space before the button as its own token; drop it (the gap replaces it)
            if (kids[k - 1]?.type === 'text' && !kids[k - 1].content.trim()) kids.splice(--k, 1);
            const end = kids.findIndex((x, j) => j > k && x.type === 'link_close');
            const last = /^(.*?)(\S+)\s*$/s.exec(kids[k - 1]?.type === 'text' ? kids[k - 1].content : '');
            if (k < 1 || end < 0 || !last) continue;
            // The anchor's zero-width-space symbol would end up in "On this page" titles; the icon comes from CSS
            for (const x of kids.slice(k + 1, end)) if (x.type === 'html_inline') x.content = '';
            const inline = (type: string, content: string) => {
                const t = new state.Token(type, '', 0);
                t.content = content;
                return t;
            };
            kids.splice(k - 1, end - k + 2,
                inline('text', last[1]),
                inline('html_inline', '<span class="anchor-tail">'),
                inline('text', last[2]),
                ...kids.slice(k, end + 1),
                inline('html_inline', '</span>'));
            // Category icon inside the heading, so the cards are the heading's next siblings
            // (that's what VitePress shows as search excerpts); "ignore-header" keeps it out of "On this page"
            if (src[i].tag === 'h2') {
                kids.unshift(inline('html_inline', `<span class="app-group-icon ignore-header">${categoryIcon(src[i + 1].content)}</span><span class="heading-text">`));
                kids.push(inline('html_inline', '</span>'));
            }
        }
    });
}
