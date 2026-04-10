<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // One default user
        User::factory()->create([
            'name' => 'Demo User',
            'email' => 'admin@luxe.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        $categories = [
            ['name' => 'Smartphones', 'slug' => 'phones', 'description' => 'The latest mobile technology.'],
            ['name' => 'Laptops', 'slug' => 'laptops', 'description' => 'Powerful computers for work and play.'],
            ['name' => 'Audio', 'slug' => 'audio', 'description' => 'Immersive sound experiences.'],
            ['name' => 'Wearables', 'slug' => 'watches', 'description' => 'Technology on your wrist.'],
        ];

        foreach ($categories as $cat) {
            $category = Category::create($cat);

            if ($cat['slug'] === 'phones') {
                Product::create([
                    'name' => 'iPhone 15 Pro',
                    'slug' => 'iphone-15-pro',
                    'description' => 'Titanium design, A17 Pro chip, Action button, and a more versatile Pro camera system.',
                    'price' => 999.00,
                    'stock_quantity' => 50,
                    'category_id' => $category->id,
                    'image' => 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
                    'is_featured' => true
                ]);
                Product::create([
                    'name' => 'Samsung Galaxy S24 Ultra',
                    'slug' => 'samsung-s24-ultra',
                    'description' => 'Experience AI like never before with the Galaxy S24 Ultra.',
                    'price' => 1299.00,
                    'stock_quantity' => 30,
                    'category_id' => $category->id,
                    'image' => 'https://images.unsplash.com/photo-1707297835154-159e13d1000b?auto=format&fit=crop&q=80&w=800',
                    'is_featured' => true
                ]);
            }

            if ($cat['slug'] === 'audio') {
                Product::create([
                    'name' => 'AirPods Max',
                    'slug' => 'airpods-max',
                    'description' => 'High-fidelity audio. Magical AirPods experience. Bold colors.',
                    'price' => 549.00,
                    'stock_quantity' => 20,
                    'category_id' => $category->id,
                    'image' => 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800',
                    'is_featured' => true
                ]);
                Product::create([
                    'name' => 'Sony WH-1000XM5',
                    'slug' => 'sony-wh-1000xm5',
                    'description' => 'Industry-leading noise cancellation with two processors controlling eight microphones.',
                    'price' => 349.00,
                    'stock_quantity' => 40,
                    'category_id' => $category->id,
                    'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
                    'is_featured' => false
                ]);
            }

            if ($cat['slug'] === 'laptops') {
                Product::create([
                    'name' => 'MacBook Air M3',
                    'slug' => 'macbook-air-m3',
                    'description' => 'The M3 chip brings even greater capabilities to the superportable 13-inch MacBook Air.',
                    'price' => 1099.00,
                    'stock_quantity' => 25,
                    'category_id' => $category->id,
                    'image' => 'https://images.unsplash.com/photo-1517336713481-48c91bb8678c?auto=format&fit=crop&q=80&w=800',
                    'is_featured' => true
                ]);
            }

            if ($cat['slug'] === 'watches') {
                Product::create([
                    'name' => 'Apple Watch Ultra 2',
                    'slug' => 'apple-watch-ultra-2',
                    'description' => 'The most rugged and capable Apple Watch ever.',
                    'price' => 799.00,
                    'stock_quantity' => 15,
                    'category_id' => $category->id,
                    'image' => 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800',
                    'is_featured' => true
                ]);
            }
        }
    }
}
