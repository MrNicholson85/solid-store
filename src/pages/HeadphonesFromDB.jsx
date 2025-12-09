import { createSignal, onMount, For, Show } from 'solid-js';
import Hero from '../components/Hero.jsx';
import CategoryCardLg from '../components/CategoryCardLg.jsx';
import ProductCardLinks from '../components/ProductCardLinks.jsx';
import { fetchProductsByCategory, getImageUrl } from '../lib/products';

const HeadphonesFromDB = () => {
    const pageTitle = "Headphones";
    const [headphones, setHeadphones] = createSignal([]);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        setLoading(true);
        const products = await fetchProductsByCategory('headphones');
        setHeadphones(products);
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
                <div class="container mx-auto px-6 py-12 space-y-24">
                    <For each={headphones()}>
                        {(headphone, index) => (
                            <CategoryCardLg
                                flipped={index() % 2 !== 0}
                                imgSrc={getImageUrl(headphone.featuredImage)}
                                imgAlt={headphone.productName}
                                subtitle="New Product"
                                title={headphone.productName}
                                description={headphone.description}
                                ctaText="See Product"
                                ctaHref={`/products/${headphone.productId}`}
                            />
                        )}
                    </For>
                </div>
            </Show>

            <ProductCardLinks />
        </div>
    );
};

export default HeadphonesFromDB;
