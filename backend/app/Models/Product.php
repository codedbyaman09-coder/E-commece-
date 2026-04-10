<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'price', 'discount_price', 
        'stock_quantity', 'category_id', 'image', 'is_featured'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
