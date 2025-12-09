import { createSignal, onMount, For, Show } from 'solid-js';
import Hero from '../components/Hero.jsx';
import CategoryCardLg from '../components/CategoryCardLg.jsx';
import ProductCardLinks from '../components/ProductCardLinks.jsx';
import { fetchProductsByCategory, getImageUrl } from '../lib/products';

const SpeakersFromDB = () => {
    const pageTitle = "Speakers";
    const [speakers, setSpeakers] = createSignal([]);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        setLoading(true);
        const products = await fetchProductsByCategory('speakers');
        setSpeakers(products);
        setLoading(false);
    });

    return (
        <div>
            <Hero
                hasHeroImage={false}
                pageTitle={pageTitle}
            />

            <Show when={loading()}>
                <div class="container mx-auto px-6 py-12 text-center">
                    <p class="text-gray-600">Loading products...</p>
                </div>
            </Show>

            <Show when={!loading()}>
                <Show 
                    when={speakers().length > 0}
                    fallback={
                        <div class="container mx-auto px-6 py-24 text-center">
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">No Speakers Available</h2>
                            <p class="text-gray-600">Check back soon for new products!</p>
                        </div>
                    }
                >
                    <div class="container mx-auto px-6 py-12 space-y-24">
                        <For each={speakers()}>
                            {(speaker, index) => (
                                <CategoryCardLg
                                    flipped={index() % 2 !== 0}
                                    imgSrc={getImageUrl(speaker.featuredImage)}
                                    imgAlt={speaker.productName}
                                    subtitle="New Product"
                                    title={speaker.productName}
                                    description={speaker.description}
                                    ctaText="See Product"
                                    ctaHref={`/products/${speaker.productId}`}
                                />
                            )}
                        </For>
                    </div>
                </Show>
            </Show>

            <ProductCardLinks />
        </div>
    );
};

export default SpeakersFromDB;
