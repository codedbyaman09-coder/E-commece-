import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, Calendar, Trash2, ShieldCheck, User } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    api.get('/users')
      .then(res => setCustomers(res.data))
      .catch(() => showToast('Failed to load customers', 'error'))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer? All their data will be lost.')) {
      try {
        await api.delete(`/users/${id}`);
        showToast('Customer deleted successfully', 'success');
        fetchCustomers();
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed to delete customer', 'error');
      }
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Customer Management</h1>
        <p className="text-gray-500 mt-2">View and manage your registered store customers.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Email</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Joined Date</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Total Orders</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Role</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 uppercase tracking-tighter">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-8 py-6"><div className="h-12 bg-gray-50 rounded-2xl"></div></td>
                  </tr>
                ))
              ) : customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-bold text-black">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 lowercase">{customer.email}</td>
                  <td className="px-8 py-6 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(customer.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-8 py-6 font-bold">
                    {customer.orders_count || 0} Orders
                  </td>
                  <td className="px-8 py-6">
                    {customer.is_admin ? (
                      <span className="flex items-center space-x-1 text-accent font-black">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Admin</span>
                      </span>
                    ) : (
                      <span className="text-gray-400 font-bold">Member</span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => !customer.is_admin && handleDelete(customer.id)}
                      disabled={customer.is_admin}
                      className={`p-2 rounded-lg transition-colors ${customer.is_admin ? 'text-gray-100 cursor-not-allowed' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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

export default AdminCustomers;
