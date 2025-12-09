import { createSignal, onMount, For, Show } from 'solid-js';
import { useNavigate, A } from '@solidjs/router';
import { databases, storage, DATABASE_ID, PRODUCTS_COLLECTION_ID, BUCKET_ID } from '../../lib/appwrite';
import { user, checkAuth } from '../../lib/auth';
import { getImageUrl } from '../../lib/products';

const ManageProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');

    onMount(async () => {
        const authResult = await checkAuth();
        if (!authResult) {
            navigate('/admin/login');
            return;
        }
        await fetchProducts();
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                PRODUCTS_COLLECTION_ID
            );
            setProducts(response.documents);
        } catch (err) {
            setError('Failed to load products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId, documentId, featuredImage, additionalImages) => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }

        try {
            // Delete featured image from storage
            if (featuredImage) {
                try {
                    await storage.deleteFile(BUCKET_ID, featuredImage);
                } catch (err) {
                    console.error('Error deleting featured image:', err);
                }
            }

            // Delete additional images from storage
            if (additionalImages) {
                const imageIds = additionalImages.split(',').map(id => id.trim()).filter(id => id);
                for (const imageId of imageIds) {
                    try {
                        await storage.deleteFile(BUCKET_ID, imageId);
                    } catch (err) {
                        console.error('Error deleting additional image:', err);
                    }
                }
            }

            // Delete product document
            await databases.deleteDocument(
                DATABASE_ID,
                PRODUCTS_COLLECTION_ID,
                documentId
            );

            setSuccess('Product deleted successfully!');
            await fetchProducts();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete product: ' + err.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                {/* Header */}
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">Manage Products</h1>
                            <p class="text-sm text-gray-600 mt-1">View, edit, and delete products</p>
                        </div>
                        <div class="flex gap-4">
                            <A 
                                href="/admin/products" 
                                class="px-4 py-2 bg-theme-orange text-white rounded hover:bg-theme-light-orange transition"
                            >
                                Create New Product
                            </A>
                            <A 
                                href="/admin/profile" 
                                class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                            >
                                Back to Profile
                            </A>
                        </div>
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
                        <p class="text-gray-600">Loading products...</p>
                    </div>
                </Show>

                {/* Products List */}
                <Show when={!loading() && products().length > 0}>
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <For each={products()}>
                                        {(product) => (
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                        <Show when={product.featuredImage}>
                                                            <img 
                                                                src={getImageUrl(product.featuredImage)} 
                                                                alt={product.productName}
                                                                class="w-16 h-16 rounded-lg object-cover mr-4"
                                                            />
                                                        </Show>
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900">
                                                                {product.productName}
                                                            </div>
                                                            <div class="text-xs text-gray-500">
                                                                ID: {product.productId}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${product.price.toLocaleString()}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.stockQuantity}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div class="flex justify-end gap-2">
                                                        <A 
                                                            href={`/admin/products/edit/${product.$id}`}
                                                            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                                        >
                                                            Edit
                                                        </A>
                                                        <button 
                                                            onClick={() => handleDelete(product.productId, product.$id, product.featuredImage, product.additionalImages)}
                                                            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Show>

                {/* Empty State */}
                <Show when={!loading() && products().length === 0}>
                    <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                        <p class="text-gray-600 mb-4">No products found</p>
                        <A 
                            href="/admin/products" 
                            class="inline-block px-6 py-3 bg-theme-orange text-white rounded hover:bg-theme-light-orange transition"
                        >
                            Create Your First Product
                        </A>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default ManageProducts;
