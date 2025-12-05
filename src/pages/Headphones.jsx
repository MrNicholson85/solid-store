import Hero from '../components/Hero.jsx';
import CategoryCardLg from '../components/CategoryCardLg.jsx';
import ProductCardLinks from '../components/ProductCardLinks.jsx';

// Placeholder image imports
import XX99 from '../assets/img/image-product-xx99.jpg';
import XX59 from '../assets/img/image-product-xx59.jpg';
import XX99MarkOne from '../assets/img/image-product-xx99-one.jpg';


const Headphones = () => {
    const pageTitle = "Headphones";

    return (
        <div>
            <Hero
                hasHeroImage={false}
                pageTitle={pageTitle}
            />

            <CategoryCardLg
                flipped={true}
                imgSrc={XX99}
                imgAlt="XX99 Mark II Headphones"
                subtitle="New Product"
                title="XX99 Mark II Headphones"
                description="The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound."
                ctaText="See Product"
                ctaHref="/headphones/xx99-mark-two-headphones"
            />

            <CategoryCardLg
                flipped={false}
                imgSrc={XX99MarkOne}
                imgAlt="XX99 Mark I Headphones"
                subtitle=""
                title="XX99 Mark I Headphones"
                description="As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go."
                ctaText="See Product"
                ctaHref="/headphones/xx99-mark-one-headphones"
            />

            <CategoryCardLg
                flipped={true}
                imgSrc={XX59}
                imgAlt="XX59 Headphones"
                title="XX59 Headphones"
                description="Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move."
                ctaText="See Product"
                ctaHref="/headphones/xx59-headphones"
            />

            <ProductCardLinks />
        </div>
    )
}

export default Headphones;
