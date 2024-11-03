<script setup lang="ts">
useSeoMeta({
  title: "Profile",
});

definePageMeta({
  middleware: ["$auth"],
});

const { user, refreshUser } = useSanctum<User>();

interface UserProfileForm extends Record<string, unknown> {
  name: string;
  email: string;
  avatar: File | null;
}

const form = useSanctumForm<UserProfileForm>("patch", "/api/profile", {
  name: user.value!.name,
  email: user.value!.email,
  avatar: null,
});

async function updateProfile() {
  if (form.processing) return;
  try {
    await form.submit();
    await refreshUser();
    alert("Profile Updated");
  } catch (err) {
    console.log(err);
  }
}

const resetForm = () => form.reset();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-xl">
      <h1 class="text-2xl font-bold text-center">Profile</h1>
      <div class="flex flex-col items-center space-y-1">
        <template v-if="user">
          <div
            v-if="!user.avatar"
            class="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full"
          >
            <span class="text-lg font-bold text-gray-500">
              {{ user.name?.slice(0, 1).toUpperCase() }}
            </span>
          </div>
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Avatar"
            class="w-16 h-16 mr-2 rounded-full"
          />

          <h2 class="text-xl">{{ user.name }}</h2>
        </template>
      </div>

      <form @submit.prevent="updateProfile">
        <div class="flex flex-col space-y-1">
          <label for="name" class="text-sm font-medium">Avatar</label>
          <input
            id="name"
            type="file"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-600': form.invalid('avatar') }"
            @change="
            (e: Event) => {
              const target = e.target as HTMLInputElement;
              if (target.files) {
                form.avatar = target.files[0];
              }
              form.forgetError('avatar');
            }
          "
          />
          <span v-if="form.invalid('avatar')" class="text-sm text-red-600">
            {{ form.errors.avatar }}
          </span>
        </div>

        <div class="flex flex-col mt-3 space-y-1">
          <label for="name" class="text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-600': form.invalid('name') }"
            @input="form.forgetError('name')"
          />
          <span v-if="form.invalid('name')" class="text-sm text-red-600">
            {{ form.errors.name }}
          </span>
        </div>

        <div class="flex flex-col mt-3 space-y-1">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-600': form.invalid('email') }"
            @input="form.forgetError('email')"
          />
          <span v-if="form.invalid('email')" class="text-sm text-red-600">
            {{ form.errors.email }}
          </span>
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            class="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-md"
            :class="{
              'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300':
                !form.processing,
              'opacity-50 cursor-not-allowed': form.processing,
            }"
          >
            Save
          </button>

          <button
            type="button"
            @click.prevent="resetForm"
            class="flex-1 w-full px-8 py-2 mt-3 text-sm font-medium bg-gray-200 rounded-md"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
