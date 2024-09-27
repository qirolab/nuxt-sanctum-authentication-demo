<script setup lang="ts">
definePageMeta({
    middleware: ['$auth'],
});
</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <h1 class="text-3xl font-bold">Dashboard</h1>
    </div>
</template>