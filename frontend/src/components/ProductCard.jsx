import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={product.image || 'https://via.placeholder.com/400x500'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button className="bg-white p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <Link to={`/product/${product.slug}`} className="bg-white p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
              <Eye className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Labels */}
        {product.discount_price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            Sale
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category?.name || 'Category'}</p>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-black">${product.price}</span>
            {product.discount_price && (
              <span className="text-sm text-gray-400 line-through">${product.discount_price}</span>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
