import { withBase } from 'vitepress';
import { onMounted, ref } from 'vue';
import { data, type Sticker } from './apps.data';

function shuffle<T>(list: T[]) {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

/**
 * A fresh random pick of sticker icons on every visit, mixing platforms. Picked after mounting,
 * so the prerendered HTML (shared by all visits) and hydration agree on an empty list.
 * The icons are loaded before they're shown, so the slap-on animation never plays with missing images.
 */
export function useRandomStickers(count: number) {
    const stickers = ref<Sticker[]>([]);
    onMounted(async () => {
        const lists = data.stickers.map(shuffle);
        const picked = new Map<string, Sticker>();
        for (let i = 0; picked.size < count && lists.some((l) => i < l.length); i++) {
            for (const list of lists) if (list[i] && picked.size < count) picked.set(list[i].src, list[i]);
        }
        const list = shuffle([...picked.values()]);
        await Promise.allSettled(list.map(({ src }) => {
            const img = new Image();
            img.src = withBase(src);
            return img.decode();
        }));
        stickers.value = list;
    });
    return stickers;
}
