<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Models\ProductApp;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::orderBy('order')->get();
        // The frontend wants up to 3 popular products
        $products = ProductApp::where('is_popular', true)->take(3)->get();
        // The frontend wants published projects
        $projects = Project::where('published', true)->get();

        return Inertia::render('Home', [
            'slides' => $slides,
            'products' => $products,
            'projects' => $projects,
        ]);
    }
}
