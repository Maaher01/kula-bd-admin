<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\CategoryImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit;
        $profile = Category::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'images' => ['array', 'max:2'],
            'images.*.image' => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $category = Category::create([
            'name' => $request->name,
        ]);

        if ($request->has('images')) {
            $uploadCount = count($request->images);

            if ($uploadCount > 2) {
                return response()->json([
                    'status' => false,
                    'message' => 'You can upload only up to 2 images per category.'
                ], 422);
            }

            foreach ($request->images as $img) {
                $file = $img['image'];

                $path = $file->store('category_images', 'public');

                $category->categoryImages()->create([
                    'category_id' => $category->id,
                    'image_path' => $path,
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'data' => $category->load('categoryImages')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::with('categoryImages')->find($id);
        return response()->json(['status' => true, 'data' => $category]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'images' => ['array', 'max:2'],
            'images.*.image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 202);
        }

        $category = Category::with('categoryImages')->findOrFail($id);
        $existingCount = $category->categoryImages->count();
        $deletedCount = $request->deleted_images ? count($request->deleted_images) : 0;
        $newUploads = $request->has('images') ? count($request->images) : 0;

        $finalCount = $existingCount - $deletedCount + $newUploads;

        if ($finalCount > 2) {
            return response()->json([
                'status' => false,
                'message' => 'You can upload only up to 2 images per category.'
            ], 422);
        }

        // Update basic info
        $category->update([
            'name' => $request->name,
        ]);

        if ($request->has('images')) {
            foreach ($request->images as $img) {
                // Only process NEW uploaded files
                if (isset($img['image']) && $img['image'] instanceof \Illuminate\Http\UploadedFile) {

                    $path = $img['image']->store('category_images', 'public');

                    $category->categoryImages()->create([
                        'image_path' => $path,
                    ]);
                }
            }
        }

        if ($request->deleted_images) {
            foreach ($request->deleted_images as $id) {
                $img = CategoryImage::find($id);

                if ($img) {
                    // delete file
                    Storage::delete('public/' . $img->image_path);

                    // delete DB record
                    $img->delete();
                }
            }
        }

        return response()->json([
            'status' => true,
            'profile' => $category->load('categoryImages')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['status' => true, 'message' => 'Category deleted successfully']);
    }
}
