<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('api')->get('/hello', function (Request $request) {
    return response()->json(['message' => 'Halo dari Laravel API']);
});