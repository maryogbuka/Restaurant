'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, clearCart, parsePrice } = useCart();
  const router = useRouter();
  const [paystackReady, setPaystackReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Paystack key from environment variables
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    location: '',
  });

  // WhatsApp number for restaurant notifications
  const whatsappNumber = '2347026743308';

  // Load Paystack script
  useEffect(() => {
    // Check if key is available
    if (!paystackPublicKey) {
      console.error('Paystack public key is missing');
      alert('Payment system is not configured properly. Please contact support.');
      return;
    }

    if (!document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => setPaystackReady(true);
      script.onerror = () => {
        console.error('Failed to load Paystack script');
        alert('Failed to load payment system. Please check your connection.');
      };
      document.body.appendChild(script);
    } else {
      setPaystackReady(true);
    }
  }, [paystackPublicKey]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const cleanPrice = parsePrice(item.price);
    const qty = item.quantity || 1;
    return sum + cleanPrice * qty;
  }, 0);

  const deliveryFee = customer.location === 'mainland' ? 1500 : 
                     customer.location === 'island' ? 2000 : 0;
  const totalAmount = subtotal + deliveryFee;

  // Process payment with Paystack
  const processPayment = () => {
    if (cart.length === 0) {
      alert('🛒 Your cart is empty.');
      return;
    }

    if (!customer.name || !customer.phone || !customer.address || !customer.location) {
      alert('⚠️ Please fill in all your details before proceeding.');
      return;
    }

    if (!paystackPublicKey) {
      alert('⚠️ Payment system is not configured. Please contact support.');
      return;
    }

    if (typeof window === 'undefined' || !window.PaystackPop) {
      alert('⚠️ Please wait a moment and try again.');
      return;
    }

    setIsProcessing(true);

    const orderDetails = cart
      .map((item) => {
        const cleanPrice = parsePrice(item.price);
        const qty = item.quantity || 1;
        return `🍲 ${item.name} — ₦${cleanPrice.toLocaleString()} x ${qty}`;
      })
      .join('\n');

    try {

      console.log("Paystack key from env:", process.env.NEXT_PUBLIC_PAYSTACK_KEY);
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
        email: customer.email || `${customer.phone}@restaurant.com`,
        amount: totalAmount * 100,
        currency: 'NGN',
        ref: `TEE_${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: customer.name
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: customer.phone
            },
            {
              display_name: "Delivery Address",
              variable_name: "delivery_address",
              value: customer.address
            }
          ]
        },
        callback: function(response) {
          setIsProcessing(false);
          alert('✅ Payment successful! Ref: ' + response.reference);

          const message = `🍴 *New Paid Order* 🍴

👤 *Customer Details*
Name: ${customer.name}
Phone: ${customer.phone}
Email: ${customer.email || 'Not provided'}
Address: ${customer.address}
Location: ${customer.location.toUpperCase()}

🛒 *Items Ordered*
${orderDetails}

🚚 *Delivery Fee:* ₦${deliveryFee.toLocaleString()}
💰 *Total:* ₦${totalAmount.toLocaleString()}
🧾 *Payment Ref:* ${response.reference}`;

          window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
            '_blank'
          );

          clearCart();
          setCustomer({ name: '', phone: '', email: '', address: '', location: '' });
          router.push('/order');
        },
        onClose: function() {
          setIsProcessing(false);
          alert('❌ Payment window closed.');
        }
      });

      handler.openIframe();
    } catch (error) {
      setIsProcessing(false);
      console.error('Paystack error:', error);
      alert('❌ Error processing payment. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <button 
            onClick={() => router.push('/menu')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Checkout</h1>
        
        {!paystackPublicKey && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Payment Configuration Error</p>
            <p>Paystack is not properly configured. Please check your environment variables.</p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => {
                const price = parsePrice(item.price);
                const qty = item.quantity || 1;
                return (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md mr-3"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {qty}</p>
                      </div>
                    </div>
                    <p className="font-semibold">₦{(price * qty).toLocaleString()}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Location *</label>
                <select
                  name="location"
                  value={customer.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Location</option>
                  <option value="mainland">Mainland (₦1,500)</option>
                  <option value="island">Island (₦2,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <button
                onClick={processPayment}
                disabled={!paystackReady || isProcessing || !paystackPublicKey}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 
                 paystackReady ? `Pay ₦${totalAmount.toLocaleString()}` : 
                 'Loading payment...'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}