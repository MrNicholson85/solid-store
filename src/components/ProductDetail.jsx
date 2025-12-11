import { createSignal } from 'solid-js';
import { addToCart, openCart } from '../lib/cart';

const ProductDetail = (props) => {
    const [quantity, setQuantity] = createSignal(1);

    const increment = () => {
        setQuantity(quantity() + 1);
    };

    const decrement = () => {
        if (quantity() > 1) {
            setQuantity(quantity() - 1);
        }
    };

    const handleAddToCart = () => {
        if (props.product) {
            addToCart(props.product, quantity());
            openCart();
            setQuantity(1); // Reset quantity after adding
        }
    };

    return (
        <div class="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Product Image */}
            <div class="bg-theme-light-gray rounded-lg overflow-hidden">
                <img
                    src={props.image}
                    alt={props.title}
                    class="w-full h-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div class="flex flex-col justify-center">
                <h2 class="mb-6">{props.title}</h2>
                <p class="text-gray-600 mb-8 leading-relaxed">
                    {props.description}
                </p>
                <p class="text-2xl font-bold mb-8">{props.price}</p>

                {/* Add to Cart */}
                <div class="flex gap-4">
                    <div class="flex items-center bg-theme-light-gray">
                        <button 
                            class="px-4 py-3 hover:text-theme-orange transition font-bold"
                            onClick={decrement}
                        >
                            -
                        </button>
                        <span class="px-6 font-bold">{quantity()}</span>
                        <button 
                            class="px-4 py-3 hover:text-theme-orange transition font-bold"
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        class="bg-theme-orange text-white px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;
