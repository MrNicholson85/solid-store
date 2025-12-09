import { createSignal, onMount, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { user, logout, checkAuth } from '../../lib/auth';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = createSignal(true);
    const [authChecked, setAuthChecked] = createSignal(false);

    onMount(async () => {
        try {
            const result = await checkAuth();
            setAuthChecked(true);
            
            // If no user after auth check, redirect to login
            if (!result) {
                navigate('/admin/login');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    });

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <Show
            when={!loading()}
            fallback={
                <div class="min-h-screen flex items-center justify-center bg-gray-100">
                    <p class="text-gray-600">Loading...</p>
                </div>
            }
        >
            <Show when={authChecked() && user()} fallback={null}>
                <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-3xl mx-auto">
                        {/* Header */}
                        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
                                    <p class="text-sm text-gray-600 mt-1">Manage your account</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <p class="text-lg text-gray-900">{user()?.name || 'N/A'}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p class="text-lg text-gray-900">{user()?.email}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                    <p class="text-sm text-gray-600 font-mono">{user()?.$id}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                                    <p class="text-sm text-gray-600">
                                        {user()?.$createdAt ? new Date(user().$createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div class="bg-white rounded-lg shadow-lg p-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/admin/products')}
                                    class="px-6 py-4 bg-theme-orange text-white rounded-md hover:bg-theme-light-orange transition font-bold text-center"
                                >
                                    Create New Product
                                </button>
                                <button
                                    onClick={() => navigate('/admin/manage-products')}
                                    class="px-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-bold text-center"
                                >
                                    Manage Products
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    class="px-6 py-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition font-bold text-center"
                                >
                                    View Store
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </Show>
    );
};

export default Profile;
