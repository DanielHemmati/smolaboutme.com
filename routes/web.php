<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ContentController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;
// use TipTap\Editor;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/u/{username}/editor', function ($username) {
        User::where('name', $username)->firstOrFail();
        return Inertia::render('user/editor');
    })->name('user.editor');

    Route::get('/u/{username}', function (Content $content) {
        return Inertia::render('user/profile', [
            'content' => $content,
        ]);
    })->name('user.profile');
});

Route::get('/test', function () {
    Mail::to('delivered@resend.dev')->send(new TestMail());
    return 'Email sent';
})->name('test');

// all of this route should be in auth middleware
Route::post('content', [ContentController::class, 'store'])->name('content.store');
Route::get('content/{content}', [ContentController::class, 'show'])->name('content.show');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
