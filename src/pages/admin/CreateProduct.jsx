import { createSignal, For } from 'solid-js';
import { databases, storage, DATABASE_ID, PRODUCTS_COLLECTION_ID, BUCKET_ID } from '../../lib/appwrite';
import { user, logout } from '../../lib/auth';
import { useNavigate } from '@solidjs/router';

const CreateProduct = () => {
    const navigate = useNavigate();
    
    // Form fields
    const [nextProductId, setNextProductId] = createSignal(null);
    const [productName, setProductName] = createSignal('');
    const [description, setDescription] = createSignal('');
    const [price, setPrice] = createSignal('');
    const [stockQuantity, setStockQuantity] = createSignal('0');
    const [category, setCategory] = createSignal('headphones');
    const [image, setImage] = createSignal(null);
    const [additionalImages, setAdditionalImages] = createSignal([]);
    const [features, setFeatures] = createSignal('');
    const [featuredImage, setFeaturedImage] = createSignal('');
    const [inTheBoxItems, setInTheBoxItems] = createSignal([{ quantity: '', item: '' }]);
    
    const [isLoading, setIsLoading] = createSignal(false);
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');

    // Fetch next product ID on component mount
    const fetchNextProductId = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                PRODUCTS_COLLECTION_ID
            );
            
            // Find the highest productId and add 1
            if (response.documents.length === 0) {
                setNextProductId(1);
            } else {
                const maxId = Math.max(...response.documents.map(doc => doc.productId));
                setNextProductId(maxId + 1);
            }
        } catch (err) {
            console.error('Error fetching next product ID:', err);
            setNextProductId(1); // Default to 1 if error
        }
    };

    // Fetch next product ID when component loads
    fetchNextProductId();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setAdditionalImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            // Upload featured image to Appwrite Storage
            let imageUrl = '';
            if (image()) {
                const response = await storage.createFile(
                    BUCKET_ID,
                    'unique()',
                    image()
                );
                imageUrl = response.$id;
            }

            // Upload additional images to Appwrite Storage
            let additionalImageIds = [];
            if (additionalImages().length > 0) {
                for (const file of additionalImages()) {
                    const response = await storage.createFile(
                        BUCKET_ID,
                        'unique()',
                        file
                    );
                    additionalImageIds.push(response.$id);
                }
            }

            // Format in the box items as JSON string
            const inTheBoxData = inTheBoxItems()
                .filter(item => item.quantity && item.item)
                .map(item => `${item.quantity}x ${item.item}`)
                .join('\n');

            // Create product document in Appwrite Database
            await databases.createDocument(
                DATABASE_ID,
                PRODUCTS_COLLECTION_ID,
                'unique()',
                {
                    productId: nextProductId(),
                    productName: productName(),
                    description: description() || null,
                    price: parseFloat(price()),
                    stockQuantity: parseInt(stockQuantity()),
                    category: category(),
                    createdDate: new Date().toISOString(),
                    featuredImage: imageUrl || null,
                    additionalImages: additionalImageIds.join(',') || null,
                    features: features() || null,
                    inTheBox: inTheBoxData || null
                }
            );

            setSuccess('Product created successfully!');
            
            // Reset form and fetch next product ID
            setProductName('');
            setDescription('');
            setPrice('');
            setStockQuantity('0');
            setCategory('headphones');
            setImage(null);
            setAdditionalImages([]);
            setFeatures('');
            setFeaturedImage('');
            setInTheBoxItems([{ quantity: '', item: '' }]);
            await fetchNextProductId(); // Get next ID for next product
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto">
                {/* Header */}
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">Create Product</h1>
                            <p class="text-sm text-gray-600 mt-1">Logged in as: {user()?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} class="space-y-6">
                        {/* Messages */}
                        {error() && (
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error()}
                            </div>
                        )}
                        {success() && (
                            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                {success()}
                            </div>
                        )}
                        {/* Product ID (Auto-generated) */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Product ID (Auto-generated)</label>
                            <input
                                type="number"
                                disabled
                                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                                value={nextProductId() || 'Loading...'}
                            />
                        </div>

                        {/* Product Name */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input
                                type="text"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                value={productName()}
                                onInput={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                rows="4"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                value={description()}
                                onInput={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Price, Stock, and Category */}
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                    value={price()}
                                    onInput={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                    value={stockQuantity()}
                                    onInput={(e) => setStockQuantity(e.target.value)}
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                    value={category()}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="headphones">Headphones</option>
                                    <option value="speakers">Speakers</option>
                                    <option value="earphones">Earphones</option>
                                </select>
                            </div>
                        </div>

                        {/* Featured Image Upload */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Featured Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                onChange={handleImageChange}
                            />
                            <p class="mt-1 text-sm text-gray-500">Main product image displayed on product cards</p>
                        </div>

                        {/* Additional Images Upload */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                onChange={handleAdditionalImagesChange}
                            />
                            <p class="mt-1 text-sm text-gray-500">
                                Select multiple images for product gallery ({additionalImages().length} selected)
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Features</label>
                            <textarea
                                rows="6"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                placeholder="Describe product features, separate paragraphs with double line breaks"
                                value={features()}
                                onInput={(e) => setFeatures(e.target.value)}
                            />
                        </div>

                        {/* In The Box */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">In The Box</label>
                            <div class="space-y-3">
                                <For each={inTheBoxItems()}>
                                    {(item, index) => (
                                        <div class="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Qty"
                                                class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                                value={item.quantity}
                                                onInput={(e) => {
                                                    const items = [...inTheBoxItems()];
                                                    items[index()].quantity = e.target.value;
                                                    setInTheBoxItems(items);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Item name"
                                                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-theme-orange focus:border-theme-orange"
                                                value={item.item}
                                                onInput={(e) => {
                                                    const items = [...inTheBoxItems()];
                                                    items[index()].item = e.target.value;
                                                    setInTheBoxItems(items);
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const items = inTheBoxItems().filter((_, i) => i !== index());
                                                    setInTheBoxItems(items.length ? items : [{ quantity: '', item: '' }]);
                                                }}
                                                class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </For>
                                <button
                                    type="button"
                                    onClick={() => setInTheBoxItems([...inTheBoxItems(), { quantity: '', item: '' }])}
                                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    + Add Item
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading()}
                                class="w-full bg-theme-orange text-white py-3 px-4 rounded-md hover:bg-theme-light-orange transition font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading() ? 'Creating Product...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
