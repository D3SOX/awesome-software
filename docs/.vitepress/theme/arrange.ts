/*
 * Masonry for the category panels. CSS columns (the no-JS fallback) balance badly when panels
 * can't be split, leaving long empty stretches, and a plain grid leaves holes below short panels.
 * Here each panel, in order, goes into the currently shortest column, so columns end close
 * together and reading order runs across the top. Full-width panels (big categories) split
 * the flow into separate segments.
 *
 * config.ts also inlines these functions into the built pages, where they run before the first paint
 * instead of after hydration. So they must not use anything outside their own body. The state lives
 * on the element, so the theme picks up where the inline copy left off.
 */

type Root = HTMLElement & { masonry?: { groups: HTMLElement[]; cols: number; layout: string } };

/** Returns whether panels were moved. `remeasure` redistributes even if the column count is unchanged */
export function arrange(root: Root, remeasure = false) {
    const GAP = 16;
    const state = root.masonry;
    const groups = state?.groups ?? [...root.querySelectorAll<HTMLElement>('.app-group')];

    // The grid in custom.css decides how many columns fit
    const cols = getComputedStyle(root).gridTemplateColumns.split(' ').length;
    const sameCols = state?.cols === cols;
    if (sameCols && !remeasure) return false;

    // As direct children the panels are grid items of the final column width, so a single layout pass
    // gives every height (reading them one by one while moving panels would lay out the page each time).
    // Panels already stacked in columns of that width can be measured where they are.
    if (state && !sameCols) root.replaceChildren(...groups);
    if (cols === 1) {
        root.masonry = { groups, cols, layout: '' };
        return Boolean(state) && !sameCols;
    }
    const heights = groups.map((group) => group.offsetHeight);

    // Each panel's column, or -1 for a full-width one
    const placement: number[] = [];
    let filled: number[] = [];
    groups.forEach((group, i) => {
        if (group.classList.contains('app-group-wide')) {
            placement.push(-1);
            filled = [];
            return;
        }
        if (!filled.length) filled = Array<number>(cols).fill(0);
        const shortest = filled.indexOf(Math.min(...filled));
        filled[shortest] += heights[i] + GAP;
        placement.push(shortest);
    });
    const layout = placement.join();
    root.masonry = { groups, cols, layout };
    if (sameCols && state.layout === layout) return false;

    const children: HTMLElement[] = [];
    let columns: HTMLElement[] = [];
    groups.forEach((group, i) => {
        if (placement[i] < 0) {
            columns = [];
            children.push(group);
            return;
        }
        if (!columns.length) {
            const segment = document.createElement('div');
            segment.className = 'app-masonry';
            columns = Array.from({ length: cols }, () => segment.appendChild(document.createElement('div')));
            for (const column of columns) column.className = 'app-masonry-column';
            children.push(segment);
        }
        columns[placement[i]].append(group);
    });
    root.replaceChildren(...children);
    return true;
}

/** Headings carry a scroll-margin matching VitePress's anchor offset */
export function scrollToHash() {
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
}
