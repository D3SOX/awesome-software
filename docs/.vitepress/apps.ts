import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { MarkdownRenderer } from 'vitepress';
import { categoryIcon, icons, platforms, type IconName } from './icons';

type Token = ReturnType<MarkdownRenderer['parse']>[number];

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

function sourceIcon(url: string): IconName {
    const host = new URL(url).hostname;
    if (host === 'github.com') return 'github';
    if (host === 'codeberg.org') return 'codeberg';
    if (host === 'invent.kde.org') return 'kde';
    if (host.includes('sourceforge')) return 'sourceforge';
    if (host.includes('gitlab')) return 'gitlab';
    return 'code';
}

/** Maps a list label like "Download (F-Droid)" to a button icon and tooltip */
function linkMeta(label: string, url: string): { icon: IconName; text: string } {
    const store = /\(([^)]+)\)/.exec(label)?.[1];
    if (/^source/i.test(label)) return { icon: sourceIcon(url), text: store ? `Source code (${store.toLowerCase()})` : 'Source code' };
    if (/^website/i.test(label)) return { icon: 'globe', text: 'Website' };
    if (/^repo/i.test(label)) return { icon: 'package', text: 'Jailbreak repo' };
    if (new URL(url).hostname === 'apps.microsoft.com') return { icon: 'windows', text: 'Microsoft Store' };
    switch (store) {
        case 'F-Droid': return { icon: 'fdroid', text: 'F-Droid' };
        case 'F-Droid Repo': return { icon: 'fdroid', text: 'F-Droid repo' };
        case 'Play Store': return { icon: 'googleplay', text: 'Google Play' };
        case 'App Store': return { icon: 'appstore', text: 'App Store' };
        case 'APK': return { icon: 'android', text: 'APK' };
        case 'Telegram': return { icon: 'telegram', text: 'Telegram' };
        case 'XDA Labs': return { icon: 'xda', text: 'XDA Labs' };
        case undefined: return { icon: 'download', text: 'Download' };
        default: return { icon: 'download', text: store };
    }
}

// Stable per-name hash, so monogram colors and sticker tilt don't change between builds
const hash = (name: string) => [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 3600, 7);

/**
 * Turns platform pages into a gallery: every `## Category` becomes a panel,
 * and every `### App` with its link list becomes an entry with icon buttons.
 * A `#### Name` below an app (e.g. a fork) becomes a sub-entry inside its card.
 *
 * List items use `- Label: <url>`. Special labels: `Purpose` (description),
 * `Tags` (comma-separated badges). Values without a URL become notes, `None` is skipped.
 */
