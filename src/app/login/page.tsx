'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Page = () => {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (!error || data?.user) {
                router.push('/admin');
            }
        };

        checkUser();
    }, [router, supabase]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            router.push('/admin');
        }

        setLoading(false);
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: "url(/img/backend.jpg)" }}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Torch Initiaitives</h2>
                            <p className="max-w-xl mt-3 text-gray-300">Web Backend</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Torch Initiaitives</h2>
                            <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                        </div>

                        <div className="mt-8">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="example@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <a href="/reset" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                </div>

                                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
