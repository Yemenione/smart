<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InsightsController extends Controller
{
    public function index()
    {
        $posts = Post::where('published', true)->orderBy('created_at', 'desc')->get();
        return Inertia::render('Insights/Index', [
            'initialPosts' => $posts
        ]);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return Inertia::render('Insights/Show', [
            'initialPost' => $post
        ]);
    }
}
