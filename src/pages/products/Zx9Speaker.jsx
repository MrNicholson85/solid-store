import ItemCard from '../../components/fragments/ItemCard.jsx';
import ProductCardLinks from '../../components/ProductCardLinks.jsx';;
import ProductGallery from '../../components/ProductGallery.jsx';

// Images
import zx9SpeakerImage1 from '../../assets/img/products/ZX9_speaker/image-gallery-1.jpg';
import zx9SpeakerImage2 from '../../assets/img/products/ZX9_speaker/image-gallery-2.jpg';
import zx9SpeakerImage3 from '../../assets/img/products/ZX9_speaker/image-gallery-3.jpg';
import zx9SpeakerImage from '../../assets/img/image-product-zx9-speaker.jpg';
import zx7SpeakerImage from '../../assets/img/image-product-zx7-speaker.jpg';
import xx59SpeakerImage from '../../assets/img/image-product-xx59.jpg';
import xx99MarkISpeakerImage from '../../assets/img/image-product-xx99-one.jpg'

const Zx9Speaker = () => {
    return (
        <div class="container mx-auto px-8 lg:px-24 py-16">
            {/* Back Button */}
            <a href="/speakers" class="inline-block mb-8 text-gray-600 hover:text-theme-orange transition">
                Go Back
            </a>

            {/* Product Details Section */}
            <div class="grid lg:grid-cols-2 gap-16 mb-24">
                {/* Product Image */}
                <div class="bg-theme-light-gray rounded-lg overflow-hidden">
                    <img 
                        src={zx9SpeakerImage} 
                        alt="ZX9 Speaker" 
                        class="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div class="flex flex-col justify-center">
                    <p class="text-theme-orange text-sm tracking-widest uppercase mb-4">New Product</p>
                    <h1 class="text-4xl lg:text-5xl font-bold uppercase mb-6">ZX9 Speaker</h1>
                    <p class="text-gray-600 mb-8 leading-relaxed">
                        Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker 
                        system that offers truly wireless connectivity -- creating new possibilities for more pleasing 
                        and practical audio setups.
                    </p>
                    <p class="text-2xl font-bold mb-8">$ 4,500</p>
                    
                    {/* Add to Cart */}
                    <div class="flex gap-4">
                        <div class="flex items-center bg-theme-light-gray">
                            <button class="px-4 py-3 hover:text-theme-orange transition">-</button>
                            <span class="px-6">1</span>
                            <button class="px-4 py-3 hover:text-theme-orange transition">+</button>
                        </div>
                        <button class="bg-theme-orange text-white px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-theme-light-orange transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div class="grid lg:grid-cols-2 gap-16 mb-24">
                <div>
                    <h2 class="text-3xl font-bold uppercase mb-6">Features</h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, 
                        USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices 
                        connected at a time.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Wireless connectivity and pairing is easy and stable. This speaker offers Bluetooth 4.2 support and 
                        features anticlipping technology for better sound quality at high volumes. Integrated DSP ensures that 
                        everything sounds great, no matter what you choose to listen to.
                    </p>
                </div>

                {/* In the Box */}
                <div>
                    <h2 class="text-3xl font-bold uppercase mb-6">In the Box</h2>
                    <ul class="space-y-2">
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">2x</span>Speaker Unit</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">2x</span>Speaker Cloth Panel</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">1x</span>User Manual</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">1x</span>3.5mm 5m Audio Cable</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">1x</span>10m Optical Cable</li>
                    </ul>
                </div>
            </div>

            {/* Product Gallery */}
            <ProductGallery
                image1={zx9SpeakerImage1}
                image2={zx9SpeakerImage2}
                image3={zx9SpeakerImage3}
            />
            {/* You May Also Like */}
            <div class="mb-24">
                <h2 class="text-3xl font-bold uppercase text-center mb-12">You May Also Like</h2>
                <div class="grid md:grid-cols-3 gap-[30px]">
                    <ItemCard
                        imageSrc={zx7SpeakerImage}
                        title="ZX7 Speaker"
                        link="/speakers/zx7-speaker"
                        buttonText="See Product"
                    />

                    <ItemCard
                        imageSrc={xx59SpeakerImage}
                        title="XX59"
                        link="/headphones/xx59"
                        buttonText="See Product"
                    />
                    <ItemCard
                        imageSrc={xx99MarkISpeakerImage}
                        title="XX99 Mark I"
                        link="/headphones/xx99-mark-i"
                        buttonText="See Product"
                    />
                </div>
            </div>

            <ProductCardLinks />
        </div>
    );
};

export default Zx9Speaker;
