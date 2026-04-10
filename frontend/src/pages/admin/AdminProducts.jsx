import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ExternalLink, X } from 'lucide-react';
import api, { productService, categoryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    stock_quantity: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
  });

  useEffect(() => {
    fetchProducts();
    categoryService.getAll().then(res => setCategories(res.data));
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    productService.getAll()
      .then(res => setProducts(res.data.data))
      .catch(() => showToast('Failed to load products', 'error'))
      .finally(() => setLoading(false));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock_quantity: product.stock_quantity,
      description: product.description,
      image: product.image
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formData);
        showToast('Product updated successfully', 'success');
      } else {
        await api.post('/products', formData);
        showToast('Product added successfully', 'success');
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      showToast(err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '', category_id: '', price: '', stock_quantity: '', description: '', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
       try {
         await api.delete(`/products/${id}`);
         showToast('Product deleted', 'success');
         fetchProducts();
       } catch (err) {
         showToast('Failed to delete product', 'error');
       }
    }
  };

  return (
    <div className="space-y-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Products Management</h1>
          <p className="text-gray-500 mt-2">Add, edit, or remove products from your store catalog.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-3 h-14 px-8"
        >
          <Plus className="h-5 w-5" />
          <span>New Product</span>
        </button>
      </div>

      {/* Toolbar etc... */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full h-12 bg-gray-50 border-none rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-gray-50 h-12 px-6 rounded-xl font-bold">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter</span>
          </button>
          <select className="flex-1 md:flex-none bg-gray-50 border-none rounded-xl h-12 px-6 text-sm font-bold">
            <option>All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Price</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Stock</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-8 py-6"><div className="h-12 bg-gray-50 rounded-2xl"></div></td>
                  </tr>
                ))
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">id: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-black/5 px-3 py-1 rounded-full text-xs font-bold">{product.category?.name}</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-sm">${product.price}</td>
                  <td className="px-8 py-6">
                     <span className={`text-xs font-bold ${product.stock_quantity < 10 ? 'text-red-500' : 'text-green-500'}`}>
                       {product.stock_quantity} in stock
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-black"
                       >
                         <Edit2 className="h-4 w-4" />
                       </button>
                       <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-red-500"
                       >
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center">
                 <h2 className="text-3xl font-extrabold">{editingProduct ? 'Edit Product' : 'New Product'}</h2>
                 <button onClick={closeModal} className="p-2 hover:bg-gray-50 rounded-full">
                    <X className="h-6 w-6" />
                 </button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                 {/* Form Fields... */}
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-400 ml-1">Product Name</label>
                       <input 
                        type="text" required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 focus:ring-2 focus:ring-black"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-400 ml-1">Category</label>
                       <select 
                        required
                        value={formData.category_id}
                        onChange={e => setFormData({...formData, category_id: e.target.value})}
                        className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 focus:ring-2 focus:ring-black"
                       >
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-400 ml-1">Price ($)</label>
                       <input 
                        type="number" required
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 focus:ring-2 focus:ring-black"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-400 ml-1">Stock Quantity</label>
                       <input 
                        type="number" required
                        value={formData.stock_quantity}
                        onChange={e => setFormData({...formData, stock_quantity: e.target.value})}
                        className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 focus:ring-2 focus:ring-black"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-1">Description</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full h-32 bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-black"
                    ></textarea>
                 </div>

                 <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full btn-primary h-14 font-bold text-lg disabled:opacity-50"
                    >
                      {submitting ? 'Processing...' : (editingProduct ? 'Update Product' : 'Create Product')}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
