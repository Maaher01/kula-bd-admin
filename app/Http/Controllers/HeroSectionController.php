<?php

namespace App\Http\Controllers;

use App\Models\HeroSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HeroSectionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'image' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('heroimage', 'public'); // Store the image in the "public/heroimage" directory
        }

        $profile = HeroSection::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_status' => $request->status,
            '_image' => asset("/uploads") . "/" . $path
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HeroSection 
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $limit = $request->limit;
        $profile = HeroSection::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HeroSection
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $profile = HeroSection::where('id', $id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HeroSection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'image' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('heroimage', 'public'); // Store the image in the "public/heroimage" directory
        }

        if ($request->hasFile('image')) {
            $profile = HeroSection::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_status' => $request->status,
                '_image' => asset("/uploads") . "/" . $path

            ]);
        } else {
            $profile = HeroSection::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_status' => $request->status,
            ]);
        }


        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HeroSection
     * @return \Illuminate\Http\Response
     */
    public function destroy(HeroSection $hero_section)
    {
        $hero_section->delete();

        return response()->json(['status' => true, 'message' => 'Section deleted successfully']);
    }
}
