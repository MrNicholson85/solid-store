import { Show, For } from 'solid-js';
import { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, closeCart } from '../lib/cart';
import { getImageUrl } from '../lib/products';
import { useNavigate } from '@solidjs/router';

const Cart = () => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Navigate to checkout page (to be implemented)
        closeCart();
        navigate('/checkout');
    };

    const increment = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const decrement = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity - 1);
    };

    return (
        <div class="fixed top-24 right-4 left-4 sm:left-auto sm:right-8 lg:right-24 sm:w-[377px] bg-white rounded-lg p-6 sm:p-8 z-50 shadow-2xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg font-bold uppercase tracking-wider">
                    Cart ({cartItems().length})
                </h2>
                <Show when={cartItems().length > 0}>
                    <button 
                        onClick={clearCart}
                        class="text-gray-500 hover:text-theme-orange transition underline text-sm"
                    >
                        Remove all
                    </button>
                </Show>
            </div>

            {/* Cart Items */}
            <Show
                when={cartItems().length > 0}
                fallback={
                    <div class="text-center py-8">
                        <p class="text-gray-500">Your cart is empty</p>
                    </div>
                }
            >
                <div class="space-y-6 mb-6 max-h-[400px]">
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
                                    <span class="text-theme-dark-gray font-bold text-sm flex mb-2 leading-[15px] text-[15px]">{item.productName}</span>
                                    <p class="text-gray-500 text-sm">$ {item.price.toLocaleString()}</p>
                                </div>
                                <div class="flex items-center bg-theme-dark-gray">
                                    <button 
                                        onClick={() => decrement(item.productId, item.quantity)}
                                        class="px-3 py-2 hover:text-theme-orange transition text-sm font-bold"
                                    >
                                        -
                                    </button>
                                    <span class="px-3 text-sm font-bold">{item.quantity}</span>
                                    <button 
                                        onClick={() => increment(item.productId, item.quantity)}
                                        class="px-3 py-2 hover:text-theme-orange transition text-sm font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}
                    </For>
                </div>

                {/* Total */}
                <div class="flex justify-between items-center mb-6">
                    <span class="text-gray-500 uppercase text-sm">Total</span>
                    <span class="text-theme-dark-gray text-lg font-bold">$ {getCartTotal().toLocaleString()}</span>
                </div>

                {/* Checkout Button */}
                <button 
                    onClick={handleCheckout}
                    class="w-full bg-theme-orange text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition"
                >
                    Checkout
                </button>
            </Show>
        </div>
    );
};

export default Cart;
