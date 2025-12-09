import { createSignal, onMount, For, Show } from 'solid-js';
import { useParams, useNavigate, A } from '@solidjs/router';
import { databases, storage, DATABASE_ID, PRODUCTS_COLLECTION_ID, BUCKET_ID } from '../../lib/appwrite';
import { checkAuth } from '../../lib/auth';
import { getImageUrl } from '../../lib/products';

const EditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    // Form fields
    const [productName, setProductName] = createSignal('');
    const [description, setDescription] = createSignal('');
    const [price, setPrice] = createSignal('');
    const [stockQuantity, setStockQuantity] = createSignal('0');
    const [category, setCategory] = createSignal('headphones');
    const [features, setFeatures] = createSignal('');
    const [currentFeaturedImage, setCurrentFeaturedImage] = createSignal('');
    const [currentAdditionalImages, setCurrentAdditionalImages] = createSignal('');
    const [newFeaturedImage, setNewFeaturedImage] = createSignal(null);
    const [newAdditionalImages, setNewAdditionalImages] = createSignal([]);
    const [inTheBoxItems, setInTheBoxItems] = createSignal([{ quantity: '', item: '' }]);
    
    const [loading, setLoading] = createSignal(true);
    const [isSubmitting, setIsSubmitting] = createSignal(false);
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');

    onMount(async () => {
        const authResult = await checkAuth();
        if (!authResult) {
            navigate('/admin/login');
            return;
        }
        await fetchProduct();
    });

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const product = await databases.getDocument(
                DATABASE_ID,
                PRODUCTS_COLLECTION_ID,
                params.id
            );

            setProductName(product.productName);
            setDescription(product.description || '');
            setPrice(product.price.toString());
            setStockQuantity(product.stockQuantity.toString());
            setCategory(product.category);
            setFeatures(product.features || '');
            setCurrentFeaturedImage(product.featuredImage || '');
            setCurrentAdditionalImages(product.additionalImages || '');

            // Parse in the box items
            if (product.inTheBox) {
                const items = product.inTheBox.split('\n')
                    .filter(line => line.trim())
                    .map(line => {
                        const match = line.match(/^(\d+)x?\s*(.+)$/);
                        if (match) {
                            return { quantity: match[1], item: match[2] };
                        }
                        return { quantity: '', item: line };
                    });
                setInTheBoxItems(items.length > 0 ? items : [{ quantity: '', item: '' }]);
            }
        } catch (err) {
            setError('Failed to load product: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const addInTheBoxItem = () => {
        setInTheBoxItems([...inTheBoxItems(), { quantity: '', item: '' }]);
    };

    const removeInTheBoxItem = (index) => {
        setInTheBoxItems(inTheBoxItems().filter((_, i) => i !== index));
    };

    const updateInTheBoxItem = (index, field, value) => {
        const items = [...inTheBoxItems()];
        items[index][field] = value;
        setInTheBoxItems(items);
    };

    const handleNewFeaturedImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewFeaturedImage(file);
        }
    };

    const handleNewAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewAdditionalImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            let featuredImageId = currentFeaturedImage();
            let additionalImageIds = currentAdditionalImages();

            // Upload new featured image if provided
            if (newFeaturedImage()) {
                // Delete old featured image
                if (currentFeaturedImage()) {
                    try {
                        await storage.deleteFile(BUCKET_ID, currentFeaturedImage());
                    } catch (err) {
                        console.error('Error deleting old featured image:', err);
                    }
                }
                
                const response = await storage.createFile(
                    BUCKET_ID,
                    'unique()',
                    newFeaturedImage()
                );
                featuredImageId = response.$id;
            }

            // Upload new additional images if provided
            if (newAdditionalImages().length > 0) {
                // Delete old additional images
                if (currentAdditionalImages()) {
                    const oldImageIds = currentAdditionalImages().split(',').map(id => id.trim()).filter(id => id);
                    for (const imageId of oldImageIds) {
                        try {
                            await storage.deleteFile(BUCKET_ID, imageId);
                        } catch (err) {
                            console.error('Error deleting old additional image:', err);
                        }
                    }
                }

                const newImageIds = [];
                for (const file of newAdditionalImages()) {
                    const response = await storage.createFile(
                        BUCKET_ID,
                        'unique()',
                        file
                    );
                    newImageIds.push(response.$id);
                }
                additionalImageIds = newImageIds.join(',');
            }

            // Format in the box items
            const inTheBoxData = inTheBoxItems()
                .filter(item => item.quantity && item.item)
                .map(item => `${item.quantity}x ${item.item}`)
                .join('\n');

            // Update product document
            await databases.updateDocument(
                DATABASE_ID,
                PRODUCTS_COLLECTION_ID,
                params.id,
                {
                    productName: productName(),
                    description: description() || null,
                    price: parseFloat(price()),
                    stockQuantity: parseInt(stockQuantity()),
                    category: category(),
                    featuredImage: featuredImageId || null,
                    additionalImages: additionalImageIds || null,
                    features: features() || null,
                    inTheBox: inTheBoxData || null
                }
            );

            setSuccess('Product updated successfully!');
            setTimeout(() => {
                navigate('/admin/manage-products');
            }, 1500);
            
        } catch (err) {
            setError('Failed to update product: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto">
                {/* Header */}
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">Edit Product</h1>
                            <p class="text-sm text-gray-600 mt-1">Update product information</p>
                        </div>
                        <A 
                            href="/admin/manage-products" 
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            Back to Products
                        </A>
                    </div>
                </div>

                {/* Messages */}
                <Show when={error()}>
                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error()}
                    </div>
                </Show>

                <Show when={success()}>
                    <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                        {success()}
                    </div>
                </Show>

                {/* Loading State */}
                <Show when={loading()}>
                    <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                        <p class="text-gray-600">Loading product...</p>
                    </div>
                </Show>

                {/* Edit Form */}
                <Show when={!loading()}>
                    <form onSubmit={handleSubmit} class="bg-white rounded-lg shadow-lg p-8 space-y-6">
                        {/* Product Name */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={productName()}
                                onInput={(e) => setProductName(e.target.value)}
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                value={category()}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                            >
                                <option value="headphones">Headphones</option>
                                <option value="speakers">Speakers</option>
                                <option value="earphones">Earphones</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description()}
                                onInput={(e) => setDescription(e.target.value)}
                                rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                            />
                        </div>

                        {/* Price and Stock */}
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={price()}
                                    onInput={(e) => setPrice(e.target.value)}
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    value={stockQuantity()}
                                    onInput={(e) => setStockQuantity(e.target.value)}
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Current Featured Image */}
                        <Show when={currentFeaturedImage()}>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Current Featured Image
                                </label>
                                <img 
                                    src={getImageUrl(currentFeaturedImage())} 
                                    alt="Current featured image"
                                    class="w-48 h-48 object-cover rounded-lg"
                                />
                            </div>
                        </Show>

                        {/* New Featured Image */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                {currentFeaturedImage() ? 'Replace Featured Image' : 'Featured Image'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleNewFeaturedImageChange}
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                            />
                        </div>

                        {/* Current Additional Images */}
                        <Show when={currentAdditionalImages()}>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Current Additional Images
                                </label>
                                <div class="grid grid-cols-3 gap-4">
                                    <For each={currentAdditionalImages().split(',').filter(id => id.trim())}>
                                        {(imageId) => (
                                            <img 
                                                src={getImageUrl(imageId.trim())} 
                                                alt="Additional image"
                                                class="w-full h-32 object-cover rounded-lg"
                                            />
                                        )}
                                    </For>
                                </div>
                            </div>
                        </Show>

                        {/* New Additional Images */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                {currentAdditionalImages() ? 'Replace Additional Images' : 'Additional Images'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleNewAdditionalImagesChange}
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                            />
                        </div>

                        {/* Features */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Features
                            </label>
                            <textarea
                                value={features()}
                                onInput={(e) => setFeatures(e.target.value)}
                                rows="6"
                                placeholder="Enter product features (one per line or paragraph)"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                            />
                        </div>

                        {/* In The Box */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                In The Box
                            </label>
                            <For each={inTheBoxItems()}>
                                {(item, index) => (
                                    <div class="flex gap-2 mb-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onInput={(e) => updateInTheBoxItem(index(), 'quantity', e.target.value)}
                                            placeholder="Qty"
                                            class="w-20 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={item.item}
                                            onInput={(e) => updateInTheBoxItem(index(), 'item', e.target.value)}
                                            placeholder="Item name"
                                            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeInTheBoxItem(index())}
                                            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </For>
                            <button
                                type="button"
                                onClick={addInTheBoxItem}
                                class="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                + Add Item
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div class="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting()}
                                class="flex-1 bg-theme-orange text-white py-3 rounded-md font-bold hover:bg-theme-light-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting() ? 'Updating...' : 'Update Product'}
                            </button>
                            <A
                                href="/admin/manage-products"
                                class="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-bold hover:bg-gray-300 transition text-center"
                            >
                                Cancel
                            </A>
                        </div>
                    </form>
                </Show>
            </div>
        </div>
    );
};

export default EditProduct;
