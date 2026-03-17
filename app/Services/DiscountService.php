<?php

namespace App\Services;

use App\Models\Discount;

class DiscountService
{
    public function getValidDiscount($code, $user)
    {
        return Discount::where('code', $code)
            ->active()
            ->valid()
            ->first();
    }

    public function calculateDiscount($discount, $cartTotal)
    {
        if ($discount->type === 'percentage') {
            $amount = ($cartTotal * $discount->value) / 100;

            if ($discount->max_discount) {
                $amount = min($amount, $discount->max_discount);
            }

            return $amount;
        }

        if ($discount->type === 'fixed') {
            return min($discount->value, $cartTotal);
        }

        return 0;
    }
}
