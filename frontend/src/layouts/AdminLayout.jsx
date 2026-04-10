import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Protect admin routes
  if (!user || !user.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col space-y-6">
        <h1 className="text-4xl font-extrabold">Access Denied</h1>
        <p className="text-gray-500">You do not have permission to access this area.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBFBFB]">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 p-8 flex flex-col fixed h-full z-10">
        <div className="mb-12">
          <Link to="/" className="text-2xl font-black tracking-tighter">LUXE <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full ml-1">ADMIN</span></Link>
        </div>

        <nav className="flex-grow space-y-2">
          <SidebarLink to="/admin" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" end />
          <SidebarLink to="/admin/products" icon={<Package className="h-5 w-5" />} label="Products" />
          <SidebarLink to="/admin/orders" icon={<ShoppingBag className="h-5 w-5" />} label="Orders" />
          <SidebarLink to="/admin/customers" icon={<Users className="h-5 w-5" />} label="Customers" />
          <SidebarLink to="/admin/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
        </nav>

        <div className="pt-8 border-t border-gray-100 flex flex-col space-y-2">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-3 text-gray-400 hover:text-black hover:bg-gray-50 px-6 py-4 rounded-2xl font-bold transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Store View</span>
          </button>
          <button 
            onClick={logout} 
            className="flex items-center space-x-3 text-red-500 hover:bg-red-50 px-6 py-4 rounded-2xl font-bold transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-80 p-12 lg:p-16">
        <Outlet />
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, end }) => (
  <NavLink 
    to={to} 
    end={end}
    className={({ isActive }) => `
      flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all
      ${isActive ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}
    `}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default AdminLayout;
