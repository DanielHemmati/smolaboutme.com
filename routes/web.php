<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ContentController;
// use TipTap\Editor;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');

// all of this route should be in auth middleware
Route::post('content', [ContentController::class, 'store'])->name('content.store');
Route::get('content/{content}', [ContentController::class, 'show'])->name('content.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
