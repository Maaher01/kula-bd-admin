<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVatPercentageCompanyprofilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companyprofiles', function (Blueprint $table) {
            $table->decimal('vat_percentage', 5, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companyprofiles', function (Blueprint $table) {
            $table->dropColumn('vat_percentage');
        });
    }
}
