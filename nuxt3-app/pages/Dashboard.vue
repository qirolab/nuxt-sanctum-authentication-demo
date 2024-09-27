<script setup lang="ts">
useSeoMeta({
    title: 'Dashboard',
})

definePageMeta({
    middleware: ['$auth'],
});
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <h1 class="text-3xl font-bold">Dashboard</h1>
    </div>
</template>