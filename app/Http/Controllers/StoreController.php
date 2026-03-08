<?php

namespace App\Http\Controllers;

use App\Models\ProductApp;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index()
    {
        $settings = \App\Models\Setting::all()->pluck('value', 'key');
        $apps = ProductApp::orderBy('order')->get();
        
        return Inertia::render('Store/Index', [
            'initialApps' => $apps,
            'storeTitle' => $settings['storeTitle'] ?? null,
            'storeSubtitle' => $settings['storeSubtitle'] ?? null,
            'storeDescription' => $settings['storeDescription'] ?? null,
        ]);
    }
}
