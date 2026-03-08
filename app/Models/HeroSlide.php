<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class HeroSlide extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'subtitle',
        'price',
        'cta_text',
        'cta_link',
        'image_url',
        'order',
    ];
}
