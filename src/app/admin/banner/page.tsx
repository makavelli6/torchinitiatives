
'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Container } from "@/components/Container";

const Page = () => {
    const [bannerText, setBannerText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchBannerText = async () => {
            const supabase = createClient();
            try {
                const { data, error } = await supabase
                    .from('Banner')
                    .select('text')
                    .single();

                if (error) {
                    setError(true)
                } else {
                    if (data) {
                        setBannerText(data.text || '');
                    }
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBannerText();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newText = bannerText;

        // Update the 'Banner' table in Supabase where id equals 1
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('Banner')
                .update({ text: newText })
                .eq('id', 1)
                .select();

            if (error) {
                setError(true);
                setSuccess(false);
                // Handle error state
            } else {
                setError(false);
                // Update local state with new banner text
                setSuccess(true);
                setBannerText(newText);
            }
        } catch (error) {
            setError(true);
            setSuccess(false);
        }
    };

    if (loading) {
        return (
            <Container className="flex h-screen flex-col justify-between items-center lg:flex-row lg:items-start">
                <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-green-600 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </Container>
        );
    }

    return (
        <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1">
                        <div className="bg-green-600">
                            <div className="mx-auto px-4 py-3 text-white text-center md:px-8">
                                <p className="font-medium">
                                    {bannerText}
                                    <br />
                                    <a href="/blog/vegan-restaurant-week" className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1">
                                        Learn more
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                            <div className="flex items-center justify-center p-12">
                                <div className="mx-auto w-full max-w-[550px] bg-white">
                                    <form
                                        className="py-6 px-9"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="mb-5">
                                            <label
                                                htmlFor="text"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Banner text:
                                            </label>
                                            <textarea
                                                name="text"
                                                id="text"
                                                value={bannerText}
                                                onChange={(e) => setBannerText(e.target.value)}
                                                placeholder="Welcome to..."
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            {error &&
                                <div className="text-red-600 text-center mt-4">
                                    An error occurred. Please try again.
                                </div>
                            }
                            {success &&
                                <div className="text-green-600 text-center mt-4">
                                    Banner text updated successfully.
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;
