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
        Schema::create('product_apps', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('name_fr')->nullable();
            $table->string('category');
            $table->string('category_fr')->nullable();
            $table->text('description');
            $table->text('description_fr')->nullable();
            $table->text('features');
            $table->text('features_fr')->nullable();
            $table->string('price_text');
            $table->string('price_text_fr')->nullable();
            $table->string('image_url');
            $table->string('demo_link')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_apps');
    }
};
