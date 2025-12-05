<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit;
        $orders = Order::orderBy('created_at', 'desc')->paginate($limit);

        return response()->json(['status' => true, 'data' => $orders]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $order = Order::with('orderItems.product.productImages')->where('id', $id)->first();

        return response()->json(['status' => true, 'data' => $order]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        $order->update($request->only([
            'order_status',
            'payment_status'
        ]));

        $order->save();

        return response()->json(['status' => true, 'data' => $order->load('orderItems.product.productImages'),]);
    }
}
