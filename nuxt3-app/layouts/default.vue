<script setup lang="ts">
const { isLoggedIn, user, logout } = useSanctum<User>();
const logoutUser = () => logout();
</script>

<template>
  <div class="h-screen">
    <nav class="p-4 text-white bg-gray-800">
      <div class="container flex items-center justify-between mx-auto">
        <div>
          <NuxtLink to="/" class="text-xl font-bold">Home</NuxtLink>
        </div>
        <div class="flex items-center">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/auth/login" class="mr-4">Login</NuxtLink>
            <NuxtLink to="/auth/register" class="mr-4">Register</NuxtLink>
          </template>
          <template v-if="isLoggedIn">
            <NuxtLink to="/dashboard" class="mr-4">Dashboard</NuxtLink>
            <NuxtLink to="/profile" class="mr-4">Profile</NuxtLink>
            <button @click="logoutUser" class="mr-4">Logout</button>
            <template v-if="user">
              <div
                v-if="!user.avatar"
                class="flex items-center justify-center w-8 h-8 mr-2 bg-gray-200 rounded-full"
              >
                <span class="text-lg font-bold text-gray-500">
                  {{ user.name?.slice(0, 1).toUpperCase() }}
                </span>
              </div>
              <img
                v-if="user.avatar"
                :src="user.avatar"
                alt="Avatar"
                class="w-8 h-8 mr-2 rounded-full"
              />

              <span>{{ user.name }}</span>
            </template>
          </template>
        </div>
      </div>
    </nav>

    <slot />
  </div>
</template>
