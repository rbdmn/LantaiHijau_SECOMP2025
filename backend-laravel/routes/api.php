
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


use App\Http\Controllers\TanamanController;
Route::get('/tanaman', [TanamanController::class, 'index']);
use App\Http\Controllers\UserController;

// Auth routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);