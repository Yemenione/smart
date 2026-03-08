<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        
        // Ensure defaults if empty
        return response()->json([
            'siteName' => $settings['siteName'] ?? config('app.name'),
            'logoUrl' => $settings['logoUrl'] ?? null,
            'contactEmail' => $settings['contactEmail'] ?? 'contact@smartouies.fr',
            'contactPhone' => $settings['contactPhone'] ?? '+33 1 23 45 67 89',
            'socialTwitter' => $settings['socialTwitter'] ?? null,
            'socialLinkedin' => $settings['socialLinkedin'] ?? null,
            'socialInstagram' => $settings['socialInstagram'] ?? null,
            'socialFacebook' => $settings['socialFacebook'] ?? null,
        ]);
    }
}
