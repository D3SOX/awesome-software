import { useRoute } from 'vitepress';
import { onMounted, onUnmounted, watch } from 'vue';

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Slides the nav's active pill (`.VPNavBarMenu::after` in custom.css) from the previous platform
 * to the new one. CSS anchor positioning could place it, but Firefox doesn't animate anchor changes.
 */
function placePill(menu: HTMLElement) {
    const active = menu.querySelector<HTMLElement>('.VPNavBarMenuLink.active');
    const shown = menu.classList.contains('has-pill');
    if (!active) {
        menu.classList.remove('has-pill');
        return;
    }
    menu.style.setProperty('--pill-x', `${active.offsetLeft}px`);
    menu.style.setProperty('--pill-w', `${active.offsetWidth}px`);
    if (shown) return;
    // Coming from a page without an active link: appear in place instead of sliding in from the old spot
    void getComputedStyle(menu, '::after').left;
    menu.classList.add('has-pill');
}

export function useMotion() {
    const route = useRoute();
    let observer: ResizeObserver | undefined;
    const menu = () => document.querySelector<HTMLElement>('.VPNavBarMenu');

    onMounted(() => {
        const nav = menu();
        if (!nav) return;
        placePill(nav);
        // Labels hide at narrower widths, which resizes every link
        observer = new ResizeObserver(() => placePill(nav));
        observer.observe(nav);
    });
    onUnmounted(() => observer?.disconnect());

    watch(
        () => route.path,
        () => {
            const nav = menu();
            if (nav) placePill(nav);
            if (calm()) return;
            document.querySelector('.VPContent')?.animate(
                [{ opacity: 0, translate: '0 6px' }, { opacity: 1, translate: '0 0' }],
                { duration: 280, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
            );
        },
        { flush: 'post' },
    );
}
