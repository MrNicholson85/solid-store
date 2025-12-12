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
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24">
            {/* Product Image */}
            <div class="bg-theme-light-gray rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px]">
                <img
                    src={props.image}
                    alt={props.title}
                    class="w-full h-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div class="flex flex-col justify-center">
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">{props.title}</h2>
                <p class="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                    {props.description}
                </p>
                <p class="text-xl md:text-2xl font-bold mb-6 md:mb-8">{props.price}</p>

                {/* Add to Cart */}
                <div class="flex flex-col sm:flex-row gap-4">
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
