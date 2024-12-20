'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Container } from '@/components/Container';
import { PostgrestError } from '@supabase/supabase-js';
import PageContent from './PageContent';
import { Benefit } from '@/types';
import Spinner from '@/components/Spinner';

const Page = () => {
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [formData, setFormData] = useState<Benefit>({
        title: '',
        desc: '',
        button: false,
        image: 'left',
        imagePos: 'left',
        id: 0,
        Benefits_points: [],
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const supabase = createClient();

    const handleEdit = (benefit: Benefit): void => {
        setFormData({
            title: benefit.title,
            desc: benefit.desc,
            button: benefit.button,
            image: benefit.image,
            imagePos: benefit.imagePos,
            id: benefit.id,
            Benefits_points: benefit.Benefits_points,
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const fetchBenefits = useCallback(async () => {
        try {
            const { data, error }: { data: Benefit[] | null; error: PostgrestError | null } =
                await supabase.from('Benefits').select('*').order('id', { ascending: true });

            if (error) {
                throw error;
            }

            if (data) {
                setBenefits(data);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error fetching benefits: ' + error.message });
        }
    }, [supabase]);

    useEffect(() => {
        fetchBenefits();
    }, [fetchBenefits]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            if (file) {
                // Upload file to storage
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`Benefits/${formData.id}.jpg`, file, { cacheControl: '3600', upsert: true });

                if (uploadError) {
                    throw uploadError;
                }

                const fileUrl = supabase.storage.from('images').getPublicUrl(`Benefits/${formData.id}.jpg`).data?.publicUrl;

                const { data: existingBenefit, error: fetchError } = await supabase
                    .from('Benefits')
                    .select('*')
                    .eq('title', formData.title)
                    .single();

                if (fetchError) {
                    throw fetchError;
                }

                if (existingBenefit) {
                    const { error: updateError } = await supabase
                        .from('Benefits')
                        .update({image: fileUrl })
                        .eq('title', formData.title);

                    if (updateError) {
                        throw updateError;
                    } else {
                        fetchBenefits();
                        setMessage({ type: 'success', text: 'Benefit updated successfully!' });
                    }
                } else {
                    const { error: insertError } = await supabase
                        .from('Benefits')
                        .insert([{ ...formData, image: fileUrl }]);

                    if (insertError) {
                        throw insertError;
                    } else {
                        fetchBenefits();
                        setMessage({ type: 'success', text: 'New benefit added successfully!' });
                    }
                }
            } else {
                setMessage({ type: 'error', text: 'Please select a file to upload.' });
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error: ' + error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!benefits.length) {
        return (
            <Container className="flex flex-col h-screen justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        );
    }

    return (
        <PageContent
            benefits={benefits}
            onEdit={handleEdit}
            formData={formData}
            onChange={handleChange}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            file={file}
            isSubmitting={isSubmitting}
            message={message}
        />
    );
};

export default Page;
