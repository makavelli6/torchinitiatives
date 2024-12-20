'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Container } from '@/components/Container';
import Spinner from '@/components/Spinner';
import CarouselItem from './CarouselItem';

interface Hero {
    header: string;
    paragraph: string;
    link: string;
    imageLink: string;
}

const Page = () => {
    const supabase = createClient();

    const [hero, setHero] = useState<Hero | null>(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const { data, error } = await supabase
                    .from('Hero')
                    .select('*')
                    .single();

                if (error) throw error;
                if (data) {
                    setHero(data);
                }
            } catch (error: any) {
                setMessage({ type: 'error', text: 'Error fetching hero: ' + error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchHero();
    }, [supabase]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (file) {
                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`Hero/hero.jpeg`, file, { cacheControl: '3600', upsert: true });

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('images')
                    .getPublicUrl('Hero/hero.jpeg');

                const { data,error: updateError } = await supabase
                    .from('Hero')
                    .update({ imageLink: `${publicUrlData.publicUrl}?t=${new Date().getTime()}` })
                    .eq('id', 1)

                if (updateError) throw updateError;

                setHero({ ...hero, imageLink: publicUrlData.publicUrl } as Hero);

                setMessage({ type: 'success', text: 'File uploaded successfully!' });
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="flex flex-wrap h-screen ">
                <Spinner />
            </Container>
        );
    }

    return (
        <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1">
                        <div className="w-full p-24 slider-container">
                            {hero && (
                                <CarouselItem
                                    header={hero.header}
                                    paragraph={hero.paragraph}
                                    link={hero.link}
                                    imgSrc={hero.imageLink}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                            <div className="flex items-center justify-center p-12">
                                <div className="mx-auto w-full max-w-[550px] bg-white">
                                    <form className="py-6 px-9" onSubmit={handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="header" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Title text:
                                            </label>
                                            <input
                                                type="text"
                                                name="header"
                                                id="header"
                                                placeholder="Welcome to..."
                                                value={hero?.header || ''}
                                                onChange={(e) => setHero({ ...hero, header: e.target.value } as Hero)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="paragraph" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Paragraph:
                                            </label>
                                            <textarea
                                                name="paragraph"
                                                id="paragraph"
                                                placeholder="Description"
                                                value={hero?.paragraph || ''}
                                                onChange={(e) => setHero({ ...hero, paragraph: e.target.value } as Hero)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="link" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Link text:
                                            </label>
                                            <input
                                                type="text"
                                                name="link"
                                                id="link"
                                                placeholder="https://"
                                                value={hero?.link || ''}
                                                onChange={(e) => setHero({ ...hero, link: e.target.value } as Hero)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div className="mb-6 pt-4">
                                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                                Upload File
                                            </label>
                                            <div className="mb-8">
                                                <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} />
                                                <label htmlFor="file" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                                    <div>
                                                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                            Drop files here
                                                        </span>
                                                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                                            Or
                                                        </span>
                                                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                            Browse
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                    {message && (
                                        <div className={`mt-4 p-4 rounded text-center ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;
