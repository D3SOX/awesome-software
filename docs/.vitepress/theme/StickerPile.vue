<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { useRandomStickers } from './stickers';

// Seeded PRNG, so the pile's layout stays the same; only the icons change per visit
let seed = 7;
const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
};

const count = 6;
const layout = Array.from({ length: count }, (_, i) => ({
    // A messy overlapping row, so every sticker peeks out
    '--x': `${(i - (count - 1) / 2) * 17 + (rand() - 0.5) * 12}px`,
    '--y': `${(rand() - 0.5) * 22}px`,
    '--r': `${(rand() - 0.5) * 56}deg`,
    // Position in the fanned-out hand, from -2.5 (left) to 2.5 (right)
    '--k': i - (count - 1) / 2,
    '--i': i,
}));

const icons = useRandomStickers(count);
const stickers = computed(() => icons.value.map(({ src }, i) => ({ src, style: layout[i] })));
</script>

<template>
    <div class="sticker-pile" aria-hidden="true">
        <img v-for="s in stickers" :key="s.src" class="pile-sticker" :src="withBase(s.src)" :style="s.style" alt="" />
    </div>
</template>
