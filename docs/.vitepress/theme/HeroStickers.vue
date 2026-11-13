<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { useRandomStickers } from './stickers';

// Seeded PRNG, so the lid's layout stays the same; only the icons change per visit
let seed = 20;
const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
};

const cols = 4;
const layout = Array.from({ length: 16 }, (_, i) => ({
    '--x': `${((i % cols) + 0.5 + (rand() - 0.5) * 0.7) * (100 / cols)}%`,
    '--y': `${(Math.floor(i / cols) + 0.5 + (rand() - 0.5) * 0.6) * (100 / cols)}%`,
    '--r': `${(rand() - 0.5) * 34}deg`,
    '--s': `${62 + rand() * 34}px`,
    '--i': i,
}));

const icons = useRandomStickers(layout.length);
const stickers = computed(() => icons.value.map((s, i) => ({ ...s, style: layout[i] })));
</script>

<template>
    <nav class="lid" aria-label="Featured apps">
        <a v-for="s in stickers" :key="s.src" class="sticker" :href="withBase(s.href)" :title="s.name" :style="s.style">
            <img :src="withBase(s.src)" :alt="s.name" />
        </a>
    </nav>
</template>
