'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Container } from '@/components/Container';
import { PostgrestError } from '@supabase/supabase-js';
import PageContent from './PageContent';
import { Value } from '@/types';
import Spinner from '@/components/Spinner';

const Page = () => {
    const [values, setValues] = useState<Value[]>([]);
    const [formData, setFormData] = useState<Value>({ title: '', description: '', icon: '', id: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const supabase = createClient();

    const handleEdit = (value: Value): void => {
        setFormData({
            title: value.title,
            description: value.description,
            icon: value.icon,
            id: value.id,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchValues = useCallback(async () => {
        try {
            const { data, error }: { data: Value[] | null, error: PostgrestError | null } = await supabase
                .from('Values')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                throw error;
            }

            if (data) {
                setValues(data);
                
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error fetching values: ' + error.message });
        }
    }, [supabase]);

    useEffect(() => {
        fetchValues();
    }, [fetchValues]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const { data: existingValue, error: fetchError } = await supabase
                .from('Values')
                .select('*')
                .eq('title', formData.title)
                .single();

            if (fetchError) {
                throw fetchError;
            }

            if (existingValue) {
                const { error: updateError } = await supabase
                    .from('Values')
                    .update({ description: formData.description, icon: formData.icon })
                    .eq('title', formData.title);

                if (updateError) {
                    throw updateError;
                } else {
                    setMessage({ type: 'success', text: 'Updated' });
                    fetchValues();
                }
            } else {
                const { error: insertError } = await supabase
                    .from('Values')
                    .insert([{ title: formData.title, description: formData.description, icon: formData.icon }]);

                if (insertError) {
                    throw insertError;
                } else {
                    fetchValues();
                }
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error submitting form: ' + error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!values.length) {
        return (
            <Container className="flex flex-col h-screen justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        );
    }

    return (
        <>

            <PageContent
                values={values}
                onEdit={handleEdit}
                formData={formData}
                onChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                message={message}
            />
            
        </>
    );
};

export default Page;
