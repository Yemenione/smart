<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'titleFr' => 'nullable|string',
            'client' => 'required|string',
            'role' => 'nullable|string',
            'year' => 'nullable|string',
            'challenge' => 'nullable|string',
            'challengeFr' => 'nullable|string',
            'solution' => 'nullable|string',
            'solutionFr' => 'nullable|string',
            'techStack' => 'nullable|string',
            'coverImage' => 'nullable|string',
            'gallery' => 'nullable|string',
            'liveUrl' => 'nullable|url',
            'order' => 'integer',
        ]);

        $project = Project::create([
            'slug' => Str::slug($validated['title']),
            'title' => $validated['title'],
            'title_fr' => $validated['titleFr'],
            'client' => $validated['client'],
            'role' => $validated['role'],
            'year' => $validated['year'],
            'challenge' => $validated['challenge'],
            'challenge_fr' => $validated['challengeFr'],
            'solution' => $validated['solution'],
            'solution_fr' => $validated['solutionFr'],
            'tech_stack' => $validated['techStack'],
            'cover_image' => $validated['coverImage'],
            'gallery' => $validated['gallery'] ? explode(',', $validated['gallery']) : [],
            'live_url' => $validated['liveUrl'],
            'published' => true,
            'order' => $validated['order'],
        ]);

        return redirect()->route('admin.projects')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        // Format gallery for the frontend (back to comma string)
        $projectData = $project->toArray();
        $projectData['gallery'] = is_array($project->gallery) ? implode(',', $project->gallery) : $project->gallery;

        return Inertia::render('Admin/Projects/Form', [
            'project' => $projectData
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'titleFr' => 'nullable|string',
            'client' => 'required|string',
            'role' => 'nullable|string',
            'year' => 'nullable|string',
            'challenge' => 'nullable|string',
            'challengeFr' => 'nullable|string',
            'solution' => 'nullable|string',
            'solutionFr' => 'nullable|string',
            'techStack' => 'nullable|string',
            'coverImage' => 'nullable|string',
            'gallery' => 'nullable|string',
            'liveUrl' => 'nullable|url',
            'order' => 'integer',
        ]);

        $project->update([
            'slug' => Str::slug($validated['title']),
            'title' => $validated['title'],
            'title_fr' => $validated['titleFr'],
            'client' => $validated['client'],
            'role' => $validated['role'],
            'year' => $validated['year'],
            'challenge' => $validated['challenge'],
            'challenge_fr' => $validated['challengeFr'],
            'solution' => $validated['solution'],
            'solution_fr' => $validated['solutionFr'],
            'tech_stack' => $validated['techStack'],
            'cover_image' => $validated['coverImage'],
            'gallery' => $validated['gallery'] ? (is_array($validated['gallery']) ? $validated['gallery'] : explode(',', $validated['gallery'])) : [],
            'live_url' => $validated['liveUrl'],
            'order' => $validated['order'],
        ]);

        return redirect()->route('admin.projects')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
