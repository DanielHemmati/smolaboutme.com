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
        $user = User::where('name', $username)->firstOrFail();

        // TODO: this doesn't makes much sense tbh. it's good for now
        if ($user->id !== Auth::user()->id) {
            return redirect()->route('user.profile', ['username' => $username]);
        }

        $content = Content::where('user_id', $user->id)->first();

        return Inertia::render('user/editor', [
            'content' => $content,
        ]);
    })->name('user.editor');

    Route::post('content', [ContentController::class, 'store'])->name('content.store');
    // Route::get('content', [ContentController::class, 'show'])->name('content.show');
});

// everyone can see what other user has written
Route::get('/u/{username}', function (Content $content, $username) {
    $user = User::where('name', $username)->firstOrFail();
    $content = Content::where('user_id', $user->id)->first();

    // dd($content->content["content"][0]["type"] === "paragraph");
    // if (!$content) {
    //     return redirect()->route('welcome');
    // }

    return Inertia::render('user/profile', [
        'content' => $content,
    ]);
})->name('user.profile');

// this is just a playground
Route::get('/test', function () {
    return Inertia::render('something', [
        'content' => 'daniel',
    ]);
})->name('test');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
