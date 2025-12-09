import { createSignal } from 'solid-js';
import { databases, storage, DATABASE_ID, PRODUCTS_COLLECTION_ID, BUCKET_ID } from './appwrite';

const [products, setProducts] = createSignal([]);
const [loading, setLoading] = createSignal(false);

// Get image URL from Appwrite Storage
export const getImageUrl = (imageId) => {
    if (!imageId) return null;
    return `https://sfo.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${imageId}/view?project=693728bd000c8bb5c6c3`;
};

// Fetch all products
export const fetchProducts = async () => {
    setLoading(true);
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            PRODUCTS_COLLECTION_ID
        );
        setProducts(response.documents);
        return response.documents;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    } finally {
        setLoading(false);
    }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            PRODUCTS_COLLECTION_ID,
            [
                // Query filter for category
            ]
        );
        return response.documents.filter(p => p.category === category);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    } finally {
        setLoading(false);
    }
};

// Fetch single product by ID
export const fetchProductById = async (productId) => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            PRODUCTS_COLLECTION_ID
        );
        return response.documents.find(p => p.productId === parseInt(productId));
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export { products, loading };
