<script setup lang="ts">
const { isLoggedIn, user, logout } = useSanctum<User>();
const logoutUser = () => logout();
</script>

<template>
    <div class="h-screen">
        <nav class="bg-gray-800 text-white p-4">
            <div class="container mx-auto flex justify-between items-center">
                <div>
                    <NuxtLink to="/" class="font-bold text-xl">Home</NuxtLink>
                </div>
                <div>
                    <template v-if="!isLoggedIn">
                        <NuxtLink to="/auth/login" class="mr-4">Login</NuxtLink>
                        <NuxtLink to="/auth/register" class="mr-4">Register</NuxtLink>
                    </template>
                    <template v-if="isLoggedIn">
                        <NuxtLink to="/dashboard" class="mr-4">Dashboard</NuxtLink>
                        <button @click="logoutUser" class="mr-4">Logout</button>
                        <span v-if="user">Welcome, {{ user.name }}</span>
                    </template>
                </div>
            </div>
        </nav>

        <slot />
    </div>
</template>