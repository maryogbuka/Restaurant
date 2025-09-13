'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { menuSections } from '../data/menuSections';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

// Admin password (in a real app, this would be secure and not hardcoded)
const ADMIN_PASSWORD = 'admin123';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState({});
  const [ratings, setRatings] = useState({});
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [password, setPassword] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  // Set isClient to true when component mounts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load all data from localStorage on component mount (client-side only)
  useEffect(() => {
    if (!isClient) return;
    
    const storedRatings = localStorage.getItem('menuRatings');
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
    
    const storedFavorites = localStorage.getItem('menuFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [isClient]);

  // Save ratings to localStorage whenever they change (client-side only)
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('menuRatings', JSON.stringify(ratings));
  }, [ratings, isClient]);

  // Save favorites to localStorage whenever they change (client-side only)
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('menuFavorites', JSON.stringify(favorites));
  }, [favorites, isClient]);

  const categories = ['All', ...menuSections.map((s) => s.category)];
  const filtered =
    selectedCategory === 'All'
      ? menuSections
      : menuSections.filter((s) => s.category === selectedCategory);

  // ✅ Add to cart with toast + redirect
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart 🛒`);
    setTimeout(() => {
      router.push('/order');  
    }, 1200);
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const newFavorites = {
        ...prev,
        [itemId]: !prev[itemId],
      };
      return newFavorites;
    });
  };

  // Calculate average rating for an item (client-side only)
  const getAverageRating = (itemId) => {
    if (!isClient) return null;
    
    try {
      const allRatings = JSON.parse(localStorage.getItem('allRatings') || '{}');
      const itemRatings = allRatings[itemId];
      
      if (!itemRatings || itemRatings.length === 0) {
        return null;
      }
      
      const sum = itemRatings.reduce((total, r) => total + r.value, 0);
      return (sum / itemRatings.length).toFixed(1);
    } catch (error) {
      console.error('Error getting average rating:', error);
      return null;
    }
  };

  // Get rating count for an item (client-side only)
  const getRatingCount = (itemId) => {
    if (!isClient) return 0;
    
    try {
      const allRatings = JSON.parse(localStorage.getItem('allRatings') || '{}');
      return allRatings[itemId] ? allRatings[itemId].length : 0;
    } catch (error) {
      console.error('Error getting rating count:', error);
      return 0;
    }
  };

  // Handle rating a menu item
  const handleRateItem = (itemId, ratingValue) => {
    if (!isClient) return;
    
    // Save user's rating
    setRatings((prev) => {
      const newRatings = {
        ...prev,
        [itemId]: {
          value: ratingValue,
          timestamp: new Date().toISOString()
        },
      };
      return newRatings;
    });
    
    // Save to all ratings for admin view
    try {
      const allRatings = JSON.parse(localStorage.getItem('allRatings') || '{}');
      if (!allRatings[itemId]) {
        allRatings[itemId] = [];
      }
      
      // Check if user already rated this item
      const userIdentifier = localStorage.getItem('userIdentifier') || `user_${Date.now()}`;
      localStorage.setItem('userIdentifier', userIdentifier);
      
      const existingRatingIndex = allRatings[itemId].findIndex(r => r.userId === userIdentifier);
      
      if (existingRatingIndex >= 0) {
        // Update existing rating
        allRatings[itemId][existingRatingIndex] = {
          value: ratingValue,
          timestamp: new Date().toISOString(),
          userId: userIdentifier
        };
      } else {
        // Add new rating
        allRatings[itemId].push({
          value: ratingValue,
          timestamp: new Date().toISOString(),
          userId: userIdentifier
        });
      }
      
      localStorage.setItem('allRatings', JSON.stringify(allRatings));
      toast.success('Thanks for your rating!');
    } catch (error) {
      console.error('Error saving rating:', error);
      toast.error('Failed to save rating');
    }
  };

  // Handle admin login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Calculate admin data
      try {
        const allRatings = JSON.parse(localStorage.getItem('allRatings') || '{}');
        const ratingData = {};
        
        // Process all menu items
        menuSections.forEach(section => {
          section.items.forEach(item => {
            const itemRatings = allRatings[item.id] || [];
            ratingData[item.id] = {
              name: item.name,
              ratings: itemRatings,
              average: itemRatings.length > 0 
                ? (itemRatings.reduce((sum, r) => sum + r.value, 0) / itemRatings.length).toFixed(1)
                : 'No ratings',
              count: itemRatings.length
            };
          });
        });
        
        setAdminData(ratingData);
        toast.success('Admin access granted');
      } catch (error) {
        console.error('Error loading admin data:', error);
        toast.error('Failed to load rating data');
      }
    } else {
      toast.error('Incorrect password');
    }
  };

  // Don't render rating-related elements during SSR
  if (!isClient) {
    return (
      <main className="bg-white min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading menu...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Restaurant Admin Dashboard</h2>
              <button 
                onClick={() => {
                  setShowAdminModal(false);
                  setPassword('');
                  setAdminData(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {!adminData ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <p className="text-gray-600">Enter admin password to view ratings data</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  View Ratings
                </button>
              </form>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-4">Ratings Summary</h3>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Overall Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div className="text-center p-3 bg-white rounded shadow">
                      <p className="text-2xl font-bold text-blue-600">
                        {Object.values(adminData).filter(item => item.count > 0).length}
                      </p>
                      <p className="text-sm">Rated Dishes</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded shadow">
                      <p className="text-2xl font-bold text-green-600">
                        {Object.values(adminData).reduce((total, item) => total + item.count, 0)}
                      </p>
                      <p className="text-sm">Total Ratings</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded shadow">
                      <p className="text-2xl font-bold text-amber-600">
                        {(
                          Object.values(adminData)
                            .filter(item => item.count > 0)
                            .reduce((sum, item) => sum + parseFloat(item.average), 0) / 
                          Object.values(adminData).filter(item => item.count > 0).length
                        ).toFixed(1)}
                      </p>
                      <p className="text-sm">Average Rating</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded shadow">
                      <p className="text-2xl font-bold text-purple-600">
                        {Object.values(adminData).filter(item => parseFloat(item.average) >= 4).length}
                      </p>
                      <p className="text-sm">Highly Rated Dishes</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Top Rated Dishes</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(adminData)
                      .filter(([id, data]) => data.count > 0)
                      .sort((a, b) => parseFloat(b[1].average) - parseFloat(a[1].average))
                      .slice(0, 5)
                      .map(([itemId, data]) => (
                        <div key={itemId} className="flex justify-between items-center p-3 bg-white border rounded-lg">
                          <span className="font-medium">{data.name}</span>
                          <div className="flex items-center">
                            <div className="flex text-amber-400 mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 ${star <= data.average ? 'text-amber-500' : 'text-gray-300'}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm font-semibold">{data.average}/5 ({data.count})</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <h4 className="font-semibold mb-3">All Dishes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(adminData).map(([itemId, data]) => (
                    <div key={itemId} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{data.name}</h4>
                      <div className="flex items-center mt-2 mb-1">
                        <div className="flex text-amber-400 mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${star <= data.average ? 'text-amber-500' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-semibold">{data.average}/5</span>
                      </div>
                      <p className="text-sm text-gray-600">Total Ratings: {data.count}</p>
                      
                      {/* Rating distribution */}
                      {data.count > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium mb-1">Rating Distribution:</p>
                          {[5, 4, 3, 2, 1].map((star) => {
                            const starCount = data.ratings.filter(r => r.value === star).length;
                            const percentage = (starCount / data.count) * 100;
                            
                            return (
                              <div key={star} className="flex items-center mb-1">
                                <span className="text-xs w-4">{star}</span>
                                <div className="w-4 mx-1 text-amber-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 ml-1">
                                  <div 
                                    className="bg-amber-400 h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs w-10 text-right">{starCount}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <video
          src="/hot.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFD700] mb-4 animate-fadeIn">
            Explore Our Flavorful Menu
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-200 leading-relaxed mt-2">
            Dive into the rich, authentic taste of Nigerian cuisine, carefully crafted with love and passion. 
            From hearty classics to delightful surprises, every dish is a journey for your taste buds.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="p-6 md:p-12">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FF4500] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Items */}
        {filtered.map((section, idx) => (
          <div key={idx} className="mb-20">
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-center text-gray-900 border-b-4 border-[#163c02] mx-auto pb-2 mb-8">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-[#FF4500]"
                >
                  <div className="relative h-44 z-10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-20"
                      style={{ pointerEvents: "auto" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          favorites[item.id] ? "text-red-500 fill-current" : "text-gray-400"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <span className="font-semibold text-lg rounded-full bg-green-100 text-green-800 px-3 py-1">
                        {item.price}
                      </span>
                    </div>

                    {/* Prep Time */}
                    <p className="text-sm text-gray-500 mb-2">
                      {item.prepTime || '10 - 20 min'}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateItem(item.id, star)}
                            className="focus:outline-none"
                            aria-label={`Rate ${star} stars`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 transition-transform hover:scale-125 ${
                                ratings[item.id]?.value >= star ? 'text-amber-500' : 'text-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">
                        {ratings[item.id] 
                          ? `You rated this ${ratings[item.id]?.value} stars` 
                          : `${getAverageRating(item.id) || '4.7'} (${getRatingCount(item.id) || '1'})`
                        }
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="relative z-30 bg-gray-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center"
                    >
                      <span>Add to Cart</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* View Cart Button */}
      <div className="fixed bottom-6 left-6 z-10">
        <Link
          href="/order"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          View Cart
        </Link>
      </div>
    </main>
  );
}