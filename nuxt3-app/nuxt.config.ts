// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  devServer: {
    host: process.env.NUXT_DEV_SERVER_HOST,
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@qirolab/nuxt-sanctum-authentication"],

  laravelSanctum: {
    apiUrl: process.env.NUXT_SANCTUM_API_URL,
    authMode: (process.env.NUXT_AUTH_MODE as "token" | "cookie") || "cookie",

    userResponseWrapperKey: "data",

    sanctumEndpoints: {
      // Endpoint to request a new CSRF token from the server
      csrf: "/sanctum/csrf-cookie",

      // Endpoint used for user authentication
      login: "/api/login",

      // Endpoint used to log out users
      logout: "/api/logout",

      // Endpoint to retrieve the currently authenticated user's data
      user: "/api/user",
    },

    redirect: {
      // Preserve the originally requested route, redirecting users there after login
      enableIntendedRedirect: false,

      // Path to redirect users when a page requires authentication
      loginPath: "/auth/login",

      // URL to redirect users to when guest-only access is required
      guestOnlyRedirect: "/dashboard",

      // URL to redirect to after a successful login
      redirectToAfterLogin: "/",

      // URL to redirect to after logging out
      redirectToAfterLogout: "/",
    },
  },
});
