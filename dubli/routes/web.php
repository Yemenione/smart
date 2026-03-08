<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\InsightsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\CareersController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Pages
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/work', [WorkController::class, 'index'])->name('work.index');
Route::get('/work/{slug}', [WorkController::class, 'show'])->name('work.show');

Route::get('/store', [StoreController::class, 'index'])->name('store.index');

Route::get('/insights', [InsightsController::class, 'index'])->name('insights.index');
Route::get('/insights/{id}', [InsightsController::class, 'show'])->name('insights.show');

Route::get('/agency', [AgencyController::class, 'index'])->name('agency.index');
Route::get('/careers', [CareersController::class, 'index'])->name('careers.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/api/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/services', [ServicesController::class, 'index'])->name('services.index');
Route::get('/legal/terms', [LegalController::class, 'terms'])->name('legal.terms');
Route::get('/legal/privacy', [LegalController::class, 'privacy'])->name('legal.privacy');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', function () {
            // Check if user is admin (you can add a proper middleware for this later)
            if (auth()->user()->role !== 'ADMIN') {
                abort(403, 'Unauthorized action.');
            }
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');
        
        // Admin Module Routes
        // Note: These controllers are placeholders for the actual implementations
        Route::get('/hero', [App\Http\Controllers\Admin\HeroSlideController::class, 'index'])->name('hero');
        Route::post('/hero', [App\Http\Controllers\Admin\HeroSlideController::class, 'store'])->name('hero.store');
        Route::put('/hero/{hero}', [App\Http\Controllers\Admin\HeroSlideController::class, 'update'])->name('hero.update');
        Route::delete('/hero/{hero}', [App\Http\Controllers\Admin\HeroSlideController::class, 'destroy'])->name('hero.destroy');
        Route::get('/products', [App\Http\Controllers\Admin\ProductController::class, 'index'])->name('products');
        Route::post('/products', [App\Http\Controllers\Admin\ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [App\Http\Controllers\Admin\ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('products.destroy');
        Route::get('/projects', [App\Http\Controllers\Admin\ProjectController::class, 'index'])->name('projects');
        Route::get('/projects/new', [App\Http\Controllers\Admin\ProjectController::class, 'create'])->name('projects.create');
        Route::post('/projects', [App\Http\Controllers\Admin\ProjectController::class, 'store'])->name('projects.store');
        Route::get('/projects/{project}', [App\Http\Controllers\Admin\ProjectController::class, 'edit'])->name('projects.edit');
        Route::put('/projects/{project}', [App\Http\Controllers\Admin\ProjectController::class, 'update'])->name('projects.update');
        Route::delete('/projects/{project}', [App\Http\Controllers\Admin\ProjectController::class, 'destroy'])->name('projects.destroy');
        Route::get('/posts', [App\Http\Controllers\Admin\PostController::class, 'index'])->name('posts');
        Route::get('/posts/new', [App\Http\Controllers\Admin\PostController::class, 'create'])->name('posts.create');
        Route::post('/posts', [App\Http\Controllers\Admin\PostController::class, 'store'])->name('posts.store');
        Route::get('/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'edit'])->name('posts.edit');
        Route::put('/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'update'])->name('posts.update');
        Route::delete('/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'destroy'])->name('posts.destroy');
        Route::get('/faqs', [App\Http\Controllers\Admin\FaqController::class, 'index'])->name('faqs');
        Route::post('/faqs', [App\Http\Controllers\Admin\FaqController::class, 'store'])->name('faqs.store');
        Route::put('/faqs/{faq}', [App\Http\Controllers\Admin\FaqController::class, 'update'])->name('faqs.update');
        Route::delete('/faqs/{faq}', [App\Http\Controllers\Admin\FaqController::class, 'destroy'])->name('faqs.destroy');

        Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings');
        Route::put('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    });
});

// API Data Endpoints (Public)
Route::group(['prefix' => 'api'], function () {
    Route::get('/settings', [App\Http\Controllers\Api\SettingsController::class, 'index']);
    Route::get('/projects', [App\Http\Controllers\Api\ProjectController::class, 'index']);
    Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index']);
    Route::post('/upload', [UploadController::class, 'store'])->middleware('auth');
});

require __DIR__.'/auth.php';

// Fallback route for storage files in root-level deployment
Route::get('/storage/{path}', function ($path) {
    $fullPath = storage_path('app/public/' . $path);
    if (!file_exists($fullPath)) {
        abort(404);
    }
    return response()->file($fullPath);
})->where('path', '.*');
