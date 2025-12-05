<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Drop `checkout_date` and `delivery_charge` columns from `orders` table
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['checkout_date', 'delivery_charge']);
        });
    }

    /**
     * Reverse the migrations.
     * Add back the dropped columns
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('delivery_charge', 10, 2)->default(0);
            $table->date('checkout_date');
        });
    }
};
