<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'content' => ['required', 'json'],
        ]);

        $tiptapJson = (new \Tiptap\Editor)
            ->setContent($validated['content'])
            ->getDocument();

        // For now user can only have one content. later on we will handle
        // multiple content as well
        Content::updateOrCreate([
            'user_id' => Auth::user()->id,
        ], [
            'content' => $tiptapJson,
        ]);

        return redirect()->back()->with('success', 'Content created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        return Inertia::render('show', [
            'content' => $content,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        //
    }
}
