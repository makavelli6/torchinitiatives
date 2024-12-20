'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Container } from '@/components/Container';
import { PostgrestError } from '@supabase/supabase-js';
import PageContent from './PageContent';
import { TeamMember } from '@/types';
import Spinner from '@/components/Spinner';

const Page = () => {
    const [teams, setTeams] = useState<TeamMember[]>([]);
    const [formData, setFormData] = useState<TeamMember>({
        title: '',
        description: '',
        imageSrc: '',
        id: 0,
        name: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const supabase = createClient();

    const handleEdit = (team: TeamMember): void => {
        setFormData({
            title: team.title,
            description: team.description,
            imageSrc: team.imageSrc,
            id: team.id,
            name: team.name,
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

    const fetchTeams = useCallback(async () => {
        try {
            const { data, error }: { data: TeamMember[] | null; error: PostgrestError | null } =
                await supabase.from('Team').select('*').order('id', { ascending: true });

            if (error) {
                throw error;
            }

            if (data) {
                setTeams(data);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error fetching teams: ' + error.message });
        }
    }, [supabase]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            if (file) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`Team/${formData.id}.jpg`, file);

                if (uploadError) {
                    throw uploadError;
                }

                const fileUrl = supabase.storage.from('images').getPublicUrl(`Team/${formData.id}.jpg`).data?.publicUrl;

                // Check if team member with this title already exists
                const { data: existingTeam, error: fetchError } = await supabase
                    .from('Team')
                    .select('*')
                    .eq('title', formData.title)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') {
                    throw fetchError;
                }

                if (existingTeam) {
                    // Team member with this title already exists, update it
                    const { error: updateError } = await supabase
                        .from('Team')
                        .update({ ...formData, imageSrc: fileUrl })
                        .eq('title', formData.title);

                    if (updateError) {
                        throw updateError;
                    } else {
                        fetchTeams();
                        setMessage({ type: 'success', text: 'Team member updated successfully!' });
                    }
                } else {
                    // Team member with this title does not exist, insert new
                    const { error: insertError } = await supabase
                        .from('Team')
                        .insert([{ ...formData, imageSrc: fileUrl }]);

                    if (insertError) {
                        throw insertError;
                    } else {
                        fetchTeams();
                        setMessage({ type: 'success', text: 'New team member added successfully!' });
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

    if (!teams.length) {
        return (
            <Container className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        );
    }

    return (
        <PageContent
            teams={teams}
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
