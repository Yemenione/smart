<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('title_fr')->nullable();
            $table->string('client');
            $table->string('role');
            $table->string('year');
            $table->string('tech_stack')->nullable();
            $table->text('challenge')->nullable();
            $table->text('challenge_fr')->nullable();
            $table->text('solution')->nullable();
            $table->text('solution_fr')->nullable();
            $table->string('cover_image')->nullable();
            $table->text('gallery')->nullable();
            $table->string('live_url')->nullable();
            $table->boolean('published')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
