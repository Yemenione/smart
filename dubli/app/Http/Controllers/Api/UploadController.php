<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            // Store the file in the 'uploads' directory on the 'public' disk (laravel_storage)
            $path = $file->store('uploads', 'public');
            
            // Sync to the public-facing storage folder for immediate access
            $publicPath = public_path('storage/' . $path);
            $fullInternalPath = storage_path('app/public/' . $path);
            
            if (!file_exists(dirname($publicPath))) {
                mkdir(dirname($publicPath), 0755, true);
            }
            copy($fullInternalPath, $publicPath);
            
            // Get the public URL for the stored file
            $url = asset('storage/' . $path);

            return response()->json([
                'url' => $url,
                'path' => $path
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
