<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $settings = \App\Models\Setting::all()->pluck('value', 'key');
        
        return Inertia::render('Contact/Index', [
            'contactEmail' => $settings['contactEmail'] ?? 'contact@smartouies.fr',
            'contactPhone' => $settings['contactPhone'] ?? '+33 1 23 45 67 89',
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            \Illuminate\Support\Facades\Mail::send([], [], function ($message) use ($validated) {
                $message->to('contact@smartouies.fr')
                    ->subject('New Contact Form Submission: ' . $validated['name'])
                    ->html("
                        <h3>New Message from Smartouies.fr</h3>
                        <p><strong>Name:</strong> {$validated['name']}</p>
                        <p><strong>Email:</strong> {$validated['email']}</p>
                        <p><strong>Message:</strong><br>{$validated['message']}</p>
                    ");
            });
        } catch (\Exception $e) {
            // Log the error but continue to return a response
            \Illuminate\Support\Facades\Log::error('Mail failed: ' . $e->getMessage());
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully!',
            'ref' => 'DX-' . strtoupper(substr(md5(uniqid()), 0, 4))
        ]);
    }
}
