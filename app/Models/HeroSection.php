<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    use HasFactory;

    protected $table = 'hero_section'; // 👈 Add this line

    protected $fillable = [
        '_title',
        '_subtitle',
        '_status',
        '_image',
    ];
}
