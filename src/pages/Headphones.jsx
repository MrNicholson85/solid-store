import Hero from '../components/Hero.jsx';

const Headphones = () => {
    const pageTitle = "Headphones";

    return (
        <div>
            <Hero
                hasHeroImage={false}
                pageTitle={pageTitle}
            />
        </div>
    )
}

export default Headphones;
