<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiscountController extends Controller
{
    /**
     * Display list of discounts
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?? 20;

        $discounts = Discount::latest()->paginate($limit);

        return response()->json([
            'status' => true,
            'data' => $discounts
        ]);
    }

    /**
     * Store new discount
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'nullable|string|max:100|unique:discounts,code',
            'scope' => 'required|string',
            'type' => 'required|string',
            'value' => 'nullable|numeric',
            'min_purchase' => 'nullable|numeric',
            'max_discount' => 'nullable|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'per_user_limit' => 'nullable|integer',

            'buy_product_id' => 'nullable|exists:products,id',
            'buy_category_id' => 'nullable|exists:categories,id',
            'buy_quantity' => 'nullable|integer',

            'get_product_id' => 'nullable|exists:products,id',
            'get_category_id' => 'nullable|exists:categories,id',
            'get_quantity' => 'nullable|integer',

            'products' => 'nullable|array',
            'categories' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        $data['first_order_only'] = $request->boolean('first_order_only');
        $data['is_stackable'] = $request->boolean('is_stackable');
        $data['is_active'] = $request->boolean('is_active');

        $discount = Discount::create($data);

        if ($request->products) {
            $discount->products()->sync($request->products);
        }

        if ($request->categories) {
            $discount->categories()->sync($request->categories);
        }

        return response()->json([
            'status' => true,
            'data' => $discount
        ]);
    }

    /**
     * Show single discount
     */
    public function edit($id)
    {
        $discount = Discount::with(['products', 'categories'])->find($id);

        if (!$discount) {
            return response()->json([
                'status' => false,
                'message' => 'Discount not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $discount
        ]);
    }

    /**
     * Update discount
     */
    public function update(Request $request, $id)
    {
        $discount = Discount::find($id);

        if (!$discount) {
            return response()->json([
                'status' => false,
                'message' => 'Discount not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'code' => 'nullable|string|max:100|unique:discounts,code,' . $discount->id,
            'scope' => 'required|string',
            'type' => 'required|string',
            'value' => 'nullable|numeric',
            'min_purchase' => 'nullable|numeric',
            'max_discount' => 'nullable|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'per_user_limit' => 'nullable|integer',

            'buy_product_id' => 'nullable|exists:products,id',
            'buy_category_id' => 'nullable|exists:categories,id',
            'buy_quantity' => 'nullable|integer',

            'get_product_id' => 'nullable|exists:products,id',
            'get_category_id' => 'nullable|exists:categories,id',
            'get_quantity' => 'nullable|integer',

            'products' => 'nullable|array',
            'categories' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        $data['first_order_only'] = $request->boolean('first_order_only');
        $data['is_stackable'] = $request->boolean('is_stackable');
        $data['is_active'] = $request->boolean('is_active');

        $discount->update($data);

        if ($request->products) {
            $discount->products()->sync($request->products);
        } else {
            $discount->products()->detach();
        }

        if ($request->categories) {
            $discount->categories()->sync($request->categories);
        } else {
            $discount->categories()->detach();
        }

        return response()->json([
            'status' => true,
            'data' => $discount
        ]);
    }

    /**
     * Delete discount
     */
    public function destroy($id)
    {
        $discount = Discount::find($id);

        if (!$discount) {
            return response()->json([
                'status' => false,
                'message' => 'Discount not found'
            ], 404);
        }

        $discount->products()->detach();
        $discount->categories()->detach();

        $discount->delete();

        return response()->json([
            'status' => true,
            'message' => 'Discount deleted successfully'
        ]);
    }
}
