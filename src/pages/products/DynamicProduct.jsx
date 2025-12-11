import { createSignal, onMount, Show, For } from 'solid-js';
import { useParams } from '@solidjs/router';
import ProductDetail from '../../components/ProductDetail';
import ProductCardLinks from '../../components/ProductCardLinks';
import { fetchProductById, getImageUrl } from '../../lib/products';

const DynamicProductPage = () => {
    const params = useParams();
    const [product, setProduct] = createSignal(null);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        setLoading(true);
        const productData = await fetchProductById(params.id);
        setProduct(productData);
        setLoading(false);
    });

    return (
        <>
            <Show when={loading()}>
                <div class="container mx-auto px-6 py-24 text-center">
                    <p class="text-gray-600">Loading product...</p>
                </div>
            </Show>

            <Show when={!loading() && product()}>
                <div class="container mx-auto px-6 py-24">
                    <ProductDetail
                        product={product()}
                        image={getImageUrl(product().featuredImage)}
                        title={product().productName}
                        description={product().description}
                        price={`$ ${product().price.toLocaleString()}`}
                    />
                    <div class="flex gap-[125px]">
                        {/* Features Section */}
                        <Show when={product().features}>
                            <div class="mt-24 lg:w-[635px]">
                                <h3 class="text-2xl font-bold mb-6">Features</h3>
                                <p class="text-gray-600 whitespace-pre-line">{product().features}</p>
                            </div>
                        </Show>

                        {/* In The Box Section */}
                        <Show when={product().inTheBox}>
                            <div class="mt-24">
                                <h3 class="text-2xl font-bold mb-6">In The Box</h3>
                                <ul class="space-y-2">
                                    <For each={product().inTheBox.split('\n').filter(line => line.trim())}>
                                        {(item) => (
                                            <li class="text-gray-600 flex items-start">
                                                <span class="text-theme-orange font-bold mr-4">
                                                    {item.match(/^\d+x?/)?.[0] || '•'}
                                                </span>
                                                <span>{item.replace(/^\d+x?\s*/, '')}</span>
                                            </li>
                                        )}
                                    </For>
                                </ul>
                            </div>
                        </Show>
                    </div>

                    {/* Additional Images Gallery */}
                    <Show when={product().additionalImages}>
                        <div class="mt-24">
                            <h3 class="text-2xl font-bold mb-6">Gallery</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <For each={product().additionalImages.split(',').filter(id => id.trim())}>
                                    {(imageId) => (
                                        <img 
                                            src={getImageUrl(imageId.trim())} 
                                            alt={product().productName}
                                            class="w-full rounded-lg"
                                        />
                                    )}
                                </For>
                            </div>
                        </div>
                    </Show>
                </div>
            </Show>

            <Show when={!loading() && !product()}>
                <div class="container mx-auto px-6 py-24 text-center">
                    <h2 class="text-2xl font-bold text-gray-900">Product Not Found</h2>
                    <p class="text-gray-600 mt-4">The product you're looking for doesn't exist.</p>
                </div>
            </Show>

            <ProductCardLinks />
        </>
    );
};

export default DynamicProductPage;
