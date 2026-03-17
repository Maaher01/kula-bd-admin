<?php

namespace App\Http\Controllers;

use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = Order::count();

        $totalRevenue = Order::where('payment_status', 'paid')
            ->sum('grand_total');

        $pendingOrders = Order::where('order_status', 'pending')->count();

        $processingOrders = Order::where('order_status', 'processing')->count();

        $deliveredOrders = Order::where('order_status', 'delivered')->count();

        $cancelledOrders = Order::where('order_status', 'cancelled')->count();

        $todayOrders = Order::whereDate('created_at', today())->count();

        $todayRevenue = Order::whereDate('created_at', today())
            ->where('payment_status', 'paid')
            ->sum('grand_total');

        return response()->json([
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'pendingOrders' => $pendingOrders,
            'processingOrders' => $processingOrders,
            'deliveredOrders' => $deliveredOrders,
            'cancelledOrders' => $cancelledOrders,
            'todayOrders' => $todayOrders,
            'todayRevenue' => $todayRevenue,
        ]);
    }
}
