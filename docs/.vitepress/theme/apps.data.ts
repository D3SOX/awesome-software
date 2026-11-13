import { createContentLoader } from 'vitepress';
import { iconFile, parseApps, slugify } from '../apps';
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
    /** Sticker candidates, one list per platform */
    stickers: string[][];
}

declare const data: Data;
export { data };

export default createContentLoader(platforms.map((p) => `${p.slug}/index.md`), {
    transform(pages): Data {
        const apps = platforms.map((p) => {
            const page = pages.find((x) => x.url === `/${p.slug}/`);
            return parseApps(page?.frontmatter.apps, `${p.slug}/index.md`)
                .flatMap((c) => c.apps)
                .map((a) => ({
                    icon: iconFile(slugify(a.name)),
                    discontinued: a.tags.includes('Discontinued'),
                }));
        });
        // The home page shouldn't show off apps that are no longer maintained
        const showcase = (list: typeof apps[number]) => list.flatMap((a) => (a.icon && !a.discontinued ? [a.icon] : []));
        const lists = apps.map(showcase);

        return {
            platforms: platforms.map((p, i) => ({
                slug: p.slug,
                name: 'title' in p ? p.title : p.name,
                icon: icons[p.icon],
                count: apps[i].length,
                preview: lists[i].slice(0, 4),
            })),
            stickers: lists,
        };
    },
});
