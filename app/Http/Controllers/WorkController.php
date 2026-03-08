<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    public function index()
    {
        $projects = Project::where('published', true)->orderBy('order')->get();
        return Inertia::render('Work/Index', [
            'initialProjects' => $projects
        ]);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        return Inertia::render('Work/Show', [
            'initialProject' => $project
        ]);
    }
}
