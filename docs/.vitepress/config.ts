import { defineConfig } from "vitepress";

export default defineConfig({
    lang: 'en-US',
    title: 'Awesome Software',
    description: 'Some recommendations regarding software for desktop and mobile',

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        ['script', { defer: '', 'data-domain': 'awesome-software.d3sox.me', src: 'https://analytics.soundux.rocks/js/script.js' }]
    ],

    lastUpdated: true,
    cleanUrls: 'without-subfolders',

    themeConfig: {
        nav: [
            {
                text: 'Android',
                link: '/android/',
            },
            {
                text: 'iOS',
                link: '/ios/',
            },
            {
                text: 'Cross-platform desktop',
                link: '/desktop/',
            },
            {
                text: 'Linux',
                link: '/linux/',
            },
            /*{
              text: 'macOS',
              link: '/macos/',
            },*/
            {
                text: 'Windows',
                link: '/windows/',
            },
        ],

        editLink: {
            pattern: 'https://github.com/D3SOX/awesome-software/edit/master/docs/:path',
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/D3SOX/awesome-software' },
        ],

        footer: {
            message: 'Made by D3SOX with ❤️',
        },
    },
});
