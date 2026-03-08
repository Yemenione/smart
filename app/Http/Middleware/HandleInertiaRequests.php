<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = Cache::remember('site_settings', 3600, function () {
            return \App\Models\Setting::whereIn('key', ['siteName', 'logoUrl', 'faviconUrl'])->pluck('value', 'key');
        });

        // Helper function to make URLs relative if they contain the local dev URL or the live URL
        $makeRelative = function ($url) {
            if (!$url) return null;
            return str_replace(['http://127.0.0.1:8000', 'http://localhost:8000', 'https://smartouies.fr'], '', $url);
        };

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'siteName' => $settings['siteName'] ?? config('app.name'),
            'logoUrl' => $makeRelative($settings['logoUrl'] ?? null),
            'faviconUrl' => $makeRelative($settings['faviconUrl'] ?? null),
        ];
    }
}
