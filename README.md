# Nuxt Sanctum Authentication Demo

This repository contains the source code for both a **Laravel** application and a **Nuxt 3** application demonstrating authentication with **Laravel Sanctum**.

This demo walks through setting up Sanctum authentication, including both cookie-based and token-based authentication methods.

## Features
- Laravel backend with Sanctum authentication.
- Nuxt 3 frontend configured with [`@qirolab/nuxt-sanctum-authentication`](https://github.com/qirolab/nuxt-sanctum-authentication "`@qirolab/nuxt-sanctum-authentication`") module.
- SPA cookie-based authentication (default) and token-based authentication.
- API route protection using Sanctum.

## Tutorial

For a step-by-step guide, watch the full tutorial on YouTube:

▶ [Nuxt Sanctum Authentication with Laravel Sanctum](https://www.youtube.com/watch?v=CLjd0_o67OA)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nuxt-sanctum-authentication-demo.git
```

### 2. Setup Laravel

Navigate to the Laravel folder and install dependencies:

```bash
cd laravel-app
composer install
```

Copy the `.env.example` to `.env`:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Set up your database in the `.env` file and run migrations:

```bash
php artisan migrate
```

Run the Laravel server:

```bash
php artisan serve
```

### 3. Setup Nuxt 3

Navigate to the Nuxt app folder and install dependencies:

```bash
cd nuxt3-app
npm install
```

Copy the `.env.example` to `.env`:

```bash
cp .env.example .env
```

Make sure to set the `NUXT_SANCTUM_API_URL` in your `.env` file to point to your Laravel app URL.

Run the Nuxt development server:

```bash
npm run dev
```

## Usage

- Open the Laravel app in your browser (default: `http://localhost:8000`).
- Open the Nuxt app in your browser (default: `http://localhost:3000`).
- Try logging in using the credentials you've set up in your Laravel app.
- Make sure to replace the repository URL with the actual one.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

