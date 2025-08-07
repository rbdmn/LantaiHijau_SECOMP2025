<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TanamanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JurnalController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Tanaman routes (public access)
Route::get('/tanaman', [TanamanController::class, 'index']);
Route::get('/tanaman/{id}', [TanamanController::class, 'show']);

// Get tanaman options for dropdown (public access for form)
Route::get('/tanaman-options', [JurnalController::class, 'getTanamanOptions']);

// Auth routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Protected routes - require authentication
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/me', [UserController::class, 'me']);
    
    // Jurnal routes
    Route::get('/jurnal', [JurnalController::class, 'index']);
    Route::post('/jurnal', [JurnalController::class, 'store']);
    Route::get('/jurnal/{id}', [JurnalController::class, 'show']);
    Route::put('/jurnal/{id}', [JurnalController::class, 'update']);
    Route::patch('/jurnal/{id}', [JurnalController::class, 'update']);
    Route::delete('/jurnal/{id}', [JurnalController::class, 'destroy']);
});