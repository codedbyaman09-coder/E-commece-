import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Truck, ShieldCheck, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user } = useAuth();
  const { cartTotal, cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Please Sign In</h2>
        <p className="text-gray-500 mb-8">You need to be logged in to complete your purchase.</p>
        <Link to="/login" className="btn-primary">Sign In to Checkout</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const shippingAddress = `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      
      const response = await api.post('/orders', {
        shipping_address: shippingAddress,
        total_amount: cartTotal
      });

      if (response.status === 200 || response.status === 201) {
        showToast('Order placed successfully!', 'success');
        clearCart();
        setOrderCompleted(true);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (orderCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </motion.div>
        <h2 className="text-4xl font-extrabold mb-4">Thank You!</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="btn-primary">View My Orders</button>
          <button onClick={() => navigate('/')} className="btn-secondary">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-extrabold mb-10">Shipping Details</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-black" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-black" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">Street Address</label>
              <input 
                type="text" 
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-black" 
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">City</label>
                <input 
                  type="text" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-black" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">State</label>
                <input 
                  type="text" 
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-black" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">ZIP Code</label>
                <input 
                  type="text" 
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-black" 
                />
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button 
                type="submit" 
                disabled={loading || cart.length === 0}
                className="btn-primary flex items-center space-x-3 h-14 px-10 disabled:opacity-50 disabled:scale-100"
              >
                <span>{loading ? 'Processing...' : 'Place Order'}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="lg:w-1/3">
           <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm sticky top-24">
             <h2 className="text-2xl font-bold mb-8">Summary ({cart.length})</h2>
             <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
               {cart.map(item => (
                 <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                       <img src={item.image} className="h-12 w-12 rounded-xl object-cover" />
                       <div>
                         <p className="font-bold text-sm truncate w-24 sm:w-32">{item.name}</p>
                         <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                       </div>
                    </div>
                    <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                 </div>
               ))}
             </div>

             <div className="pt-8 border-t border-gray-100 space-y-4">
               <div className="flex justify-between text-gray-500">
                 <span>Subtotal</span>
                 <span>${cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-500">
                 <span>Shipping</span>
                 <span className="text-green-500 font-bold">FREE</span>
               </div>
               <div className="flex justify-between font-extrabold text-2xl pt-4">
                 <span>Total</span>
                 <span>${cartTotal.toFixed(2)}</span>
               </div>
             </div>

             <div className="mt-10 space-y-4">
               <div className="flex items-center space-x-3 text-xs text-gray-400">
                 <Truck className="h-4 w-4" />
                 <span>Free standard shipping applied</span>
               </div>
               <div className="flex items-center space-x-3 text-xs text-gray-400">
                 <ShieldCheck className="h-4 w-4" />
                 <span>Secure payment with SSL encryption</span>
               </div>
               <div className="flex items-center space-x-3 text-xs text-gray-400">
                 <CreditCard className="h-4 w-4" />
                 <span>All major cards accepted</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
