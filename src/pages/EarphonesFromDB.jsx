import { createSignal, onMount, For, Show } from 'solid-js';
import Hero from '../components/Hero.jsx';
import CategoryCardLg from '../components/CategoryCardLg.jsx';
import ProductCardLinks from '../components/ProductCardLinks.jsx';
import { fetchProductsByCategory, getImageUrl } from '../lib/products';

const EarphonesFromDB = () => {
    const pageTitle = "Earphones";
    const [earphones, setEarphones] = createSignal([]);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        setLoading(true);
        const products = await fetchProductsByCategory('earphones');
        setEarphones(products);
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
                    when={earphones().length > 0}
                    fallback={
                        <div class="container mx-auto px-6 py-24 text-center">
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">No Earphones Available</h2>
                            <p class="text-gray-600">Check back soon for new products!</p>
                        </div>
                    }
                >
                    <div class="container mx-auto px-6 py-12 space-y-24">
                        <For each={earphones()}>
                            {(earphone, index) => (
                                <CategoryCardLg
                                    flipped={index() % 2 !== 0}
                                    imgSrc={getImageUrl(earphone.featuredImage)}
                                    imgAlt={earphone.productName}
                                    subtitle="New Product"
                                    title={earphone.productName}
                                    description={earphone.description}
                                    ctaText="See Product"
                                    ctaHref={`/products/${earphone.productId}`}
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

export default EarphonesFromDB;
