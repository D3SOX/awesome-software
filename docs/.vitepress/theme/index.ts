import DefaultTheme from 'vitepress/theme-without-fonts';
import type { Theme } from 'vitepress';
import { defineComponent, h } from 'vue';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/archivo/wdth-italic.css';
import HeroStickers from './HeroStickers.vue';
import PlatformShelf from './PlatformShelf.vue';
import StickerPile from './StickerPile.vue';
import { useMasonry } from './masonry';
import { useMotion } from './motion';
import './custom.css';
import 'virtual:category-icons.css';

/** Briefly rings the category panel or app card a `#hash` points to, so it's easy to spot after scrolling */
function flash(hash: string) {
    const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    target?.closest('.app-sub, .app-card, .app-group')?.animate(
        [{ opacity: 1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }],
        { duration: 1600, easing: 'ease-out', pseudoElement: '::before' },
    );
}

/**
 * Copies synchronously inside the click. The async Clipboard API only exists on HTTPS
 * and localhost, so plain-HTTP previews (e.g. a dev server on a LAN IP) would fail with it.
 */
function copyText(text: string) {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.cssText = 'position:fixed;opacity:0';
    document.body.append(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
}

function onClick(event: MouseEvent) {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || link.pathname !== location.pathname) return;
    flash(link.hash);
    // Header anchors on categories and apps copy their link; without clipboard access they still navigate
    if (link.matches('.app-group .header-anchor') && copyText(link.href)) {
        link.classList.add('copied');
        setTimeout(() => link.classList.remove('copied'), 1500);
    }
}

export default {
    extends: DefaultTheme,
    Layout: defineComponent({
        setup() {
            useMasonry();
            useMotion();
            return () => h(DefaultTheme.Layout, null, {
                'home-hero-image': () => h(HeroStickers),
            });
        },
    }),
    enhanceApp({ app, router }) {
        app.component('PlatformShelf', PlatformShelf);
        app.component('StickerPile', StickerPile);
        if (typeof window === 'undefined') return;
        document.addEventListener('click', onClick);
        // Detailed search results are the only view (toggle hidden); override a list view saved from before
        localStorage.setItem('vitepress:local-search-detailed-list', 'true');
        // Search results and links from other pages
        router.onAfterRouteChange = () => requestAnimationFrame(() => flash(location.hash));
        // A shared link opened directly
        window.addEventListener('load', () => flash(location.hash), { once: true });
    },
} satisfies Theme;
