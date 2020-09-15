const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Awesome Software',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  ],

  /**
   * Specify this to use a custom theme
   *
   * ref：https://v1.vuepress.vuejs.org/config/#theme
   */
  theme: 'yuu',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    yuu: {
      defaultDarkTheme: true,
      defaultColorTheme: 'purple',
      disableThemeIgnore: true,
    },
    repo: 'https://github.com/D3SOX/awesome-software',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
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
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    'vuepress-plugin-smooth-scroll',
  ]
}
