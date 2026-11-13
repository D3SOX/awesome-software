<script setup lang="ts">
import { withBase } from 'vitepress';
import { data } from './apps.data';
</script>

<template>
    <nav class="shelf" aria-label="Platforms">
        <a v-for="p in data.platforms" :key="p.slug" class="shelf-item" :href="withBase(`/${p.slug}/`)">
            <span class="shelf-icon" v-html="p.icon" />
            <span class="shelf-name">{{ p.name }}</span>
            <span class="shelf-count">{{ p.count }} apps</span>
            <span class="shelf-peek" aria-hidden="true">
                <img v-for="src in p.preview" :key="src" :src="withBase(src)" alt="" width="28" height="28" loading="lazy" />
            </span>
        </a>
    </nav>
</template>
