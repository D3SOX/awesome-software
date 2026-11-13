import { onContentUpdated } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';

/*
 * Masonry for the category panels. CSS columns (the no-JS fallback) balance badly when panels
 * can't be split, leaving long empty stretches, and a plain grid leaves holes below short panels.
 * Here each panel, in order, goes into the currently shortest column, so columns end close
 * together and reading order runs across the top. Full-width panels (big categories) split
 * the flow into separate segments.
 */

const GAP = 16;

const original = new WeakMap<HTMLElement, HTMLElement[]>();
const columnCount = new WeakMap<HTMLElement, number>();

/** Returns whether panels were moved */
function arrange(root: HTMLElement, force = false) {
    const first = !original.has(root);
    if (first) original.set(root, [...root.querySelectorAll<HTMLElement>('.app-group')]);
    const groups = original.get(root) ?? [];

    // The grid in custom.css decides how many columns fit
    const cols = getComputedStyle(root).gridTemplateColumns.split(' ').length;
    if (!force && columnCount.get(root) === cols) return false;
    columnCount.set(root, cols);

    // As direct children the panels are grid items of the final column width, so a single layout pass
    // gives every height (reading them one by one while moving panels would lay out the page each time)
    if (!first) root.replaceChildren(...groups);
    if (cols === 1) return true;
    const heights = groups.map((group) => group.offsetHeight);

    let columns: HTMLElement[] = [];
    let filled: number[] = [];
    groups.forEach((group, i) => {
        if (group.classList.contains('app-group-wide')) {
            columns = [];
            return;
        }
        if (!columns.length) {
            const segment = document.createElement('div');
            segment.className = 'app-masonry';
            columns = Array.from({ length: cols }, () => segment.appendChild(document.createElement('div')));
            for (const column of columns) column.className = 'app-masonry-column';
            filled = columns.map(() => 0);
            group.before(segment);
        }
        const shortest = filled.indexOf(Math.min(...filled));
        filled[shortest] += heights[i] + GAP;
        columns[shortest].append(group);
    });
    return true;
}

/** Headings carry a scroll-margin matching VitePress's anchor offset */
function scrollToHash() {
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
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
        if (document.fonts?.status === 'loading') document.fonts.ready.then(() => arrange(root, true) && scrollToHash());
    };

    onMounted(setup);
    onContentUpdated(setup);
    onUnmounted(() => observer?.disconnect());
}
