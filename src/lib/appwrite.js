import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('693728bd000c8bb5c6c3'); // Your project ID

// Configuration constants
export const DATABASE_ID = '69372bc70000a3ecfeaa';
export const PRODUCTS_COLLECTION_ID = 'products';
export const BUCKET_ID = 'product-images'; // You'll create this bucket

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };
