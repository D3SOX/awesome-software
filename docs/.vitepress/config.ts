import { defineConfig } from "vitepress";
import { appCards } from "./apps";
import { categoryIconCss, icons, platforms } from "./icons";

export default defineConfig({
    lang: 'en-US',
    title: 'Awesome Software',
    description: 'Some recommendations regarding software for desktop and mobile',

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        ['script', { defer: '', 'data-domain': 'awesome-software.d3sox.me', src: 'https://analytics.soundux.rocks/js/script.js' }]
    ],

    lastUpdated: true,
    markdown: {
        config: (md) => md.use(appCards),
    },
    vue: {
        template: {
            // App icons are public files. Left as plain URLs they stay out of the module graph; as imports,
            // the ones shared between pages end up in tiny chunks that every navigation has to fetch first
            transformAssetUrls: { includeAbsolute: false },
        },
    },
    vite: {
        plugins: [{
            name: 'category-icons',
            resolveId: (id) => (id === 'virtual:category-icons.css' ? '\0category-icons.css' : undefined),
            load: (id) => (id === '\0category-icons.css' ? categoryIconCss() : undefined),
        }],
    },
    cleanUrls: true,

    themeConfig: {
        nav: platforms.map((p) => ({
            text: `${icons[p.icon]}<span>${p.name}</span>`,
            link: `/${p.slug}/`,
        })),

        editLink: {
            pattern: 'https://github.com/D3SOX/awesome-software/edit/master/docs/:path',
        },

        logo: '/favicon.svg',

        notFound: {
            title: 'This page doesn’t exist',
            quote: 'It may have moved. Pick a platform in the menu, or start from the home page.',
            linkText: 'Go to the home page',
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/D3SOX/awesome-software' },
        ],

        footer: {
            message: 'Made by D3SOX with ❤️',
        },

        search: {
            provider: 'local',
            options: {
                // Always show excerpts; the theme also hides the list/detail toggle
                detailedView: true,
                // Lets the cards plugin render headings the way the search splitter expects
                _render(src, env, md) {
                    const searchEnv = { ...env, searchIndex: true };
                    const html = md.render(src, searchEnv);
                    return searchEnv.frontmatter?.search === false ? '' : html;
                },
            },
        }
    },
});
