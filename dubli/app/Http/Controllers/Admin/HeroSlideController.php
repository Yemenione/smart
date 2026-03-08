<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::orderBy('order')->get();
        return Inertia::render('Admin/Hero/Index', [
            'slides' => $slides
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'subtitle' => 'required|string',
            'price' => 'nullable|string',
            'ctaText' => 'nullable|string',
            'ctaLink' => 'nullable|string',
            'imageUrl' => 'required|string',
            'order' => 'integer',
        ]);

        HeroSlide::create([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'price' => $validated['price'],
            'cta_text' => $validated['ctaText'],
            'cta_link' => $validated['ctaLink'],
            'image_url' => $validated['imageUrl'],
            'order' => $validated['order'],
        ]);

        return redirect()->back()->with('success', 'Slide created successfully.');
    }

    public function update(Request $request, HeroSlide $hero)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'subtitle' => 'required|string',
            'price' => 'nullable|string',
            'ctaText' => 'nullable|string',
            'ctaLink' => 'nullable|string',
            'imageUrl' => 'required|string',
            'order' => 'integer',
        ]);

        $hero->update([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'price' => $validated['price'],
            'cta_text' => $validated['ctaText'],
            'cta_link' => $validated['ctaLink'],
            'image_url' => $validated['imageUrl'],
            'order' => $validated['order'],
        ]);

        return redirect()->back()->with('success', 'Slide updated successfully.');
    }

    public function destroy(HeroSlide $hero)
    {
        $hero->delete();
        return redirect()->back()->with('success', 'Slide deleted successfully.');
    }
}
