import React, { useEffect, useState } from 'react';
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 28400,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Failed to fetch stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 animate-pulse">Loading Statistics...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Admin Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back, manager. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}`} 
            icon={<DollarSign className="h-6 w-6" />}
            trend="+12.5%"
            trendUp={true}
        />
        <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={<ShoppingBag className="h-6 w-6" />}
            trend="+8.2%"
            trendUp={true}
        />
        <StatCard 
            title="Active Products" 
            value={stats.totalProducts} 
            icon={<Package className="h-6 w-6" />}
            trend="-2"
            trendUp={false}
        />
        <StatCard 
            title="Total Customers" 
            value={stats.totalUsers} 
            icon={<Users className="h-6 w-6" />}
            trend="+48"
            trendUp={true}
        />
      </div>

      {/* Charts & Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold">Revenue Growth</h3>
             <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2">
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
             </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
             {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-gray-50 rounded-2xl relative group">
                   <div 
                    className="absolute bottom-0 w-full bg-black rounded-2xl transition-all duration-700 ease-out" 
                    style={{ height: `${h}%` }}
                   ></div>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
           <h3 className="text-xl font-bold mb-8">Top Categories</h3>
           <div className="space-y-6">
              <CategoryProgress name="Smartphones" value={75} color="bg-blue-500" />
              <CategoryProgress name="Laptops" value={45} color="bg-purple-500" />
              <CategoryProgress name="Audio" value={60} color="bg-orange-500" />
              <CategoryProgress name="Wearables" value={30} color="bg-teal-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-6">
       <div className="bg-gray-50 p-4 rounded-2xl text-black">
         {icon}
       </div>
       <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
         {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
         <span>{trend}</span>
       </div>
    </div>
    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">{title}</p>
    <h4 className="text-3xl font-extrabold">{value}</h4>
  </div>
);

const CategoryProgress = ({ name, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold">
      <span>{name}</span>
      <span className="text-gray-400">{value}%</span>
    </div>
    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
       <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default AdminDashboard;
