import Hero from '../components/Hero.jsx';
import CategoryCardLg from '../components/CategoryCardLg.jsx';
import ProductCardLinks from '../components/ProductCardLinks.jsx';


const Speakers = () => {
    const pageTitle = "Speakers";

    return (
        <div>
            <Hero
                hasHeroImage={false}
                pageTitle={pageTitle}
            />

            <CategoryCardLg
                flipped={false}
                imgSrc={'/src/assets/img/image-product-zx9-speaker.jpg'}
                imgAlt="ZX9 Speaker"
                subtitle="New Product"
                title="ZX9 Speaker"
                description="Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups."
                ctaText="See Product"
                ctaHref="/speakers/zx9-speaker"
            />

            <CategoryCardLg
                flipped={true}
                imgSrc={'/src/assets/img/image-product-zx7-speaker.jpg'}
                imgAlt="ZX7 Speaker"
                title="ZX7 Speaker"
                description="Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use."
                ctaText="See Product"
                ctaHref="/speakers/zx7-speaker"
            />

            <ProductCardLinks />  
        </div>
    )
}

export default Speakers;
