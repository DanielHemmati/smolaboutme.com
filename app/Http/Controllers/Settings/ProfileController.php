<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     * TODO: This doesn't feel right. it should be better
     * but it does work for now
     */
    public function update(Request $request): RedirectResponse
    {
        // nullable b/c user might just want to either of those
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255', Rule::unique(User::class)->ignore($request->user()->id)], // this Rule stuff is really handy
            'email' => ['nullable', 'email', 'max:255', Rule::unique(User::class)->ignore($request->user()->id)],
            'avatar_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);


        if ($request->hasFile('avatar_url')) {
            $filePath = Storage::disk('r2')->put('avatars', $request->file('avatar_url'));
            $fileUrl = Storage::url($filePath);
            $validated['avatar_url'] = $fileUrl;
        } else {
            unset($validated['avatar_url']);
        }

        $user = $request->user();
        $user->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
