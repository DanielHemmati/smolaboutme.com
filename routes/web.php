<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ContentController;
use App\Models\User;

Route::get('/', function () {
    $userContent = User::with(['content' => function ($query) {
        $query->select('id', 'content', 'user_id')->oldest();
    }])->select('id', 'name', 'avatar_url')->take(6)->get();

    return Inertia::render('welcome', [
        'userContent' => $userContent,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/u/{username}/editor', function ($username) {
        $user = User::where('name', $username)->firstOrFail();

        if ($user->id !== Auth::user()->id) {
            return redirect()->route('user.profile', ['username' => $username]);
        }

        $content = Content::where('user_id', $user->id)->first();

        return Inertia::render('user/editor', [
            'content' => $content,
        ]);
    })->name('user.editor');

    Route::post('content', [ContentController::class, 'store'])->name('content.store')->middleware('throttle:publish-button');
});

// everyone can see what other user has written
Route::get('/u/{username}', function (Content $content, $username) {
    $user = User::where('name', $username)->select('id', 'name', 'avatar_url', 'email')->firstOrFail();
    $content = Content::where('user_id', $user->id)->first();

    return Inertia::render('user/profile', [
        'content' => $content,
        'owner' => $user,
    ]);
})->name('user.profile');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
