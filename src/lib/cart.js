import { createSignal, createEffect } from 'solid-js';

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('audiophile-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return [];
    }
};

// Cart state with initial value from localStorage
const [cartItems, setCartItems] = createSignal(loadCartFromStorage());
const [isCartOpen, setIsCartOpen] = createSignal(false);

// Save cart to localStorage whenever it changes
createEffect(() => {
    try {
        localStorage.setItem('audiophile-cart', JSON.stringify(cartItems()));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
});

// Add item to cart
export const addToCart = (product, quantity = 1) => {
    const existingItemIndex = cartItems().findIndex(item => item.productId === product.productId);
    
    if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedCart = [...cartItems()];
        updatedCart[existingItemIndex].quantity += quantity;
        setCartItems(updatedCart);
    } else {
        // Add new item
        setCartItems([...cartItems(), {
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            featuredImage: product.featuredImage,
            quantity: quantity
        }]);
    }
};

// Remove item from cart
export const removeFromCart = (productId) => {
    setCartItems(cartItems().filter(item => item.productId !== productId));
};

// Update item quantity
export const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const updatedCart = cartItems().map(item => 
        item.productId === productId 
            ? { ...item, quantity } 
            : item
    );
    setCartItems(updatedCart);
};

// Clear entire cart
export const clearCart = () => {
    setCartItems([]);
};

// Get cart total
export const getCartTotal = () => {
    return cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = () => {
    return cartItems().reduce((count, item) => count + item.quantity, 0);
};

// Toggle cart modal
export const toggleCart = () => {
    setIsCartOpen(!isCartOpen());
};

export const openCart = () => {
    setIsCartOpen(true);
};

export const closeCart = () => {
    setIsCartOpen(false);
};

// Export signals
export { cartItems, isCartOpen };
