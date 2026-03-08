<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Project extends Model
{
    use HasUuids;

    protected $fillable = [
        'slug',
        'title',
        'title_fr',
        'client',
        'role',
        'year',
        'tech_stack',
        'challenge',
        'challenge_fr',
        'solution',
        'solution_fr',
        'cover_image',
        'gallery',
        'live_url',
        'published',
        'order',
    ];

    protected $casts = [
        'published' => 'boolean',
        'gallery' => 'array',
    ];
}
