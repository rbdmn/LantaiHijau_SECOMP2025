<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\TanamanController;
Route::get('/tanaman', [TanamanController::class, 'index']);

use App\Http\Controllers\UserController;
use App\Http\Controllers\HasilPanenController;

// Auth routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);

// Hasil Panen routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/hasil-panen', [HasilPanenController::class, 'index']);
    Route::put('/hasil-panen/{id}', [HasilPanenController::class, 'update']);
    
    // Route untuk debugging - bisa dihapus setelah selesai
    Route::get('/hasil-panen/{id}/debug', [HasilPanenController::class, 'debug']);

    
    Route::delete('/hasil_panen/{id}', [HasilPanenController::class, 'destroy']);

});
