<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProductApp extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'name_fr',
        'category',
        'category_fr',
        'description',
        'description_fr',
        'features',
        'features_fr',
        'price_text',
        'price_text_fr',
        'image_url',
        'demo_link',
        'is_popular',
        'order',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
    ];
}
