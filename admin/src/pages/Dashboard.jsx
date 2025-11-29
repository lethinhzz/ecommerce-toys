import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
    uniqueCustomers: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Without token, order API cannot be called.
      if (!token) return;

      try {
        setIsLoading(true);

        const [productRes, categoryRes, orderRes] = await Promise.all([
          axios.get(backendUrl + '/api/product/list'),
          axios.get(backendUrl + '/api/category/list'),
          axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
        ]);

        let productsCount = 0;
        let categoriesCount = 0;
        let ordersCount = 0;
        let totalRevenue = 0;
        let uniqueCustomers = new Set(); // Use Set to filter duplicate customers

        // Products Data Processing
        if (productRes.data.success) {
            productsCount = productRes.data.products.length;
        }

        // Data Processing Categories
        if (categoryRes.data.success) {
            categoriesCount = productRes.data.categories ? productRes.data.categories.length : categoryRes.data.categories.length;
             if(categoryRes.data.categories) categoriesCount = categoryRes.data.categories.length;
        }

        // Processing Orders & Revenue data
        if (orderRes.data.success) {
            const orders = orderRes.data.orders;
            ordersCount = orders.length;

            orders.forEach(order => {
                // Calculate total revenue
                totalRevenue += Number(order.amount);

                // Count customers based on address information (e.g. phone number or name)
                if (order.address && order.address.phone) {
                    uniqueCustomers.add(order.address.phone);
                }
            });
        }

        setStats({
          products: productsCount,
          categories: categoriesCount,
          orders: ordersCount,
          revenue: totalRevenue,
          uniqueCustomers: uniqueCustomers.size
        });

      } catch (error) {
        console.error('❌ Error loading Dashboard data:', error);
        toast.error("Unable to load statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Dashboard Overview</h1>
      
      {isLoading ? (
        <div className="text-center py-10">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue Card */}
          <Card 
            icon="fa-sack-dollar" 
            title="Total Revenue" 
            value={`${currency} ${stats.revenue.toLocaleString()}`} 
            color="bg-green-500" 
          />
          
          {/* Order Card */}
          <Card 
            icon="fa-cart-shopping" 
            title="Total Orders" 
            value={stats.orders} 
            color="bg-blue-500" 
          />

          {/* Product Card */}
            <Card 
            icon="fa-box-open" 
            title="Total Products" 
            value={stats.products} 
            color="bg-orange-500" 
            />

          {/* Customer Card (Order Based) */}
          <Card 
            icon="fa-users" 
            title="Customers" 
            value={stats.uniqueCustomers} 
            color="bg-purple-500" 
          />
        </div>
      )}

      
    </div>
  );
};

// Component Card for better display
const Card = ({ icon, title, value, color }) => (
  <div className={`flex items-center p-6 bg-white rounded-lg shadow-md border-l-4 ${color.replace('bg-', 'border-')}`}>
    <div className={`p-3 mr-4 rounded-full text-white ${color}`}>
        <i className={`fa-solid ${icon} text-xl`}></i>
    </div>
    <div>
      <p className="mb-1 text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Dashboard;