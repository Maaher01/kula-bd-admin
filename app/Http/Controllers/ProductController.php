<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit;
        $profile = Product::paginate($limit);
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
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'images' => 'array',
            'images.*.image' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048',
            'images.*.is_primary' => 'boolean',
            'images.*.sort_order' => 'integer',
            'quantity' => 'nullable|string',
            'remarks' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 202);
        }

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'remarks' => $request->remarks,
            'category_id' => $request->category_id,
        ]);

        if ($request->has('images')) {
            foreach ($request->images as $img) {
                $file = $img['image'];

                $path = $file->store('food_item_images', 'public');

                $product->productImages()->create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_primary' => $img['is_primary'] ?? false,
                    'sort_order' => $img['sort_order'] ?? 0,
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'data' => $product->load('productImages'),
            'message' => "Product created successfully"
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $product = Product::with('productImages')->find($id);
        return response()->json(['status' => true, 'data' => $product]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'images' => 'array',
            'images.*.image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'images.*.is_primary' => 'boolean',
            'images.*.sort_order' => 'integer',
            'quantity' => 'nullable|string',
            'remarks' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 202);
        }

        $product = Product::find($id);

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'remarks' => $request->remarks,
            'category_id' => $request->category_id,
        ]);

        if ($request->has('images')) {
            foreach ($request->images as $img) {
                // Only process NEW uploaded files
                if (isset($img['image']) && $img['image'] instanceof \Illuminate\Http\UploadedFile) {

                    $path = $img['image']->store('food_item_images', 'public');

                    $product->productImages()->create([
                        'image_path' => $path,
                        'is_primary' => $img['is_primary'] ?? false,
                        'sort_order' => $img['sort_order'] ?? 0,
                    ]);
                }
            }
        }

        return response()->json(['status' => true, 'data' => $product->load('productImages'),]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['status' => true, 'message' => 'Food item deleted successfully']);
    }
}
