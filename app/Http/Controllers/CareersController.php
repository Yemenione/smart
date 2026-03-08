<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CareersController extends Controller
{
    public function index()
    {
        return Inertia::render('Careers/Index');
    }
}
