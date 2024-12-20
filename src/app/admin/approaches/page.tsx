'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Container } from '@/components/Container';
import Spinner from '@/components/Spinner';
import { PostgrestError } from '@supabase/supabase-js';
import PageContent from './PageContent';
import { ApproachProps } from '@/types';

const Page = () => {
    const [approaches, setApproaches] = useState<ApproachProps[]>([]);
    const [formData, setFormData] = useState({
        id:0,
        title: '',
        description: '',
        buttonText: '',
        tag: '',
        caption: '',
        imgSrc: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const supabase = createClient();

    const handleEdit = (approach: ApproachProps): void => {
        setFormData({
            id: approach.id,
            title: approach.title,
            description: approach.description,
            buttonText: approach.buttonText,
            tag: approach.tag,
            caption: approach.caption,
            imgSrc: approach.imgSrc,
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

    const fetchApproaches = useCallback(async () => {
        try {
            const { data, error }: { data: ApproachProps[] | null; error: PostgrestError | null } =
                await supabase.from('Approaches').select('*').order('id', { ascending: true });

            if (error) {
                throw error;
            }

            if (data) {
                setApproaches(data);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error fetching approaches: ' + error.message });
        }
    }, [supabase]);

    useEffect(() => {
        fetchApproaches();
    }, [fetchApproaches]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            if (file) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`Approaches/${formData.id}.jpg`, file);

                if (uploadError) {
                    throw uploadError;
                }

                const fileUrl = supabase.storage.from('images').getPublicUrl(`Approaches/${formData.id}.jpg`).data?.publicUrl;

                // Check if approach with this title already exists
                const { data: existingApproach, error: fetchError } = await supabase
                    .from('Approaches')
                    .select('*')
                    .eq('title', formData.title)
                    .single();

                if (fetchError) {
                    throw fetchError;
                }

                if (existingApproach) {
                    // Approach with this title already exists, update it
                    const { error: updateError } = await supabase
                        .from('Approaches')
                        .update({ ...formData, imgSrc: fileUrl })
                        .eq('title', formData.title);

                    if (updateError) {
                        throw updateError;
                    } else {
                        fetchApproaches();
                        setMessage({ type: 'success', text: 'Approach updated successfully!' });
                    }
                } else {
                    // Approach with this title does not exist, insert new
                    const { error: insertError } = await supabase
                        .from('Approaches')
                        .insert([{ ...formData, imgSrc: fileUrl }]);

                    if (insertError) {
                        throw insertError;
                    } else {
                        fetchApproaches();
                        setMessage({ type: 'success', text: 'New approach added successfully!' });
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

    if (!approaches.length) {
        return (
            <Container className="flex flex-col h-screen justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        );
    }

    return (
        <PageContent
            approaches={approaches}
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
