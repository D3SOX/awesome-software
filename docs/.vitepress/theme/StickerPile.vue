<script setup lang="ts">
import { withBase } from 'vitepress';
import { data } from './apps.data';

// Seeded PRNG, so the pile looks the same on every visit and build
let seed = 7;
const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
};

const count = 6;

// The hero shows the first stickers; the pile takes ones from the back
const stickers = data.stickers.slice(-count).map((src, i) => ({
    src,
    style: {
        // A messy overlapping row, so every sticker peeks out
        '--x': `${(i - (count - 1) / 2) * 17 + (rand() - 0.5) * 12}px`,
        '--y': `${(rand() - 0.5) * 22}px`,
        '--r': `${(rand() - 0.5) * 56}deg`,
        // Position in the fanned-out hand, from -2.5 (left) to 2.5 (right)
        '--k': i - (count - 1) / 2,
        '--i': i,
    },
}));
</script>

<template>
    <div class="sticker-pile" aria-hidden="true">
        <img v-for="s in stickers" :key="s.src" class="pile-sticker" :src="withBase(s.src)" :style="s.style" alt="" />
    </div>
</template>
