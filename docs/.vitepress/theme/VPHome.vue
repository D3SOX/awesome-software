<script setup lang="ts">
// Replaces VitePress's home layout (see the alias in config.ts) to give the page a `<main>` landmark.
// The home page has no features or extra slots, so only the hero and the content are kept.
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue';
import VPHomeContent from 'vitepress/dist/client/theme-default/components/VPHomeContent.vue';
</script>

<template>
    <main class="VPHome">
        <VPHomeHero>
            <template #home-hero-image><slot name="home-hero-image" /></template>
        </VPHomeHero>
        <VPHomeContent>
            <Content />
        </VPHomeContent>
    </main>
</template>

<style scoped>
.VPHome {
    margin-bottom: 96px;
}

@media (min-width: 768px) {
    .VPHome {
        margin-bottom: 128px;
    }
}
</style>
