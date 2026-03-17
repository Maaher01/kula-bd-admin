<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reviews', function (Blueprint $table) {
            // Drop old columns
            $table->dropColumn(['_title', '_subtitle', '_image', '_description', '_status']);

            // Add new columns
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade')->after('id'); // nullable for guest reviews
            $table->foreignId('product_id')->constrained()->onDelete('cascade')->after('user_id');
            $table->tinyInteger('rating')->after('product_id'); // 1 to 5
            $table->text('comment')->after('rating');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reviews', function (Blueprint $table) {
            // Drop new columns
            $table->dropForeign(['user_id']);
            $table->dropForeign(['product_id']);
            $table->dropColumn(['user_id', 'product_id', 'rating', 'comment']);

            // Add old columns back
            $table->string('_title')->after('id');
            $table->string('_subtitle')->after('_title');
            $table->string('_image')->after('_subtitle');
            $table->longText('_description')->after('_image');
            $table->tinyInteger('_status')->after('_description');
        });
    }
};
