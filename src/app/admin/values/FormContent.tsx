import { Value } from '@/types';
import React from 'react';


type FormSectionProps = {
    formData: Value;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    message: {
        type: "success" | "error";
        text: string;
    } | null
};

const FormSection: React.FC<FormSectionProps> = ({ formData, onChange, handleSubmit, isSubmitting, message }) => {
    const { title, description, icon } = formData;

    return (
        <div className="w-full grid grid-cols-1">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form className="py-6 px-9" onSubmit={handleSubmit}>
                            {/* Title input */}
                            <div className="mb-5">
                                <label
                                    htmlFor="title"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Title text:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={title || ''}
                                    readOnly
                                />
                            </div>

                            {/* Description textarea */}
                            <div className="mb-5">
                                <label
                                    htmlFor="desc"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={description || ''}
                                    onChange={onChange}
                                />
                            </div>

                            {/* Icon input */}
                            <div className="mb-5">
                                <label
                                    htmlFor="icon"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Icon:
                                </label>
                                <input
                                    type="text"
                                    name="icon"
                                    id="icon"
                                    placeholder="Icon"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={icon || ''}
                                    readOnly
                                />
                            </div>

                            {/* Submit button */}
                            <div>
                                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                            {message && (
                                <div className={`mt-4 p-4 rounded text-center ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {message.text}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormSection;
