import ProductCardLinks from '../../components/ProductCardLinks.jsx';
import ProductGallery from '../../components/ProductGallery.jsx';
import ItemCard from '../../components/fragments/ItemCard.jsx';
import ProductDetail from '../../components/ProductDetail.jsx';

// Images

// Ferature Image
import FeatImg from '../../assets/img/image-product-zx7-speaker.jpg';

import zx7SpeakerImage1 from '../../assets/img/products/ZX7_speaker/image-gallery-1.jpg';
import zx7SpeakerImage2 from '../../assets/img/products/ZX7_speaker/image-gallery-2.jpg';
import zx7SpeakerImage3 from '../../assets/img/products/ZX7_speaker/image-gallery-3.jpg';
import zx9SpeakerImage from '../../assets/img/image-product-zx9-speaker.jpg';
import xx59SpeakerImage from '../../assets/img/image-product-xx59.jpg';
import xx99MarkISpeakerImage from '../../assets/img/image-product-xx99-one.jpg';

const Zx7Speaker = () => {
    return (
        <div class="container mx-auto px-8 lg:px-24 py-16">
            {/* Back Button */}
            <a href="/speakers" class="inline-block mb-8 text-gray-600 hover:text-theme-orange transition">
                Go Back
            </a>

            {/* Product Details Section */}
            <ProductDetail
                image={FeatImg}
                title={<>ZX7 <br/> Speaker</>}
                description="Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use."
                price="$3,500"
            />

            {/* Features Section */}
            <div class="grid lg:grid-cols-2 gap-16 mb-24">
                <div>
                    <h2 class="text-3xl font-bold uppercase mb-6">Features</h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent 
                        high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum 
                        that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF 
                        wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth 
                        or traditional optical and RCA input. Switch input sources and control volume at your finger tips with 
                        the included wireless remote. This versatile speaker is also compatible with bluetooth devices.
                    </p>
                </div>

                {/* In the Box */}
                <div>
                    <h2 class="text-3xl font-bold uppercase mb-6">In the Box</h2>
                    <ul class="space-y-2">
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">2x</span>Speaker Unit</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">2x</span>Speaker Cloth Panel</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">1x</span>User Manual</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">1x</span>3.5mm 7.5m Audio Cable</li>
                        <li class="text-gray-600"><span class="text-theme-orange font-bold mr-4">1x</span>7.5m Optical Cable</li>
                    </ul>
                </div>
            </div>

            {/* Product Gallery */}
            <ProductGallery
                image1={zx7SpeakerImage1}
                image2={zx7SpeakerImage2}
                image3={zx7SpeakerImage3}
            />

            {/* You May Also Like */}
            <div class="mb-24">
                <h2 class="text-3xl font-bold uppercase text-center mb-12">You May Also Like</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <ItemCard
                        imageSrc={zx9SpeakerImage}
                        title="ZX9 Speaker"
                        link="/speakers/zx9-speaker"
                        buttonText="See Product"
                    />
                    <ItemCard
                        imageSrc={xx99MarkISpeakerImage}
                        title="XX99 Mark I"
                        link="/headphones/xx99-mark-i"
                        buttonText="See Product"
                    />
                    <ItemCard
                        imageSrc={xx59SpeakerImage}
                        title="XX59"
                        link="/headphones/xx59"
                        buttonText="See Product"
                    />
                </div>
            </div>

            <ProductCardLinks />
        </div>
    );
};

export default Zx7Speaker;
