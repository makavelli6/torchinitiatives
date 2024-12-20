'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from "@/utils/supabase/client";
import Spinner from '@/components/Spinner';

const Page = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null); // Clear previous messages

        if (file) {
            const { error } = await supabase.storage
                .from('images')
                .upload(`Banner/banner.jpeg`, file, { cacheControl: '3600', upsert: true });

            if (error) {
                setMessage({ type: 'error', text: 'Error uploading file: ' + error.message });
            } else {
                const { data: publicUrlData } = supabase.storage
                    .from('images')
                    .getPublicUrl('Banner/banner.jpeg');
                setImageUrl(`${publicUrlData.publicUrl}?t=${new Date().getTime()}`);
                setMessage({ type: 'success', text: 'File uploaded successfully!' });
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        const fetchImageUrl = async () => {
            const { data } = supabase.storage
                .from('images')
                .getPublicUrl('Banner/banner.jpeg');
            setImageUrl(`${data.publicUrl}?t=${new Date().getTime()}`);
        };

        fetchImageUrl();
    }, [supabase]);

    return (
        <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1">
                        <div className="mx-auto px-4 py-3 text-white text-center md:px-8">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt='Plant'
                                    width={900}
                                    height={500}
                                    className="relative z-0 w-full bg-contain bg-center bg-no-repeat sm:rounded-lg"
                                />
                            ) : (
                                <div className='flex justify-center p-20 items-center'>
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                            <div className="flex items-center justify-center p-12">
                                <div className="mx-auto w-full max-w-[550px] bg-white">
                                    <form className="py-6 px-9" onSubmit={handleSubmit}>
                                        <div className="mb-6 pt-4">
                                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                                Banner Image: Upload File
                                            </label>
                                            <div className="mb-8">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    id="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                                <label
                                                    htmlFor="file"
                                                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                                                >
                                                    <div>
                                                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                            Drop files here
                                                        </span>
                                                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                                            Or
                                                        </span>
                                                        <span
                                                            className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                                                        >
                                                            Browse
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                                disabled={loading}
                                            >
                                                {loading ? <Spinner /> : 'Save'}
                                            </button>
                                        </div>
                                        {message && (
                                            <div className={`mt-4 text-center text-${message.type === 'success' ? 'green' : 'red'}-600`}>
                                                {message.text}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Page;
