import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, if API fails, use dummy data
    productService.getFeatured()
      .then(res => {
        setFeaturedProducts(res.data);
      })
      .catch(() => {
        setFeaturedProducts([
          { id: 1, name: 'iPhone 15 Pro', slug: 'iphone-15-pro', price: 999, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400', category: { name: 'Phones' } },
          { id: 2, name: 'MacBook Air M3', slug: 'macbook-air-m3', price: 1099, image: 'https://images.unsplash.com/photo-1517336713481-48c91bb8678c?auto=format&fit=crop&q=80&w=400', category: { name: 'Laptops' } },
          { id: 3, name: 'AirPods Max', slug: 'airpods-max', price: 549, image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=400', category: { name: 'Audio' } },
          { id: 4, name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', price: 799, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=400', category: { name: 'Watches' } },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">New arrival 2024</span>
            <h1 className="text-6xl md:text-8xl font-extrabold text-black leading-tight mb-6">
              The Next Gen <br /> <span className="text-gray-400">Innovation.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-md">
              Experience the future of technology with our premium selection of electronics. Simple, elegant, and powerful.
            </p>
            <div className="flex space-x-4">
              <Link to="/shop" className="btn-primary flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2">Featured Products</h2>
            <p className="text-gray-500">Handpicked for your sophisticated lifestyle.</p>
          </div>
          <Link to="/shop" className="text-black font-semibold flex items-center hover:text-accent transition-colors">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96 rounded-3xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" alt="Audio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-10">
              <h3 className="text-3xl font-bold text-white mb-2">Immersive Audio</h3>
              <p className="text-gray-200 mb-6">Experience sound like never before.</p>
              <Link to="/shop?category=audio" className="w-fit bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-100">Shop Audio</Link>
            </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1542491595-3011351f7ad9?auto=format&fit=crop&q=80&w=800" alt="Watches" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-10">
              <h3 className="text-3xl font-bold text-white mb-2">Smart Watches</h3>
              <p className="text-gray-200 mb-6">Technology on your wrist.</p>
              <Link to="/shop?category=watches" className="w-fit bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-100">Shop Watches</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-50 p-6 rounded-3xl mb-6">
              <Truck className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-500">Fast and free delivery on all orders over $100.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-50 p-6 rounded-3xl mb-6">
              <Shield className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-500">Your data is protected with military-grade encryption.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-50 p-6 rounded-3xl mb-6">
              <Zap className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Support</h3>
            <p className="text-gray-500">24/7 dedicated support for all your queries.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
