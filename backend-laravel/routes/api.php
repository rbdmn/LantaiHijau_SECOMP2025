
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


use App\Http\Controllers\TanamanController;
use App\Http\Controllers\KebunController;
use App\Http\Controllers\UserController;

// Auth routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);

// Kebun routes (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/kebun', [KebunController::class, 'index']);
    Route::post('/kebun', [KebunController::class, 'store']);
    Route::get('/koleksi-tanaman', [KebunController::class, 'koleksiTanaman']);
    Route::patch('/kebun/{id}', [KebunController::class, 'update']);
    Route::post('/kebun/harvest', [KebunController::class, 'harvestPlant']);
    Route::delete('/kebun/{id}', [KebunController::class, 'destroy']);
});

Route::get('/tanaman', [TanamanController::class, 'index']);