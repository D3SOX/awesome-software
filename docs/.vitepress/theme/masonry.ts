import { onContentUpdated } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';
import { arrange, scrollToHash } from './arrange';

export function useMasonry() {
    let observer: ResizeObserver | undefined;

    const setup = () => {
        observer?.disconnect();
        const root = document.querySelector<HTMLElement>('.app-groups');
        if (!root) return;
        // A #link was scrolled to before the panels moved, so scroll to it again
        if (arrange(root)) scrollToHash();
        observer = new ResizeObserver(() => arrange(root));
        observer.observe(root);
        // Heights change once the web font is in, so redistribute with the final sizes
        if (document.fonts?.status === 'loading') document.fonts.ready.then(() => arrange(root, true) && scrollToHash());
    };

    onMounted(setup);
    onContentUpdated(setup);
    onUnmounted(() => observer?.disconnect());
}
