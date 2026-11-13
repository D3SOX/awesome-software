import { onContentUpdated } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';

/*
 * Masonry for the category panels. CSS columns (the no-JS fallback) balance badly when panels
 * can't be split, leaving long empty stretches. Here each panel, in order, goes into the
 * currently shortest column, so columns end close together and reading order runs across the top.
 * Full-width panels (big categories) split the flow into separate segments.
 */

const GAP = 16;
const MIN_COLUMN_REM = 19;

const original = new WeakMap<HTMLElement, HTMLElement[]>();
const columnCount = new WeakMap<HTMLElement, number>();

/** Returns whether panels were moved */
function arrange(root: HTMLElement, force = false) {
    if (!original.has(root)) original.set(root, [...root.querySelectorAll<HTMLElement>('.app-group')]);
    const groups = original.get(root) ?? [];

    const minColumn = MIN_COLUMN_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const cols = Math.max(1, Math.floor((root.clientWidth + GAP) / (minColumn + GAP)));
    if (!force && columnCount.get(root) === cols) return false;
    columnCount.set(root, cols);

    root.classList.add('is-masonry');
    root.replaceChildren();
    let columns: HTMLElement[] = [];
    for (const group of groups) {
        if (group.classList.contains('app-group-wide')) {
            root.append(group);
            columns = [];
            continue;
        }
        if (!columns.length) {
            const segment = document.createElement('div');
            segment.className = 'app-masonry';
            columns = Array.from({ length: cols }, () => segment.appendChild(document.createElement('div')));
            for (const column of columns) column.className = 'app-masonry-column';
            root.append(segment);
        }
        const shortest = columns.reduce((a, b) => (b.offsetHeight < a.offsetHeight ? b : a));
        shortest.append(group);
    }
    return true;
}

/** Headings carry a scroll-margin matching VitePress's anchor offset */
function scrollToHash() {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView();
}

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
        document.fonts?.ready.then(() => arrange(root, true) && scrollToHash());
    };

    onMounted(setup);
    onContentUpdated(setup);
    onUnmounted(() => observer?.disconnect());
}
