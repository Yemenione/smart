<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index()
    {
        $faqs = FAQ::all();
        return Inertia::render('Services/Index', [
             'faqs' => $faqs
        ]);
    }
}
