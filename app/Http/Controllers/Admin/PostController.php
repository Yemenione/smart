<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Posts/Form', [
            'post' => null,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'titleFr' => 'nullable|string',
            'content' => 'required|string',
            'contentFr' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'published' => 'boolean',
            'categoryId' => 'nullable|exists:categories,id',
        ]);

        $post = Post::create([
            'title' => $validated['title'],
            'title_fr' => $validated['titleFr'],
            'content' => $validated['content'],
            'content_fr' => $validated['contentFr'],
            'slug' => Str::slug($validated['title']),
            'image_url' => $validated['imageUrl'],
            'published' => $validated['published'],
            'category_id' => $validated['categoryId'],
            'author_id' => auth()->id(),
        ]);

        return redirect()->route('admin.posts')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        $categories = Category::all();
        $postData = $post->toArray();
        // Map snake_case to camelCase for frontend if needed, but let's see props in Form.tsx
        return Inertia::render('Admin/Posts/Form', [
            'post' => $postData,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'titleFr' => 'nullable|string',
            'content' => 'required|string',
            'contentFr' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'published' => 'boolean',
            'categoryId' => 'nullable|exists:categories,id',
        ]);

        $post->update([
            'title' => $validated['title'],
            'title_fr' => $validated['titleFr'],
            'content' => $validated['content'],
            'content_fr' => $validated['contentFr'],
            'slug' => Str::slug($validated['title']),
            'image_url' => $validated['imageUrl'],
            'published' => $validated['published'],
            'category_id' => $validated['categoryId'],
        ]);

        return redirect()->route('admin.posts')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->back()->with('success', 'Post deleted successfully.');
    }
}
