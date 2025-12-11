import { createSignal, Show, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { cartItems, getCartTotal, clearCart } from '../lib/cart';
import { getImageUrl } from '../lib/products';

const Checkout = () => {
    const navigate = useNavigate();
    
    // Form fields
    const [name, setName] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [phone, setPhone] = createSignal('');
    const [address, setAddress] = createSignal('');
    const [zipCode, setZipCode] = createSignal('');
    const [city, setCity] = createSignal('');
    const [country, setCountry] = createSignal('');
    const [paymentMethod, setPaymentMethod] = createSignal('e-money');
    const [eMoneyNumber, setEMoneyNumber] = createSignal('');
    const [eMoneyPin, setEMoneyPin] = createSignal('');
    
    const [showConfirmation, setShowConfirmation] = createSignal(false);
    const [error, setError] = createSignal('');

    const shippingCost = 50;
    const vatRate = 0.20; // 20% VAT
    
    const getSubtotal = () => getCartTotal();
    const getVAT = () => getSubtotal() * vatRate;
    const getGrandTotal = () => getSubtotal() + shippingCost + getVAT();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validate cart is not empty
        if (cartItems().length === 0) {
            setError('Your cart is empty');
            return;
        }

        // Validate payment method fields
        if (paymentMethod() === 'e-money' && (!eMoneyNumber() || !eMoneyPin())) {
            setError('Please fill in all e-Money details');
            return;
        }

        // Show confirmation modal
        setShowConfirmation(true);
    };

    const handleConfirmOrder = () => {
        // Clear the cart
        clearCart();
        
        // Close confirmation modal
        setShowConfirmation(false);
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    // Redirect if cart is empty
    if (cartItems().length === 0 && !showConfirmation()) {
        return (
            <div class="min-h-screen bg-theme-light-gray py-12 px-4 sm:px-6 lg:px-8">
                <div class="container mx-auto">
                    <div class="max-w-2xl mx-auto text-center py-24">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                        <p class="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
                        <button
                            onClick={() => navigate('/')}
                            class="bg-theme-orange text-white px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div class="min-h-screen bg-theme-light-gray py-12 px-4 sm:px-6 lg:px-8">
                <div class="container mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        class="text-gray-600 hover:text-theme-orange transition mb-8"
                    >
                        Go Back
                    </button>

                    <div class="grid lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div class="lg:col-span-2">
                            <form onSubmit={handleSubmit} class="bg-white rounded-lg p-8 lg:p-12">
                                <h1 class="text-3xl font-bold mb-8">Checkout</h1>

                                {/* Error Message */}
                                <Show when={error()}>
                                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                                        {error()}
                                    </div>
                                </Show>

                                {/* Billing Details */}
                                <div class="mb-8">
                                    <h2 class="text-theme-orange text-sm font-bold uppercase tracking-widest mb-4">
                                        Billing Details
                                    </h2>
                                    <div class="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label class="block text-sm font-bold mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={name()}
                                                onInput={(e) => setName(e.target.value)}
                                                placeholder="Alexei Ward"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={email()}
                                                onInput={(e) => setEmail(e.target.value)}
                                                placeholder="alexei@mail.com"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={phone()}
                                                onInput={(e) => setPhone(e.target.value)}
                                                placeholder="+1 202-555-0136"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div class="mb-8">
                                    <h2 class="text-theme-orange text-sm font-bold uppercase tracking-widest mb-4">
                                        Shipping Info
                                    </h2>
                                    <div class="space-y-6">
                                        <div>
                                            <label class="block text-sm font-bold mb-2">Address</label>
                                            <input
                                                type="text"
                                                value={address()}
                                                onInput={(e) => setAddress(e.target.value)}
                                                placeholder="1137 Williams Avenue"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                            />
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label class="block text-sm font-bold mb-2">ZIP Code</label>
                                                <input
                                                    type="text"
                                                    value={zipCode()}
                                                    onInput={(e) => setZipCode(e.target.value)}
                                                    placeholder="10001"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-bold mb-2">City</label>
                                                <input
                                                    type="text"
                                                    value={city()}
                                                    onInput={(e) => setCity(e.target.value)}
                                                    placeholder="New York"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-bold mb-2">Country</label>
                                                <input
                                                    type="text"
                                                    value={country()}
                                                    onInput={(e) => setCountry(e.target.value)}
                                                    placeholder="United States"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div>
                                    <h2 class="text-theme-orange text-sm font-bold uppercase tracking-widest mb-4">
                                        Payment Details
                                    </h2>
                                    <div class="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label class="block text-sm font-bold mb-4">Payment Method</label>
                                        </div>
                                        <div class="space-y-4">
                                            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-theme-orange">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="e-money"
                                                    checked={paymentMethod() === 'e-money'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    class="w-5 h-5 text-theme-orange"
                                                />
                                                <span class="ml-3 font-bold">e-Money</span>
                                            </label>
                                            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-theme-orange">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="cash"
                                                    checked={paymentMethod() === 'cash'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    class="w-5 h-5 text-theme-orange"
                                                />
                                                <span class="ml-3 font-bold">Cash on Delivery</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* e-Money Details */}
                                    <Show when={paymentMethod() === 'e-money'}>
                                        <div class="grid md:grid-cols-2 gap-6 mt-6">
                                            <div>
                                                <label class="block text-sm font-bold mb-2">e-Money Number</label>
                                                <input
                                                    type="text"
                                                    value={eMoneyNumber()}
                                                    onInput={(e) => setEMoneyNumber(e.target.value)}
                                                    placeholder="238521993"
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-bold mb-2">e-Money PIN</label>
                                                <input
                                                    type="text"
                                                    value={eMoneyPin()}
                                                    onInput={(e) => setEMoneyPin(e.target.value)}
                                                    placeholder="6891"
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </Show>

                                    {/* Cash on Delivery Note */}
                                    <Show when={paymentMethod() === 'cash'}>
                                        <div class="mt-6 flex items-start gap-4 text-sm text-gray-600">
                                            <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.857-1.36l2.694-3.674a3.451 3.451 0 0 1 2.79-1.414h4.316a3.451 3.451 0 0 1 2.79 1.414l2.694 3.674a1.15 1.15 0 1 1-1.857 1.36l-2.694-3.674a1.15 1.15 0 0 0-1.134-.574zM39.28 25.438h-4.316a3.451 3.451 0 0 1-2.79-1.414l-2.694-3.674a1.15 1.15 0 1 1 1.857-1.36l2.694 3.674c.265.361.686.574 1.134.574h4.316c.448 0 .869-.213 1.134-.574l2.694-3.674a1.15 1.15 0 1 1 1.857 1.36l-2.694 3.674a3.451 3.451 0 0 1-2.79 1.414zM24 31.438a1.15 1.15 0 0 1-1.15-1.15v-24a1.15 1.15 0 1 1 2.3 0v24c0 .635-.515 1.15-1.15 1.15z" fill="#D87D4A" fill-rule="nonzero"/>
                                            </svg>
                                            <p>
                                                The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                                            </p>
                                        </div>
                                    </Show>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div class="lg:col-span-1">
                            <div class="bg-white rounded-lg p-8 sticky top-8">
                                <h2 class="text-lg font-bold uppercase tracking-wider mb-6">Summary</h2>
                                
                                {/* Cart Items */}
                                <div class="space-y-6 mb-6">
                                    <For each={cartItems()}>
                                        {(item) => (
                                            <div class="flex gap-4 items-center">
                                                <Show when={item.featuredImage}>
                                                    <img 
                                                        src={getImageUrl(item.featuredImage)} 
                                                        alt={item.productName}
                                                        class="w-16 h-16 bg-theme-light-gray rounded-lg object-cover"
                                                    />
                                                </Show>
                                                <div class="flex-1">
                                                    <h3 class="font-bold text-sm">{item.productName}</h3>
                                                    <p class="text-gray-500 text-sm">$ {item.price.toLocaleString()}</p>
                                                </div>
                                                <span class="text-gray-500 font-bold">x{item.quantity}</span>
                                            </div>
                                        )}
                                    </For>
                                </div>

                                {/* Price Breakdown */}
                                <div class="space-y-2 mb-6">
                                    <div class="flex justify-between">
                                        <span class="text-gray-500 uppercase text-sm">Total</span>
                                        <span class="font-bold">$ {getSubtotal().toLocaleString()}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-500 uppercase text-sm">Shipping</span>
                                        <span class="font-bold">$ {shippingCost}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-500 uppercase text-sm">VAT (Included)</span>
                                        <span class="font-bold">$ {getVAT().toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Grand Total */}
                                <div class="flex justify-between items-center mb-8">
                                    <span class="text-gray-500 uppercase text-sm">Grand Total</span>
                                    <span class="text-theme-orange text-lg font-bold">$ {getGrandTotal().toLocaleString()}</span>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    class="w-full bg-theme-orange text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition"
                                >
                                    Continue & Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Confirmation Modal */}
                <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div class="bg-white rounded-lg p-8 lg:p-12 max-w-lg w-full">
                        {/* Success Icon */}
                        <div class="w-16 h-16 bg-theme-orange rounded-full flex items-center justify-center mb-6">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
                            </svg>
                        </div>

                        <h2 class="text-2xl font-bold mb-4">
                            Thank you<br/>for your order
                        </h2>
                        <p class="text-gray-600 mb-6">
                            You will receive an email confirmation shortly.
                        </p>

                        {/* Order Summary */}
                        <div class="flex justify-between bg-theme-light-gray rounded-lg overflow-hidden mb-6">
                            <div class="p-6">
                                <Show when={cartItems()[0]}>
                                    <div class="flex gap-4 items-start mb-4">
                                        <Show when={cartItems()[0].featuredImage}>
                                            <img 
                                                src={getImageUrl(cartItems()[0].featuredImage)} 
                                                alt={cartItems()[0].productName}
                                                class="w-12 h-12 bg-white rounded-lg object-cover"
                                            />
                                        </Show>
                                        <div class="flex-1">
                                            <span class="font-bold text-sm">{cartItems()[0].productName}</span>
                                            <p class="text-gray-500 text-sm">$ {cartItems()[0].price.toLocaleString()}</p>
                                        </div>
                                        <span class="text-gray-500 font-bold">x{cartItems()[0].quantity}</span>
                                    </div>
                                </Show>
                                <Show when={cartItems().length > 1}>
                                    <hr class="my-3"/>
                                    <p class="text-gray-500 text-sm text-center">
                                        and {cartItems().length - 1} other item(s)
                                    </p>
                                </Show>
                            </div>
                            <div class="bg-black text-white p-6 grid items-center place-items-center">
                                <p class="text-gray-400 text-sm uppercase">Grand Total</p>
                                <p class="text-lg font-bold">$ {getGrandTotal().toLocaleString()}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmOrder}
                            class="w-full bg-theme-orange text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
        </>
    );
};

export default Checkout;
