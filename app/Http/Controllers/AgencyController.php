<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    public function index()
    {
        $faqs = FAQ::orderBy('order')->get();

        return Inertia::render('Agency/Index', [
            'faqs' => $faqs
        ]);
    }
}
