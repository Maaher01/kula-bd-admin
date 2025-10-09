<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn('_courseid');
        });
    }

    public function down()
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->integer('_courseid');
        });
    }
};
