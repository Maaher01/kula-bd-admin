<?php

use Illuminate\Support\Facades\DB;

if (! function_exists('companyprofile')) {
    function companyprofile()
    {
        $companyprofile = DB::table("companyprofiles")->first();

        return $companyprofile;
    }
}
