import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { iconFile, slugify } from '../apps';
import { icons, platforms } from '../icons';

export interface PlatformSummary {
    slug: string;
    name: string;
    icon: string;
    count: number;
    preview: string[];
}

export interface Data {
    platforms: PlatformSummary[];
    stickers: string[];
}

declare const data: Data;
export { data };

const page = (slug: string) => fileURLToPath(new URL(`../../${slug}/index.md`, import.meta.url));

export default {
    watch: platforms.map((p) => `../../${p.slug}/index.md`),
    load(): Data {
        const apps = platforms.map((p) =>
            [...readFileSync(page(p.slug), 'utf8').matchAll(/^### (.+)\n((?:- .*\n?)*)/gm)].map((m) => ({
                icon: iconFile(slugify(m[1].trim())),
                discontinued: /^- Tags:.*\bDiscontinued\b/im.test(m[2]),
            })),
        );
        // The home page shouldn't show off apps that are no longer maintained
        const showcase = (list: typeof apps[number]) => list.flatMap((a) => (a.icon && !a.discontinued ? [a.icon] : []));

        // Interleave platforms so the hero mixes them
        const seen = new Set<string>();
        const stickers: string[] = [];
        const lists = apps.map(showcase);
        for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) {
            for (const list of lists) {
                const icon = list[i];
                if (icon && !seen.has(icon)) stickers.push(icon);
                if (icon) seen.add(icon);
            }
        }

        return {
            platforms: platforms.map((p, i) => ({
                slug: p.slug,
                name: 'title' in p ? p.title : p.name,
                icon: icons[p.icon],
                count: apps[i].length,
                preview: lists[i].slice(0, 4),
            })),
            stickers: stickers.slice(0, 16),
        };
    },
};
