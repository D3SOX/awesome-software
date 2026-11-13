import { createContentLoader } from 'vitepress';
import { appAnchors, iconFile, parseApps, slugify } from '../apps';
import { icons, platforms } from '../icons';

export interface PlatformSummary {
    slug: string;
    name: string;
    icon: string;
    count: number;
    preview: string[];
}

export interface Sticker {
    name: string;
    src: string;
    /** The app's card on its platform page */
    href: string;
}

export interface Data {
    platforms: PlatformSummary[];
    /** Sticker candidates, one list per platform */
    stickers: Sticker[][];
}

declare const data: Data;
export { data };

export default createContentLoader(platforms.map((p) => `${p.slug}/index.md`), {
    transform(pages): Data {
        const apps = platforms.map((p) => {
            const page = pages.find((x) => x.url === `/${p.slug}/`);
            const categories = parseApps(page?.frontmatter.apps, `${p.slug}/index.md`);
            const anchors = appAnchors('title' in p ? p.title : p.name, categories);
            return categories
                .flatMap((c) => c.apps)
                .map((a) => ({
                    name: a.name,
                    href: `/${p.slug}/#${anchors.get(a)}`,
                    icon: iconFile(slugify(a.name)),
                    discontinued: a.tags.includes('Discontinued'),
                }));
        });
        // The home page shouldn't show off apps that are no longer maintained
        const showcase = (list: typeof apps[number]) =>
            list.flatMap(({ name, href, icon, discontinued }) => (icon && !discontinued ? [{ name, href, src: icon }] : []));
        const lists = apps.map(showcase);

        return {
            platforms: platforms.map((p, i) => ({
                slug: p.slug,
                name: 'title' in p ? p.title : p.name,
                icon: icons[p.icon],
                count: apps[i].length,
                preview: lists[i].slice(0, 4).map((s) => s.src),
            })),
            stickers: lists,
        };
    },
});