export function appCards(md: MarkdownRenderer) {
    const esc = md.utils.escapeHtml;

    /** Parses the bullet list at the start of `body`; `rest` is whatever follows it */
    function parseList(body: Token[]) {
        const listEnd = body[0]?.type === 'bullet_list_open'
            ? body.findIndex((x) => x.type === 'bullet_list_close' && x.level === 0)
            : -1;
        let purpose = '';
        let tags = '';
        const links: string[] = [];
        const notes: string[] = [];
        for (const t of body.slice(0, listEnd + 1)) {
            if (t.type !== 'inline') continue;
            const [, label = t.content, value = ''] = /^([^:]+):\s*(.*)$/.exec(t.content) ?? [];
            const link = /^<(https?:\/\/[^>]+)>\s*(.*)$/.exec(value);
            if (/^purpose$/i.test(label)) purpose = value;
            else if (/^tags$/i.test(label)) {
                tags = value.split(',').map((tag) => tag.trim()).filter(Boolean)
                    .map((tag) => `<span class="app-tag" data-tag="${esc(slugify(tag))}">${esc(tag)}</span>`)
                    .join('');
            } else if (link) {
                const [, url, suffix] = link;
                const meta = linkMeta(label, url);
                const tip = suffix ? `${meta.text} ${suffix}` : meta.text;
                links.push(`<a class="app-link" href="${esc(url)}" target="_blank" rel="noreferrer" aria-label="${esc(tip)}" data-tip="${esc(tip)}">${icons[meta.icon]}</a>`);
            } else if (value && !/^none$/i.test(value)) notes.push(`<p class="app-note">${esc(label)}: ${esc(value)}</p>`);
        }
        return {
            tags: tags ? `<span class="app-tags">${tags}</span>` : '',
            details: (purpose ? `<p class="app-purpose">${esc(purpose)}</p>` : '') + notes.join('') +
                (links.length ? `<div class="app-links">${links.join('')}</div>` : ''),
            rest: body.slice(listEnd + 1),
        };
    }

    function iconHtml(name: string) {
        const icon = iconFile(slugify(name));
        const h = hash(name);
        const tilt = `--tilt: ${(h % 7) - 3}deg`;
        return icon
            ? `<img class="app-icon" src="${icon}" style="${tilt}" alt="" width="44" height="44" loading="lazy" decoding="async">`
            : `<span class="app-icon app-icon-mono" style="${tilt}; --hue: ${h % 360}" aria-hidden="true">${esc([...name][0].toUpperCase())}</span>`;
    }

    md.core.ruler.push('app_cards', (state) => {
        const dir = String(state.env.relativePath ?? '').split('/')[0];
        if (!platformSlugs.includes(dir)) return;

        const src = state.tokens;
        const out: Token[] = [];
        const html = (content: string) => {
            const t = new state.Token('html_block', '', 0);
            t.content = content;
            return t;
        };
        const isHeading = (t: Token | undefined, ...tags: string[]) => t?.type === 'heading_open' && tags.includes(t.tag);

        // Category index: replaces the scroll-spy outline, which can't follow a column layout
        const groups: { id: string; name: string; apps: number }[] = [];
        for (let i = 0; i < src.length; i++) {
            if (isHeading(src[i], 'h2')) groups.push({ id: src[i].attrGet('id') ?? '', name: src[i + 1].content, apps: 0 });
            else if (isHeading(src[i], 'h3') && groups.length) groups[groups.length - 1].apps++;
        }
        const total = groups.reduce((n, g) => n + g.apps, 0);
        const index = groups
            .map((g) => `<a class="app-index-link" href="#${esc(g.id)}">${categoryIcon(g.name)}${esc(g.name)} <span>${g.apps}</span></a>`)
            .join('');

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

        let group = -1;

        for (let i = 0; i < src.length; i++) {
            const t = src[i];
            if (!isHeading(t, 'h1', 'h2', 'h3')) {
                out.push(t);
                continue;
            }
            const heading = src.slice(i, i + 3);
            i += 2;

            if (t.tag === 'h1') {
                out.push(...heading);
                // Kept out of the search index, where the chips would match nearly every query
                if (!state.env.searchIndex) out.push(html(
                    `<p class="platform-meta">${total} apps in ${groups.length} categories</p>` +
                    `<nav class="app-index" aria-label="Categories">${index}</nav>`,
                ));
            } else if (t.tag === 'h2') {
                group++;
                // Big categories span all columns, so they don't tower over the rest
                const wide = groups[group].apps >= 6 ? ' app-group-wide' : '';
                out.push(
                    html(group ? '</section>' : '<div class="app-groups">'),
                    html(`<section class="app-group${wide}">`),
                    ...heading,
                );
            } else {
                let end = i + 1;
                while (end < src.length && !isHeading(src[end], 'h1', 'h2', 'h3')) end++;
                const body = src.slice(i + 1, end);
                i = end - 1;

                const subs = body.flatMap((x, k) => (isHeading(x, 'h4') ? [k] : []));
                const app = parseList(body.slice(0, subs[0] ?? body.length));
                // Details are the heading's siblings, so search excerpts show them
                out.push(
                    html(`<article class="app-card">${iconHtml(heading[1].content)}<div class="app-body">`),
                    ...heading,
                    html(app.tags + app.details),
                );
                subs.forEach((start, k) => {
                    const sub = parseList(body.slice(start + 3, subs[k + 1] ?? body.length));
                    out.push(html('<div class="app-sub">'), ...body.slice(start, start + 3), html(`${sub.tags}${sub.details}</div>`));
                });
                // Anything after the list (e.g. install commands) stays inside the card
                out.push(html('</div>'), ...app.rest, html('</article>'));
            }
        }
        if (group >= 0) out.push(html('</section></div>'));
        state.tokens = out;
    });
}
