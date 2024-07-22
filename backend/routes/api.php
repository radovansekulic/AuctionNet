<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\BiddingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/create', [AuctionController::class, 'create']);
Route::get('/getAll', [AuctionController::class, 'getAll']);
Route::get('/dashboard/{id}', [AuctionController::class, 'dashboard']);
Route::get('/item/{id}', [AuctionController::class, 'item']);

Route::post('/createBid', [BiddingController::class, 'create']);
Route::get('/getBindings/{itemId}', [BiddingController::class, 'getBid']);
