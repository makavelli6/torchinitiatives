'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Container } from '@/components/Container';
import { PostgrestError } from '@supabase/supabase-js';
import PageContent from './PageContent';
import { Program } from '@/types';
import Spinner from '@/components/Spinner';

const Page = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [formData, setFormData] = useState<Program>({
        title: '',
        desc: '',
        button: false,
        image: 'left',
        imagePos: 'left',
        id: 0,
        Program_points: [],
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const supabase = createClient();

    const handleEdit = (program: Program): void => {
        setFormData({
            title: program.title,
            desc: program.desc,
            button: program.button,
            image: program.image,
            imagePos: program.imagePos,
            id: program.id,
            Program_points: program.Program_points,
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

    const fetchPrograms = useCallback(async () => {
        try {
            const { data, error }: { data: Program[] | null; error: PostgrestError | null } =
                await supabase.from('Programs').select('*').order('id', { ascending: true });

            if (error) {
                throw error;
            }

            if (data) {
                setPrograms(data);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error fetching programs: ' + error.message });
        }
    }, [supabase]);

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            if (file) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`Programs/${formData.id}.jpg`, file);

                if (uploadError) {
                    throw uploadError;
                }

                const fileUrl = supabase.storage.from('images').getPublicUrl(`Programs/${formData.id}.jpg`).data?.publicUrl;

                // Check if program with this title already exists
                const { data: existingProgram, error: fetchError } = await supabase
                    .from('Programs')
                    .select('*')
                    .eq('title', formData.title)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') {
                    throw fetchError;
                }

                if (existingProgram) {
                    // Program with this title already exists, update it
                    const { error: updateError } = await supabase
                        .from('Programs')
                        .update({ ...formData, image: fileUrl })
                        .eq('title', formData.title);

                    if (updateError) {
                        throw updateError;
                    } else {
                        fetchPrograms();
                        setMessage({ type: 'success', text: 'Program updated successfully!' });
                    }
                } else {
                    // Program with this title does not exist, insert new
                    const { error: insertError } = await supabase
                        .from('Programs')
                        .insert([{ ...formData, image: fileUrl }]);

                    if (insertError) {
                        throw insertError;
                    } else {
                        fetchPrograms();
                        setMessage({ type: 'success', text: 'New program added successfully!' });
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

    if (!programs.length) {
        return (
            <Container className="h-screen flex flex-col justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        );
    }

    return (
        <PageContent
            programs={programs}
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
