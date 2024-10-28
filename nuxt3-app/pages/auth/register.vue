<script setup lang="ts">
useSeoMeta({
  title: "Register",
});

definePageMeta({
  middleware: ["$guest"],
});

const { refreshUser } = useSanctum<User>();

const form = useSanctumForm("post", "/api/register", {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

async function registerUser() {
  if (form.processing) return;
  try {
    await form.submit();
    await refreshUser();
    return navigateTo("/dashboard");
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-xl">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <form @submit.prevent="registerUser">
        <div class="flex flex-col space-y-1">
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
        <div class="flex flex-col mt-3 space-y-1">
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-600': form.invalid('password') }"
            @input="form.forgetError('password')"
          />
          <span v-if="form.invalid('password')" class="text-sm text-red-600">
            {{ form.errors.password }}
          </span>
        </div>
        <div class="flex flex-col mt-3 space-y-1">
          <label for="password_confirmation" class="text-sm font-medium">
            Password Confirmation
          </label>
          <input
            id="password_confirmation"
            type="password"
            v-model="form.password_confirmation"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-600': form.invalid('password_confirmation') }"
            @input="form.forgetError('password_confirmation')"
          />
          <span
            v-if="form.invalid('password_confirmation')"
            class="text-sm text-red-600"
          >
            {{ form.errors.password_confirmation }}
          </span>
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-md"
          :class="{
            'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300':
              !form.processing,
            'opacity-50 cursor-not-allowed': form.processing,
          }"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
