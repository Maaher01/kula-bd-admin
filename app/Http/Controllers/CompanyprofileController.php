<?php

namespace App\Http\Controllers;

use App\Models\Companyprofile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyprofileController extends Controller
{
    //Create
    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'mobile' => ['required', 'string', 'max:15'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }

        $path = "";
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('companyimage', 'public'); // Store the image in the "public/companyimage" directory
        }


        $profile = Companyprofile::create([
            '_name' => $request->name,
            '_email' => $request->email,
            '_phone' => $request->phone,
            '_mobile' => $request->mobile,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            '_description' => $request->description,
            '_website' => $request->website,
            '_image' => asset("/uploads") . "/" . $path,
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    //Show
    public function show()
    {
        $profile = Companyprofile::all();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    //Update
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'mobile' => ['required', 'string', 'max:15'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }

        $path = "";
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('companyimage', 'public'); // Store the image in the "public/companyimage" directory
        }


        if ($request->hasFile('image')) {

            $profile = Companyprofile::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_email' => $request->email,
                '_phone' => $request->phone,
                '_mobile' => $request->mobile,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                '_description' => $request->description,
                '_website' => $request->website,
                'vat_percentage' => $request->vatpercentage,
                '_image' => asset("/uploads") . "/" . $path,

            ]);
        } else {
            $profile = Companyprofile::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_email' => $request->email,
                '_phone' => $request->phone,
                '_mobile' => $request->mobile,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                '_description' => $request->description,
                '_website' => $request->website,
                'vat_percentage' => $request->vatpercentage,
            ]);
        }

        return response()->json(['status' => true, 'profile' => $profile]);
    }
}
