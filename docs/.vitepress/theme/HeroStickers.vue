<script setup lang="ts">
import { withBase } from 'vitepress';
import { data } from './apps.data';

// Seeded PRNG, so the lid looks the same on every visit and build
let seed = 20;
const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
};

const cols = 4;
const stickers = data.stickers.map((src, i) => ({
    src,
    style: {
        '--x': `${((i % cols) + 0.5 + (rand() - 0.5) * 0.7) * (100 / cols)}%`,
        '--y': `${(Math.floor(i / cols) + 0.5 + (rand() - 0.5) * 0.6) * (100 / cols)}%`,
        '--r': `${(rand() - 0.5) * 34}deg`,
        '--s': `${62 + rand() * 34}px`,
        '--i': i,
    },
}));
</script>

<template>
    <div class="lid" aria-hidden="true">
        <img v-for="s in stickers" :key="s.src" class="sticker" :src="withBase(s.src)" :style="s.style" alt="" />
    </div>
</template>
