<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'scope',
        'type',
        'value',
        'min_purchase',
        'max_discount',
        'start_date',
        'end_date',
        'per_user_limit',
        'first_order_only',
        'is_stackable',
        'buy_product_id',
        'buy_category_id',
        'buy_quantity',
        'get_product_id',
        'get_category_id',
        'get_quantity',
        'is_active'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'first_order_only' => 'boolean',
        'is_stackable' => 'boolean',
        'is_active' => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function products()
    {
        return $this->belongsToMany(Product::class, 'discount_product');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'discount_category');
    }

    public function usages()
    {
        return $this->hasMany(DiscountUsage::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeValid($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('start_date')
                ->orWhere('start_date', '<=', now());
        })->where(function ($q) {
            $q->whereNull('end_date')
                ->orWhere('end_date', '>=', now());
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Helper Methods
    |--------------------------------------------------------------------------
    */

    public function isValid()
    {
        if (!$this->is_active) {
            return false;
        }

        if ($this->start_date && $this->start_date->isFuture()) {
            return false;
        }

        if ($this->end_date && $this->end_date->isPast()) {
            return false;
        }

        return true;
    }

    public function calculatePercentageDiscount($amount)
    {
        if ($this->type !== 'percentage') {
            return 0;
        }

        $discount = ($amount * $this->value) / 100;

        if ($this->max_discount) {
            $discount = min($discount, $this->max_discount);
        }

        return $discount;
    }

    public function calculateFixedDiscount($amount)
    {
        if ($this->type !== 'fixed') {
            return 0;
        }

        return min($this->value, $amount);
    }
}
