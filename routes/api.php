<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [\App\Http\Controllers\Auth\AuthController::class, 'profile']);

    Route::resource('/brands', \App\Http\Controllers\BrandsController::class);
    Route::resource('/posts', \App\Http\Controllers\PostsController::class);

});

Route::controller(\App\Http\Controllers\Auth\AuthController::class)->group(function () {
    Route::post('login', 'login');
});
