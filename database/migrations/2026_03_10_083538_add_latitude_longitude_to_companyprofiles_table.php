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
        Schema::table('companyprofiles', function (Blueprint $table) {
            // Remove the old _latlong field
            if (Schema::hasColumn('companyprofiles', '_latlong')) {
                $table->dropColumn('_latlong');
            }

            // Add separate latitude and longitude fields
            $table->decimal('latitude', 10, 7)->nullable()->after('_mobile');
            $table->decimal('longitude', 10, 7)->nullable()->after('latitude');
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
            // Drop latitude and longitude
            $table->dropColumn(['latitude', 'longitude']);

            // Optionally, add _latlong back
            $table->string('_latlong')->nullable()->after('_mobile');
        });
    }
};
