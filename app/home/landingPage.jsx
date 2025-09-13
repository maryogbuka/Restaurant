'use client';

import { on } from 'events';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 


export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { push } = useRouter();
  const menuCategories = [
    {
      category: 'Rice Dishes',
      items: [
        {
          id: 1,
        name: 'White Rice & Stew',
        description:
          'Steamed white rice served with spicy tomato-based stew, flavored with peppers, onions, and your choice of protein.',
        price: '₦3,500',
        image: '/images/white-rice-stew.jpg',
      },
      {
        id: 2,
        name: 'Nigerian Fried Rice',
        description:
          'Savory fried rice cooked with mixed vegetables, liver, and seasonings—a party classic.',
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
        description: "Nigeria's beloved smoky jollof rice cooked in rich tomato sauce and spices.",
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
        description:
          'Local brown rice (Ofada) served with spicy ayamase (ofada sauce) made with assorted meats and green pepper stew.',
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
        description:
          'Flavorful Yoruba-style spinach stew loaded with assorted meats, served with smooth semovita.',
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
        description:
          'Thick cassava fufu paired with richly seasoned spinach stew and assorted meats.',
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
        description:
          'Slippery jute leaf soup (ewedu) and gbegiri combo served with amala and assorted meats.',
        price: '₦4,000',
        image: '/images/special-asun-rice.jpg',
      },
      {
        id: 24,
        name: 'Special Egusi served with Fufu',
        description:
          'Ground melon seed soup richly cooked with meats and vegetables, served with fufu.',
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
        description:
          'Draw soup filled with fresh seafood (crabs, prawns, fish), served with cassava fufu.',
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
        description:
          'Traditional Efik-style vegetable soup with meat and fish, served with soft fufu.',
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
        description:
          'A rich, green soup made from fresh vegetables and meats served with semo.',
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
        description:
          'Traditional Eastern Nigerian oha soup served with cassava fufu and assorted meats.',
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
      // Empty for now — we can add snacks, drinks, or desserts here later
    ],
  },
];

  const menuItems = menuCategories.flatMap((category) => category.items || []);
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Kindly enter a food item to search for, Ozy.');
    } else {
      setShowResults(true);
    }
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] flex items-center justify-center text-center">
        {/* Background Video */}
        <video
          src="/service.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Content (always on top) */}
        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFD700] mb-4">
              YOUR HOME OF CLASSIC MEALS
          </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
                  Experience the rich flavors of Nigerian cuisine, carefully crafted with love to delight every bite.
              </p>


          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col text-black sm:flex-row items-center gap-3"
          >
            <input
              type="text"
              className="h-12 w-64 sm:w-72 px-4 rounded-md border-2 border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#FF4500] text-white h-12 px-6 rounded-md 
              hover:bg-[#e03e00] focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            >
              Enter
            </button>
          </form>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {showResults && (
        <section className="cover pt-14 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div key={index} className="text-gray-900 shadow-md rounded-lg p-6"
                onClick={() => push(`/menu`)}>
                  
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="text-green-700 font-bold">{item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black">No items match your input.</p>
          )}
      
        </section>
      )}
    </main>
  );
}
