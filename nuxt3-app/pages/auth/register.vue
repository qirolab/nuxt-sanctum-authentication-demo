<script setup lang="ts">
import { FetchError } from "ofetch";

definePageMeta({
    middleware: ['$guest'],
});


const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
});

const busy = ref(false);
const errors = ref<ValidationErrors>({});

const { refreshUser } = useSanctum();

async function registerUser() {
    try {
        errors.value = {};
        busy.value = true;
        await useSanctumFetch('/api/register', {
            method: "post",
            body: form.value
        });

        await refreshUser();
        return navigateTo('/dashboard');
    } catch (err) {
        busy.value = false;
        if (err instanceof FetchError && err.response?.status === 422) {
            errors.value = err.response._data.errors;
        }
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-xl">
            <h1 class="text-2xl font-bold text-center">Register</h1>
            <form @submit.prevent="registerUser">
                <div class="flex flex-col space-y-1">
                    <label for="name" class="text-sm font-medium">Name</label>
                    <input id="name" type="text" v-model="form.name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <span class="text-sm text-red-600" v-if="errors.name">
                        {{ errors.name[0] }}
                    </span>
                </div>
                <div class="flex flex-col mt-3 space-y-1">
                    <label for="email" class="text-sm font-medium">Email</label>
                    <input id="email" type="email" v-model="form.email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <span class="text-sm text-red-600" v-if="errors.email">
                        {{ errors.email[0] }}
                    </span>
                </div>
                <div class="flex flex-col mt-3 space-y-1">
                    <label for="password" class="text-sm font-medium">Password</label>
                    <input id="password" type="password" v-model="form.password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <span class="text-sm text-red-600" v-if="errors.password">
                        {{ errors.password[0] }}
                    </span>
                </div>
                <div class="flex flex-col mt-3 space-y-1">
                    <label for="password_confirmation" class="text-sm font-medium">
                        Password Confirmation
                    </label>
                    <input id="password_confirmation" type="password" v-model="form.password_confirmation"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <span class="text-sm text-red-600" v-if="errors.password_confirmation">
                        {{ errors.password_confirmation[0] }}
                    </span>
                </div>

                <button type="submit"
                    class="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-md" :class="{
                        'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300': !busy,
                        'opacity-50 cursor-not-allowed': busy
                    }">
                    Register
                </button>
            </form>
        </div>
    </div>
</template>
