import { createSignal } from 'solid-js';
import { useNavigate, A } from '@solidjs/router';
import { login } from '../../lib/auth';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [error, setError] = createSignal('');
    const [isLoading, setIsLoading] = createSignal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email(), password());
        
        setIsLoading(false);

        if (result.success) {
            navigate('/admin/profile');
        } else {
            setError(result.error);
        }
    };

    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                {/* Header */}
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Sign in to manage products
                    </p>
                </div>

                {/* Form */}
                <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {error() && (
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error()}
                        </div>
                    )}

                    <div class="rounded-md shadow-sm space-y-4">
                        {/* Email */}
                        <div>
                            <label for="email" class="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email()}
                                onInput={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password()}
                                onInput={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading()}
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-theme-orange hover:bg-theme-light-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-orange disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading() ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    {/* Link to Signup */}
                    <div class="text-center">
                        <p class="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <A href="/admin/signup" class="font-medium text-theme-orange hover:text-theme-light-orange">
                                Sign up
                            </A>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
