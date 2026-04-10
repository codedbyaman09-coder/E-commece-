import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productService, categoryService } from '../services/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(currentSearch);
  const currentSort = searchParams.get('sort') || '';

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (localSearch) params.set('search', localSearch);
      else params.delete('search');
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    categoryService.getAll().then(res => setCategories(res.data)).catch(() => {
      setCategories([
        { id: 1, name: 'Phones', slug: 'phones' },
        { id: 2, name: 'Laptops', slug: 'laptops' },
        { id: 3, name: 'Audio', slug: 'audio' },
        { id: 4, name: 'Watches', slug: 'watches' },
      ]);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    productService.getAll({
      category: currentCategory,
      search: currentSearch,
      sort: currentSort
    }).then(res => {
      setProducts(res.data.data || []);
    }).catch(() => {
      // Dummy data fallback
      setProducts([
        { id: 1, name: 'iPhone 15 Pro', slug: 'iphone-15-pro', price: 999, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400', category: { name: 'Phones' } },
        { id: 2, name: 'MacBook Air M3', slug: 'macbook-air-m3', price: 1099, image: 'https://images.unsplash.com/photo-1517336713481-48c91bb8678c?auto=format&fit=crop&q=80&w=400', category: { name: 'Laptops' } },
        { id: 3, name: 'AirPods Max', slug: 'airpods-max', price: 549, image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=400', category: { name: 'Audio' } },
        { id: 4, name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', price: 799, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=400', category: { name: 'Watches' } },
        { id: 5, name: 'iPad Pro', slug: 'ipad-pro', price: 899, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400', category: { name: 'Tablets' } },
        { id: 6, name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', price: 349, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', category: { name: 'Audio' } },
      ]);
    }).finally(() => setLoading(false));
  }, [currentCategory, currentSearch, currentSort]);

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) params.set('category', slug);
    else params.delete('category');
    setSearchParams(params);
  };

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    if (sort) params.set('sort', sort);
    else params.delete('sort');
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Shop All Products</h1>
          <p className="text-gray-500">Showing {products.length} products</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-6 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-64">
             <input 
                type="text" 
                placeholder="Search..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-gray-50 border-gray-200 rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-black outline-none transition-all"
             />
             <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center border border-gray-200 rounded-full p-1">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-full ${view === 'grid' ? 'bg-black text-white' : 'text-gray-400'}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-full ${view === 'list' ? 'bg-black text-white' : 'text-gray-400'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 border border-gray-200 px-6 py-2.5 rounded-full font-medium hover:bg-gray-50 transition-colors">
                <span>Sort: {currentSort === 'low-high' ? 'Price Low-High' : currentSort === 'high-low' ? 'Price High-Low' : 'Default'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-20">
                <button onClick={() => handleSortChange('')} className="w-full text-left px-6 py-2 hover:bg-gray-50 text-sm">Default</button>
                <button onClick={() => handleSortChange('low-high')} className="w-full text-left px-6 py-2 hover:bg-gray-50 text-sm">Price: Low to High</button>
                <button onClick={() => handleSortChange('high-low')} className="w-full text-left px-6 py-2 hover:bg-gray-50 text-sm">Price: High to Low</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-3" /> Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-3">
                <button 
                  onClick={() => handleCategoryChange('')}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${!currentCategory ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${currentCategory === cat.slug ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 bg-black rounded-3xl text-white">
              <h4 className="text-xl font-bold mb-4">Summer Sale</h4>
              <p className="text-gray-400 text-sm mb-6">Up to 50% off on selected headphones. Limited time offer.</p>
              <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm w-full">Claim Offer</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse"></div>)}
             </div>
          ) : products.length > 0 ? (
            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-3xl">
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
