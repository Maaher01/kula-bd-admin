<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();

            $table->string('code')->nullable();

            $table->enum('scope', ['cart', 'product', 'category', 'buy_x_get_y']);
            $table->enum('type', ['percentage', 'fixed', 'free_item']);

            $table->decimal('value', 10, 2)->nullable();

            $table->decimal('min_purchase', 10, 2)->nullable();
            $table->decimal('max_discount', 10, 2)->nullable();

            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();

            $table->integer('per_user_limit')->nullable();

            $table->boolean('first_order_only')->default(false);
            $table->boolean('is_stackable')->default(false);

            // Buy X Get Y fields
            $table->unsignedBigInteger('buy_product_id')->nullable();
            $table->unsignedBigInteger('buy_category_id')->nullable();
            $table->integer('buy_quantity')->nullable();

            $table->unsignedBigInteger('get_product_id')->nullable();
            $table->unsignedBigInteger('get_category_id')->nullable();
            $table->integer('get_quantity')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // Optional foreign keys (only if you want strict constraints)
            // $table->foreign('buy_product_id')->references('id')->on('products')->nullOnDelete();
            // $table->foreign('get_product_id')->references('id')->on('products')->nullOnDelete();
            // $table->foreign('buy_category_id')->references('id')->on('categories')->nullOnDelete();
            // $table->foreign('get_category_id')->references('id')->on('categories')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
