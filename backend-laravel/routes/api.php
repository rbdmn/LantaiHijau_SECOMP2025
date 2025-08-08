<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TanamanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JurnalController;
use App\Http\Controllers\KebunController;
use App\Http\Controllers\HasilPanenController;
use App\Http\Controllers\KoleksiTanamanController; 

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

    // Koleksi Tanaman routes (TAMBAHKAN INI)
    Route::post('/koleksi-tanaman', [KoleksiTanamanController::class, 'store']);
    Route::get('/koleksi-tanaman', [KoleksiTanamanController::class, 'index']);
    Route::delete('/koleksi-tanaman/{id}', [KoleksiTanamanController::class, 'destroy']);
    Route::get('/koleksi-tanaman/check/{tanamanId}', [KoleksiTanamanController::class, 'checkCollection']);
});


Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);

// Hasil Panen routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/hasil-panen', [HasilPanenController::class, 'index']);
    Route::put('/hasil-panen/{id}', [HasilPanenController::class, 'update']);
    
    // Route untuk debugging - bisa dihapus setelah selesai
    Route::get('/hasil-panen/{id}/debug', [HasilPanenController::class, 'debug']);

    
    Route::delete('/hasil_panen/{id}', [HasilPanenController::class, 'destroy']);

});
// Kebun routes (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/kebun', [KebunController::class, 'index']);
    Route::post('/kebun', [KebunController::class, 'store']);
    Route::get('/koleksi-tanaman', [KebunController::class, 'koleksiTanaman']);
    Route::patch('/kebun/{id}', [KebunController::class, 'update']);
    Route::post('/kebun/harvest', [KebunController::class, 'harvestPlant']);
    Route::delete('/kebun/{id}', [KebunController::class, 'destroy']);
});

