import React, { useEffect, useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { wishlistService } from '../services/api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistService.get()
      .then(res => setWishlist(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center space-x-4 mb-12">
        <div className="bg-red-50 p-4 rounded-3xl">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
        </div>
        <h1 className="text-4xl font-extrabold">Your Wishlist</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-96 bg-gray-50 rounded-3xl animate-pulse"></div>)}
        </div>
      ) : wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[40px]">
          <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Found something you like? Tap the heart icon to save it here for later.</p>
          <button className="btn-primary">Explore Products</button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
