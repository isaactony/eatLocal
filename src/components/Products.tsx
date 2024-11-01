import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Filter, Search, Leaf } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useProducts } from '../store/ProductsContext';
import { useSearchParams } from 'react-router-dom';

export default function Products({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch } = useCart();
  const { products, getProductsByFarm } = useProducts();
  const [searchParams] = useSearchParams();
  const farmId = searchParams.get('farm');

  const categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Herbs',
    'Dairy & Eggs',
    'Honey & Preserves'
  ];

  const farmProducts = farmId ? getProductsByFarm(Number(farmId)) : products;

  const filteredProducts = farmProducts.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    (searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farm.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-bold">
              {farmId 
                ? `Products from ${farmProducts[0]?.farm.name}`
                : 'Fresh Local Products'
              }
            </h1>
          </div>
          <p className="text-green-50 text-lg max-w-2xl">
            Discover fresh, organic produce and artisanal products from our local farmers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2 text-green-600" />
                <h2 className="font-semibold">Categories</h2>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-50 text-green-600 font-medium'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-600">Organic Only</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-600">In Stock</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-600">Local Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products or farms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id })}
                      className={`absolute top-2 right-2 p-2 rounded-full shadow hover:bg-gray-100 ${
                        state.wishlist.includes(product.id) 
                          ? 'bg-red-50' 
                          : 'bg-white'
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          state.wishlist.includes(product.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                    {product.organic && (
                      <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.farm.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">4.8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">${product.price}</span>
                      <button 
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                        className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-green-600">Our Story</button></li>
                <li><button className="hover:text-green-600">Blog</button></li>
                <li><button className="hover:text-green-600">Careers</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-green-600">FAQ</button></li>
                <li><button className="hover:text-green-600">Contact Us</button></li>
                <li><button className="hover:text-green-600">Shipping Info</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-green-600">Privacy Policy</button></li>
                <li><button className="hover:text-green-600">Terms of Service</button></li>
                <li><button className="hover:text-green-600">Returns Policy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-green-600">Instagram</button></li>
                <li><button className="hover:text-green-600">Facebook</button></li>
                <li><button className="hover:text-green-600">Twitter</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 FreshLocal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}