<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $slug = $request->query('slug');
        
        if ($slug) {
            $project = Project::where('slug', $slug)->first();
            return response()->json($project);
        }

        $projects = Project::where('published', true)
            ->orderBy('order', 'asc')
            ->get();
            
        return response()->json($projects);
    }
}
