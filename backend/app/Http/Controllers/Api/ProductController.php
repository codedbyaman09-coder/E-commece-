<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('sort')) {
            if ($request->sort === 'low-high') {
                $query->orderBy('price', 'asc');
            } elseif ($request->sort === 'high-low') {
                $query->orderBy('price', 'desc');
            }
        }

        return response()->json($query->paginate(12));
    }

    public function show($slug)
    {
        $product = Product::with('category')->where('slug', $slug)->firstOrFail();
        return response()->json($product);
    }
    
    public function featured()
    {
        return response()->json(Product::where('is_featured', true)->take(8)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'required|string', // For now placeholder URL
        ]);

        $product = Product::create([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'category_id' => $request->category_id,
            'price' => $request->price,
            'description' => $request->description,
            'stock_quantity' => $request->stock_quantity,
            'image' => $request->image,
            'is_featured' => $request->is_featured ?? false,
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric|min:0',
            'category_id' => 'exists:categories,id',
        ]);

        $product->update($request->all());
        if ($request->has('name')) {
            $product->update(['slug' => \Illuminate\Support\Str::slug($request->name)]);
        }

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
