import { createSignal } from 'solid-js';
import { account } from './appwrite';

const [user, setUser] = createSignal(null);
const [loading, setLoading] = createSignal(true);

// Check if user is logged in
export const checkAuth = async () => {
    setLoading(true);
    try {
        const session = await account.get();
        setUser(session);
        return session;
    } catch (error) {
        setUser(null);
        return null;
    } finally {
        setLoading(false);
    }
};

// Login
export const login = async (email, password) => {
    try {
        await account.createEmailPasswordSession(email, password);
        const userData = await account.get();
        setUser(userData);
        return { success: true, user: userData };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Logout
export const logout = async () => {
    try {
        await account.deleteSession('current');
        setUser(null);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Register
export const register = async (email, password, name) => {
    try {
        await account.create('unique()', email, password, name);
        const result = await login(email, password);
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export { user, loading };
