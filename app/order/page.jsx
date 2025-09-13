'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, parsePrice } = useCart();
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    location: '',
  });

  const [paystackReady, setPaystackReady] = useState(false);
  const whatsappNumber = '2347026743308';

  // Load Paystack
  useEffect(() => {
    if (!document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => setPaystackReady(true);
      document.body.appendChild(script);
    } else {
      setPaystackReady(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Subtotal
  const subtotal = cart.reduce((sum, item) => {
    const cleanPrice = parsePrice(item.price);
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    return sum + cleanPrice * qty;
  }, 0);

  // Delivery fee
  const deliveryFee =
    customer.location === 'mainland'
      ? 1500
      : customer.location === 'island'
      ? 2000
      : 0;

  // Total
  const totalAmount = subtotal + deliveryFee;

  // Handle Paystack + WhatsApp
  const handlePaystackPayment = () => {
  if (cart.length === 0) {
    alert('🛒 Your cart is empty.');
    return;
  }

  if (!customer.name || !customer.phone || !customer.address || !customer.location) {
    alert('⚠️ Please fill in all your details before proceeding.');
    return;
  }

  if (typeof window === 'undefined' || !window.PaystackPop) {
    alert('⚠️ Paystack is not loaded yet. Please wait a moment and try again.');
    return;
  }

  const orderDetails = cart
    .map((item) => {
      const cleanPrice = parsePrice(item.price);
      const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
      return `🍲 ${item.name} — ₦${cleanPrice.toLocaleString()} x ${qty}`;
    })
    .join('\n');

  console.log("Paystack key from env:", process.env.NEXT_PUBLIC_PAYSTACK_KEY);

  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
    email: `${customer.phone}@restaurant.com`,
    amount: totalAmount * 100,
    currency: 'NGN',
    ref: `order_${Date.now()}`,
    callback: function (response) {
      alert('✅ Payment successful! Ref: ' + response.reference);

      const message = `🍴 *New Paid Order* 🍴

👤 *Customer Details*
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
Location: ${customer.location.toUpperCase()}

🛒 *Items Ordered*
${orderDetails}

🚚 *Delivery Fee:* ₦${deliveryFee.toLocaleString()}
💰 *Total:* ₦${totalAmount.toLocaleString()}
🧾 *Payment Ref:* ${response.reference}`;

      // ✅ WhatsApp redirect
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;

      // ✅ Clear cart + reset form
      clearCart();
      setCustomer({ name: '', phone: '', address: '', location: '' });
      router.push('/order');
    },
    onClose: function () {
      alert('❌ Payment window closed.');
    },
  });

  handler.openIframe();
};


  return (
    <main>
      {/* Hero */}
      <section className="text-center h-[56vh] py-24 lg:py-32 px-6 bg-[url('/order.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="bg-black/60 absolute inset-0"></div>
        <div className="relative z-10 mt-28 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFD700] mb-4">
            Your Delicious Order, <span className="text-white/80">Just a Click Away!</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl leading-relaxed mt-2">
            Experience lightning-fast, secure, and hassle-free food delivery with <span className="font-semibold text-[#FF4500]">Tee Foods</span>. 
            Your favorite meals are now closer than ever – fresh, hot, and delivered straight to your door.
          </p>
        </div>
      </section>

      {/* Cart + Checkout */}
      <div className="bg-white py-12 min-h-[60vh]">
        <div className="max-w-3xl bg-white mx-auto p-6">
          <h1 className="text-4xl text-center text-gray-900 font-bold mb-2">Review your cart.</h1>
          <p className="text-gray-500 mb-6">{cart.length} item(s)</p>

          {cart.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-900 mb-4">Your cart is currently empty.</p>
              <Link
                href="/menu"
                className="bg-[#FF4500] text-white px-6 py-3 rounded-lg hover:bg-[#FF4500]/80"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6 text-gray-900">
                {cart.map((item, i) => {
                  const cleanPrice = parsePrice(item.price);
                  const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;

                  return (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      {/* Image + Info */}
                      <div className="flex items-center space-x-4">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={70}
                            height={70}
                            className="rounded-lg"
                          />
                        )}
                        <div>
                          <h2 className="font-semibold">{item.name}</h2>
                          <p className="text-sm text-gray-500">
                            ₦{cleanPrice.toLocaleString()} x {qty}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price & Quantity */}
                      <div className="text-right">
                        <p className="font-semibold">
                          ₦{(cleanPrice * qty).toLocaleString()}
                        </p>
                        <div className="flex items-center justify-end space-x-2 mt-1">
                          <div className="flex items-center border rounded-full px-2">
                            <button
                              onClick={() => decreaseQuantity(item.name)}
                              className="px-2 py-1 text-lg"
                            >
                              −
                            </button>
                            <span className="px-2">{qty}</span>
                            <button
                              onClick={() => increaseQuantity(item.name)}
                              className="px-2 py-1 text-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer Details */}
              <div className="mt-8 space-y-4 text-gray-900">
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full border p-3 rounded-full"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded-full"
                  required
                />
                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  placeholder="Delivery Address"
                  className="w-full border p-3 rounded-lg"
                  required
                ></textarea>
                <select
                  name="location"
                  value={customer.location}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-full"
                  required
                >
                  <option value="">Select Location</option>
                  <option value="mainland">Mainland (₦1,500)</option>
                  <option value="island">Island (₦2,000)</option>
                </select>
              </div>

              {/* Totals */}
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-gray-900">
                  <p>Subtotal</p>
                  <p>₦{subtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-gray-900">
                  <p>Delivery Fee</p>
                  <p>{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : '—'}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-gray-700 font-bold text-lg">
                  <p>Total</p>
                  <p>₦{totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Checkout */}
              <button
                onClick={handlePaystackPayment}
                disabled={!paystackReady}
                className={`w-full mt-6 py-3 rounded-full text-white font-semibold ${
                  paystackReady
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {paystackReady ? 'Proceed to Checkout' : 'Loading Paystack...'}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}