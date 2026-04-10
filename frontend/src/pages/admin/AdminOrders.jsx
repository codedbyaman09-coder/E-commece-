import React, { useEffect, useState } from 'react';
import { ShoppingBag, Eye, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    api.get('/orders?all=true')
      .then(res => setOrders(res.data))
      .catch(() => showToast('Failed to load orders', 'error'))
      .finally(() => setLoading(false));
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      showToast('Order status updated', 'success');
      fetchOrders();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Order Management</h1>
        <p className="text-gray-500 mt-2">Manage customer orders and track fulfillment status.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Items</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Total</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-8 py-6"><div className="h-12 bg-gray-50 rounded-2xl"></div></td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                   <td colSpan="6" className="px-8 py-24 text-center">
                      <p className="text-gray-500 font-bold">No orders found.</p>
                   </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-sm">#ORD-{order.id}</span>
                    <p className="text-[10px] text-gray-400 uppercase mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col text-sm">
                      <span className="font-bold">{order.user?.name}</span>
                      <span className="text-xs text-gray-400">{order.user?.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium">{order.items?.length} items</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-sm">
                    ${parseFloat(order.total_amount).toFixed(2)}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-3">
                       <button 
                        onClick={() => handleStatusUpdate(order.id, 'shipped')}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"
                        title="Mark as Shipped"
                       >
                         <Truck className="h-4 w-4" />
                       </button>
                       <button 
                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                        className="p-2 hover:bg-green-50 rounded-lg text-green-500 transition-colors"
                        title="Mark as Completed"
                       >
                         <CheckCircle className="h-4 w-4" />
                       </button>
                       <button 
                        onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        title="Cancel Order"
                       >
                         <XCircle className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
