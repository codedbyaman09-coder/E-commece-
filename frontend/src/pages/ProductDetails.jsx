import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Heart, Share2, Star, ShieldCheck, Truck } from 'lucide-react';
import api, { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    productService.getOne(slug).then(res => {
      setProduct(res.data);
      // Fetch reviews
      api.get(`/products/${res.data.id}/reviews`).then(rev => setReviews(rev.data));
    }).catch(() => {
      // Dummy data
      setProduct({
        id: 1, 
        name: 'iPhone 15 Pro', 
        slug: 'iphone-15-pro', 
        price: 999, 
        description: 'The iPhone 15 Pro features a professional-grade camera system, the powerful A17 Pro chip, and a sleek titanium design. It is the most advanced iPhone yet, designed for those who demand the best.',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800', 
        category: { name: 'Phones' },
        stock_quantity: 15
      });
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">Loading...</div>;
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-24">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Gallery */}
        <div className="lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="grid grid-cols-4 gap-4 mt-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-gray-50 rounded-2xl cursor-pointer hover:ring-2 ring-black transition-all"></div>
             ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2">
          <div className="space-y-8">
            <div>
              <Link to="/shop" className="text-gray-400 text-sm font-medium hover:text-black mb-4 inline-block">← Back to Shop</Link>
              <div className="flex items-center space-x-2 text-yellow-500 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                <span className="text-gray-400 text-sm">(48 Reviews)</span>
              </div>
              <h1 className="text-5xl font-extrabold text-black mb-4 tracking-tight">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-black">${product.price}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">In Stock</span>
              </div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center border border-gray-200 rounded-full h-14 px-4 bg-gray-50">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-6 text-lg font-bold w-4 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-grow flex items-center justify-center space-x-3 bg-black text-white h-14 rounded-full font-bold hover:bg-opacity-80 transition-all active:scale-95 px-8"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Bag</span>
              </button>
              <button className="h-14 w-14 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-50 p-3 rounded-2xl">
                   <Truck className="h-6 w-6 text-black" />
                </div>
                <div>
                   <h4 className="font-bold text-sm">Fast Delivery</h4>
                   <p className="text-xs text-gray-400">2-4 business days</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-50 p-3 rounded-2xl">
                   <ShieldCheck className="h-6 w-6 text-black" />
                </div>
                <div>
                   <h4 className="font-bold text-sm">Warranty</h4>
                   <p className="text-xs text-gray-400">1 year official warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl font-bold">Total Reviews ({reviews.length})</h2>
           <button className="btn-secondary text-sm px-8">Write a Review</button>
        </div>
        
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                          {review.user?.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{review.user?.name}</p>
                          <p className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {review.comment}
                  </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[40px]">
             <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
