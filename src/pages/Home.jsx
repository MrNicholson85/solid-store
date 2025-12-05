import ProductCardLinks from '../components/ProductCardLinks.jsx';
import Hero from '../components/Hero.jsx';
import ProductCardLg from '../components/ProductCardLg.jsx';

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
            showIcon={false} />
        </div>
    )
}

export default Home;
