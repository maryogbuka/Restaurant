

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const menuSections = [
  {
    category: 'Rice Dishes',
    items: [
      {
        id: 1,
        name: 'White Rice & Stew',
        description: 'Steamed white rice served with spicy tomato-based stew, flavored with peppers, onions, and your choice of protein.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 2,
        name: 'Nigerian Fried Rice',
        description: 'Savory fried rice cooked with mixed vegetables, liver, and seasonings—a party classic.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 3,
        name: 'Nigerian Fried Rice & Beef',
        description: 'Flavored fried rice served with tender, well-seasoned beef cuts.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 4,
        name: 'Nigerian Fried Rice & Chicken',
        description: 'A hearty serving of fried rice paired with juicy, grilled or fried chicken.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 5,
        name: 'Nigerian Fried Rice & Turkey',
        description: 'Spiced fried rice served with crispy or sauced-up turkey portions.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 6,
        name: 'Jollof Rice',
        description: 'Nigeria\'s beloved smoky jollof rice cooked in rich tomato sauce and spices.',
        price: '₦3,500',
        image: '/1jollof.jpg',
      },
      {
        id: 7,
        name: 'Jollof Rice & Beef',
        description: 'Classic jollof rice served with delicious, spiced beef cuts.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 8,
        name: 'Jollof Rice & Chicken',
        description: 'Flavor-packed jollof rice served with seasoned fried or grilled chicken.',
        price: '₦3,500',
        image: '/1jollof.jpg',
      },
      {
        id: 9,
        name: 'Jollof Rice & Turkey',
        description: 'Rich jollof rice paired with savory turkey meat, perfect for a filling meal.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 10,
        name: 'Jollof Rice & Fish',
        description: 'Delicious jollof rice complemented by perfectly fried or grilled fish.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 11,
        name: 'Ofada Rice & Stew',
        description: 'Local brown rice (Ofada) served with spicy ayamase (ofada sauce) made with assorted meats and green pepper stew.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 12,
        name: 'Coconut Rice',
        description: 'Aromatic rice cooked in creamy coconut milk with herbs, spices, and vegetables.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 13,
        name: 'Coconut Rice & Beef',
        description: 'Fragrant coconut rice served with tender, flavorful beef.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 14,
        name: 'Coconut Rice & Chicken',
        description: 'Tasty coconut-infused rice served with juicy chicken portions.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 15,
        name: 'Coconut Rice & Turkey',
        description: 'Creamy coconut rice paired with savory turkey meat.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 16,
        name: 'Coconut Rice & Fish',
        description: 'Delicately spiced coconut rice served with well-fried or grilled fish.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
    ],
  },
  {
    category: 'Soup & Swallow Dishes',
    items: [
      {
        id: 17,
        name: 'Eba & Stew',
        description: 'Golden garri eba served with rich tomato stew and assorted meats.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 18,
        name: 'Special Efo Riro served with Semo',
        description: 'Flavorful Yoruba-style spinach stew loaded with assorted meats, served with smooth semovita.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 19,
        name: 'Special Efo Riro served with Eba',
        description: 'Spicy and hearty vegetable soup paired with eba for a classic combo.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 20,
        name: 'Special Efo Riro served with Fufu',
        description: 'Thick cassava fufu paired with richly seasoned spinach stew and assorted meats.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 21,
        name: 'Special Efo Riro served with Amala',
        description: 'Delicious efo riro served with soft amala—Yoruba delicacy at its best.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 22,
        name: 'Special Efo Riro served with Pounded Yam',
        description: 'Pounded yam served with thick, spicy spinach soup and meat variety.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 23,
        name: 'Special Ewedu and Amala',
        description: 'Slippery jute leaf soup (ewedu) and gbegiri combo served with amala and assorted meats.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 24,
        name: 'Special Egusi served with Fufu',
        description: 'Ground melon seed soup richly cooked with meats and vegetables, served with fufu.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 25,
        name: 'Special Egusi served with Eba',
        description: 'Thick, nutty egusi soup served with garri eba and assorted meat toppings.',
        price: '₦4,000',
        image: '/ebaEgusi.jpg',
      },
      {
        id: 26,
        name: 'Special Egusi served with Semo',
        description: 'Fluffy semo paired with rich egusi soup and plenty meats.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 27,
        name: 'Special Seafood Okro served with Fufu',
        description: 'Draw soup filled with fresh seafood (crabs, prawns, fish), served with cassava fufu.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 28,
        name: 'Special Seafood Okro served with Eba',
        description: 'Okro soup loaded with seafood goodness, served with eba.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 29,
        name: 'Special Seafood Okro served with Pounded Yam',
        description: 'Flavorful seafood okro soup matched with pounded yam.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 30,
        name: 'Special Afang served with Fufu',
        description: 'Traditional Efik-style vegetable soup with meat and fish, served with soft fufu.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 31,
        name: 'Special Afang served with Eba',
        description: 'Afang soup made from waterleaf and okazi leaves, paired with garri eba.',
        price: '₦4,000',
        image: '/garriAfang.jpg',
      },
      {
        id: 32,
        name: 'Special Afang served with Pounded Yam',
        description: 'Delicious afang soup served with pounded yam.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 33,
        name: 'Special Afang served with Semo',
        description: 'Semo and afang soup—a nutritious combo rich in flavor and culture.',
        price: '₦4,000',
        image: '/afang.jpg',
      },
      {
        id: 34,
        name: 'Special Vegetable Soup served with Fufu',
        description: 'Hearty mixed vegetable soup served with soft, stretchy fufu.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 35,
        name: 'Special Vegetable Soup served with Pounded Yam',
        description: 'Rich vegetable soup with assorted meat served with pounded yam.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 36,
        name: 'Special Vegetable Soup served with Semo',
        description: 'A rich, green soup made from fresh vegetables and meats served with semo.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 37,
        name: 'Special Vegetable Soup served with Eba',
        description: 'Flavorful vegetable soup paired with traditional eba for a wholesome meal.',
        price: '₦4,000',
        image: '/vegie.jpg',
      },
      {
        id: 38,
        name: 'Special Oha Soup served with Fufu',
        description: 'Traditional Eastern Nigerian oha soup served with cassava fufu and assorted meats.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 39,
        name: 'Special Oha Soup served with Semo',
        description: 'Semo and native oha soup cooked with thick broth and meats.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 40,
        name: 'Special Oha Soup served with Eba',
        description: 'Savory oha soup with eba—a perfect pairing of leaf and starch.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 41,
        name: 'Special Oha Soup served with Pounded Yam',
        description: 'Delicious oha soup served with soft pounded yam.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
    ],
  },
  {
    category: 'Grilled & Fried Dishes',
    items: [
      {
        id: 42,
        name: 'Grilled Chicken',
        description: 'Juicy grilled chicken marinated in spices, served with a side of vegetables.',
        price: '₦3,500',
        image: '/images/grilled-chicken.jpg',
      },
      {
        id: 43,
        name: 'Fried Plantain',
        description: 'Sweet ripe plantains fried to perfection, a perfect side dish.',
        price: '₦1,500',
        image: '/images/fried-plantain.jpg',
      },
      {
        id: 44,
        name: 'Peppered Fish',
        description: 'Grilled fish coated in spicy pepper sauce, served with a side of rice.',
        price: '₦4,000',
        image: '/images/peppered-fish.jpg',
      },
    ],
  },
  {
    category: 'Others',
    items: [
      {
        id: 45,
        name: 'Grilled Chicken',
        description: 'Juicy grilled chicken marinated in spices, served with a side of vegetables.',
        price: '₦3,500',
        image: '/images/grilled-chicken.jpg',
      },
      {
        id: 46,
        name: 'Fried Plantain',
        description: 'Sweet ripe plantains fried to perfection, a perfect side dish.',
        price: '₦1,500',
        image: '/images/fried-plantain.jpg',
      },
      {
        id: 47,
        name: 'Peppered Fish',
        description: 'Grilled fish coated in spicy pepper sauce, served with a side of rice.',
        price: '₦4,000',
        image: '/images/peppered-fish.jpg',
      },
    ],
  },
];

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(auth);
    
    if (!auth) {
      toast.error('Please login first');
      router.push('/admin');
      return;
    }
    
    loadAdminData();
  }, [router]);

  const loadAdminData = () => {
    try {
      const allRatings = JSON.parse(localStorage.getItem('allRatings') || '{}');
      const ratingData = {};
      
      // Process all menu items
      menuSections.forEach(section => {
        section.items.forEach(item => {
          const itemRatings = allRatings[item.id] || [];
          ratingData[item.id] = {
            name: item.name,
            category: section.category,
            ratings: itemRatings,
            average: itemRatings.length > 0 
              ? (itemRatings.reduce((sum, r) => sum + r.value, 0) / itemRatings.length).toFixed(1)
              : 'No ratings',
            count: itemRatings.length
          };
        });
      });
      
      setAdminData(ratingData);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load rating data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    toast.success('Logged out successfully');
    router.push('/admin');
  };

  const refreshData = () => {
    setIsLoading(true);
    loadAdminData();
    toast.success('Data refreshed');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Not authenticated. Redirecting...</div>
      </div>
    );
  }

  // Calculate overall statistics
  const ratedDishesCount = adminData ? Object.values(adminData).filter(item => item.count > 0).length : 0;
  const totalRatingsCount = adminData ? Object.values(adminData).reduce((total, item) => total + item.count, 0) : 0;
  const ratedItems = adminData ? Object.values(adminData).filter(item => item.count > 0) : [];
  const averageRating = ratedItems.length > 0 
    ? (ratedItems.reduce((sum, item) => sum + parseFloat(item.average), 0) / ratedItems.length).toFixed(1)
    : 0;
  const highlyRatedDishes = adminData ? Object.values(adminData).filter(item => parseFloat(item.average) >= 4).length : 0;

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Toaster position="top-right" />

      <header className="bg-white mt-10 h-24 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl mt-9 font-bold text-gray-800">Restaurant Admin Dashboard</h1>
          <div className="flex gap-2 mt-9">
            <button
              onClick={refreshData}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Refresh Data
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

        <div className="mb-8">
          <h2 className="text-xl font-semibold ml-6 text-gray-800 mt-4 mb-4">Rating Analytics</h2>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Rated Dishes</h3>
              <p className="text-3xl font-bold text-blue-600">{ratedDishesCount}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Ratings</h3>
              <p className="text-3xl font-bold text-green-600">{totalRatingsCount}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Average Rating</h3>
              <p className="text-3xl font-bold text-amber-600">{averageRating}/5</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Highly Rated Dishes</h3>
              <p className="text-3xl font-bold text-purple-600">{highlyRatedDishes}</p>
            </div>
          </div>
          
          {/* Top Rated Dishes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Rated Dishes</h3>
            
            {ratedItems.length > 0 ? (
              <div className="space-y-4">
                {ratedItems
                  .sort((a, b) => parseFloat(b.average) - parseFloat(a.average))
                  .slice(0, 5)
                  .map((data, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-800">{data.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({data.category})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex text-amber-400 mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${star <= data.average ? 'text-amber-500' : 'text-gray-300'}`}
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
            ) : (
              <p className="text-gray-500">No rating data available yet</p>
            )}
          </div>
          
          {/* All Dishes Rating */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">All Dishes Ratings</h3>
              <span className="text-sm text-gray-500">{ratedItems.length} dishes with ratings</span>
            </div>
            
            {ratedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ratedItems
                  .sort((a, b) => parseFloat(b.average) - parseFloat(a.average))
                  .map((data, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">{data.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{data.category}</p>
                      
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
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">⭐</div>
                <p className="text-gray-500">No dishes have been rated yet</p>
                <p className="text-sm text-gray-400 mt-1">Ratings will appear here when customers rate your dishes</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}