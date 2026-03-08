<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductApp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $apps = ProductApp::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/Products/Index', [
            'apps' => $apps
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'nameFr' => 'nullable|string',
            'category' => 'required|string',
            'categoryFr' => 'nullable|string',
            'description' => 'required|string',
            'descriptionFr' => 'nullable|string',
            'features' => 'required|string',
            'featuresFr' => 'nullable|string',
            'priceText' => 'required|string',
            'priceTextFr' => 'nullable|string',
            'imageUrl' => 'required|string',
            'demoLink' => 'nullable|url',
            'isPopular' => 'boolean',
            'order' => 'integer',
        ]);

        ProductApp::create([
            'name' => $validated['name'],
            'name_fr' => $validated['nameFr'] ?? null,
            'category' => $validated['category'],
            'category_fr' => $validated['categoryFr'] ?? null,
            'description' => $validated['description'],
            'description_fr' => $validated['descriptionFr'] ?? null,
            'features' => $validated['features'],
            'features_fr' => $validated['featuresFr'] ?? null,
            'price_text' => $validated['priceText'],
            'price_text_fr' => $validated['priceTextFr'] ?? null,
            'image_url' => $validated['imageUrl'],
            'demo_link' => $validated['demoLink'] ?? null,
            'is_popular' => $validated['isPopular'] ?? false,
            'order' => $validated['order'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(Request $request, ProductApp $product)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'nameFr' => 'nullable|string',
            'category' => 'required|string',
            'categoryFr' => 'nullable|string',
            'description' => 'required|string',
            'descriptionFr' => 'nullable|string',
            'features' => 'required|string',
            'featuresFr' => 'nullable|string',
            'priceText' => 'required|string',
            'priceTextFr' => 'nullable|string',
            'imageUrl' => 'required|string',
            'demoLink' => 'nullable|url',
            'isPopular' => 'boolean',
            'order' => 'integer',
        ]);

        $product->update([
            'name' => $validated['name'],
            'name_fr' => $validated['nameFr'] ?? null,
            'category' => $validated['category'],
            'category_fr' => $validated['categoryFr'] ?? null,
            'description' => $validated['description'],
            'description_fr' => $validated['descriptionFr'] ?? null,
            'features' => $validated['features'],
            'features_fr' => $validated['featuresFr'] ?? null,
            'price_text' => $validated['priceText'],
            'price_text_fr' => $validated['priceTextFr'] ?? null,
            'image_url' => $validated['imageUrl'],
            'demo_link' => $validated['demoLink'] ?? null,
            'is_popular' => $validated['isPopular'] ?? false,
            'order' => $validated['order'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy(ProductApp $product)
    {
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
