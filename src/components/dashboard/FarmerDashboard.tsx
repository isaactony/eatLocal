import React, { useState } from 'react';
import { BarChart3, Package, MessageCircle, Bell, Settings, Users, TrendingUp, Calendar, Store, Tractor, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import InventoryManagement from './InventoryManagement';
import SalesInsights from './SalesInsights';
import CustomerMessages from './CustomerMessages';
import OrderManagement from './OrderManagement';
import SettingsPanel from './Settings';

type TabType = 'overview' | 'inventory' | 'orders' | 'messages' | 'insights' | 'settings';

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'inventory', label: 'Inventory', icon: Store },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'messages', label: 'Messages', icon: MessageCircle },
    { key: 'insights', label: 'Insights', icon: TrendingUp },
    { key: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManagement />;
      case 'insights':
        return <SalesInsights />;
      case 'messages':
        return <CustomerMessages />;
      case 'orders':
        return <OrderManagement />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Today's Sales</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold">$1,234</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500">+15%</span>
                  <span className="text-gray-500 ml-1">vs yesterday</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">New Orders</h3>
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold">12</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500">+5</span>
                  <span className="text-gray-500 ml-1">since last hour</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Customers</h3>
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold">48</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500">+12%</span>
                  <span className="text-gray-500 ml-1">this week</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Messages</h3>
                  <MessageCircle className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold">5</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-yellow-500">3 unread</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    type: 'order',
                    message: 'New order #1234 received',
                    time: '5 minutes ago',
                    icon: <Package className="w-5 h-5 text-blue-500" />
                  },
                  {
                    type: 'message',
                    message: 'Customer inquiry about organic tomatoes',
                    time: '15 minutes ago',
                    icon: <MessageCircle className="w-5 h-5 text-green-500" />
                  },
                  {
                    type: 'inventory',
                    message: 'Low stock alert: Fresh Eggs',
                    time: '1 hour ago',
                    icon: <Bell className="w-5 h-5 text-red-500" />
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => handleTabChange('inventory')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Store className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Manage Inventory</h3>
                <p className="text-sm text-gray-600">Update products and stock levels</p>
              </button>

              <button
                onClick={() => handleTabChange('orders')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Package className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Process Orders</h3>
                <p className="text-sm text-gray-600">View and manage customer orders</p>
              </button>

              <button
                onClick={() => handleTabChange('messages')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <MessageCircle className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Customer Messages</h3>
                <p className="text-sm text-gray-600">Respond to customer inquiries</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-lg font-semibold">Farmer Dashboard</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-10 bg-gray-900/50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleTabChange(item.key as TabType)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeTab === item.key
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-white lg:border-r lg:pb-4">
        <div className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleTabChange(item.key as TabType)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === item.key
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {menuItems.find(item => item.key === activeTab)?.label}
            </h1>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}