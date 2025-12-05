import ProductCardLinks from '../components/ProductCardLinks.jsx';
import Hero from '../components/Hero.jsx';
import ProductCardLg from '../components/ProductCardLg.jsx';
import ProductCardSm from '../components/ProductCardSm.jsx';
import productImage from '../assets/img/image-speaker-zx7.jpg';
import ProductCards from '../components/ProductCards.jsx';
import ProductCardSMImg from '../assets/img/image-earphones-yx1.jpg';

const Home = (props) => {
    const heroImage = null;
    const pageTitle = "Welcome to Audiophile";

    return (
        <div>
            <Hero 
            hasHeroImage={true} 
            heroImage={heroImage} 
            pageTitle={pageTitle} 
            productLabel="NEW PRODUCT" 
            productTitle="XX99 Mark II Headphones" 
            productDescription="Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
            ctaText="SEE PRODUCT" />

            <ProductCardLinks />
            
            <ProductCardLg 
                title="ZX9 Speaker" 
                description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound." 
                showButton={true} 
                showIcon={false}
            />

            <ProductCardSm
                title="ZX7 Speaker"
                link="/products/zx7-speaker"
                ctaText="SEE PRODUCT"
                bgImage={productImage}
            />

            <ProductCards
                bgImage={ProductCardSMImg}
                title="YX1 Earphones"
                link="/products/yx1-earphones"
                ctaText="SEE PRODUCT"
            />
        </div>
    )
}

export default Home;
