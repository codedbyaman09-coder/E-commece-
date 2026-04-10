import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Heart, Settings, LogOut, User as UserIcon, MapPin, CreditCard } from 'lucide-react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (activeTab === 'orders') {
      setLoading(true);
      api.get('/orders')
        .then(res => setOrders(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  if (!user) return (
    <div className="py-32 text-center bg-gray-50 min-h-screen flex flex-col items-center justify-center">
       <h2 className="text-3xl font-bold mb-4">Please login to view dashboard</h2>
       <Link to="/login" className="btn-primary px-12">Sign In</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm sticky top-24">
            <div className="flex flex-col items-center mb-10 text-center">
               <div className="h-24 w-24 bg-black text-white rounded-full flex items-center justify-center mb-4 text-3xl font-black">
                 {user.name.charAt(0)}
               </div>
               <h2 className="text-xl font-bold">{user.name}</h2>
               <p className="text-gray-400 text-sm">{user.email}</p>
               {user.is_admin && <span className="mt-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase">Admin Access</span>}
            </div>
            
            <nav className="space-y-2">
              <TabButton 
                active={activeTab === 'orders'} 
                onClick={() => setActiveTab('orders')}
                icon={<Package className="h-5 w-5" />}
                label="My Orders"
              />
              <Link to="/wishlist" className="w-full flex items-center space-x-3 text-gray-400 hover:bg-gray-50 px-6 py-4 rounded-2xl font-bold transition-all">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <TabButton 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
                icon={<UserIcon className="h-5 w-5" />}
                label="Account Profile"
              />
              <TabButton 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
              />
              <button 
                onClick={logout} 
                className="w-full flex items-center space-x-3 text-red-500 hover:bg-red-50 px-6 py-4 rounded-2xl font-bold transition-all mt-10"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-3xl font-extrabold mb-10">Order History</h2>
              {loading ? (
                <div className="space-y-6">
                  {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-50 rounded-[32px] animate-pulse"></div>)}
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-[32px] p-8 hover:shadow-lg transition-all border-l-4 border-l-black">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Order ID</p>
                          <p className="font-bold text-sm">#ORD-{order.id}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Placed On</p>
                           <p className="font-bold text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Status</p>
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                             order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                             order.status === 'pending' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                           }`}>
                             {order.status}
                           </span>
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total</p>
                           <p className="font-black text-lg text-black">${order.total_amount}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex -space-x-4">
                          {order.items.map((item, idx) => (
                            <img key={idx} src={item.product.image} className="h-14 w-14 rounded-2xl ring-4 ring-white object-cover shadow-sm" alt="product" />
                          ))}
                        </div>
                        <div className="flex-grow">
                           <p className="text-xs text-gray-500 font-medium">Ship to: {order.shipping_address}</p>
                        </div>
                        <button className="btn-secondary text-xs px-6 py-2.5">Track Order</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-[40px] p-24 text-center">
                   <Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                   <h3 className="text-xl font-bold mb-2">No orders found</h3>
                   <p className="text-gray-400 mb-8">Ready to start your premium shopping experience?</p>
                   <Link to="/shop" className="btn-primary px-10">Start Shopping</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-3xl font-extrabold mb-10">Account Settings</h2>
               <div className="bg-white border border-gray-100 rounded-[40px] p-10 space-y-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 ml-1">Full Name</label>
                        <div className="h-14 bg-gray-50 rounded-2xl flex items-center px-6 font-bold text-gray-800">{user.name}</div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 ml-1">Email Address</label>
                        <div className="h-14 bg-gray-50 rounded-2xl flex items-center px-6 font-bold text-gray-800">{user.email}</div>
                     </div>
                  </div>
                  <div className="p-8 bg-blue-50 rounded-3xl flex items-center space-x-6">
                     <div className="bg-white p-4 rounded-2xl shadow-sm italic font-black text-blue-500 text-xl">
                        PRO
                     </div>
                     <div>
                        <h4 className="font-bold text-blue-900">Premium Member</h4>
                        <p className="text-sm text-blue-600">You have access to exclusive early-bird tech deals.</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-32 bg-gray-50 rounded-[40px]">
               <Settings className="h-12 w-12 text-gray-300 mx-auto mb-6 animate-spin-slow" />
               <h3 className="text-xl font-bold mb-2">Security Settings</h3>
               <p className="text-gray-400">Manage your password and security preferences (Coming Soon).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${
      active ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Dashboard;
