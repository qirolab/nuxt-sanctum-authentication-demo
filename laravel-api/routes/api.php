<?php

use App\Http\Controllers\TokenAuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/tokens/create', [TokenAuthenticationController::class, 'store'])
->middleware(['guest']);

Route::post('/tokens/delete', [TokenAuthenticationController::class, 'destroy'])
->middleware(['auth:sanctum']);
