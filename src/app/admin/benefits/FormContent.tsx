import { Benefit } from '@/types';
import React from 'react';


type FormSectionProps = {
    formData: Benefit;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    isSubmitting: boolean;
    message: {
        type: "success" | "error";
        text: string;
    } | null
};

const FormSection: React.FC<FormSectionProps> = ({ formData, onChange, handleFileChange, handleSubmit,file,isSubmitting,message }) => {
    const { title, desc, button, imagePos } = formData;

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
                                    placeholder="Welcome to..."
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={title || ''}
                                    onChange={onChange}
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
                                    name="desc"
                                    id="desc"
                                    placeholder="Description"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={desc || ''}
                                    onChange={onChange}
                                />
                            </div>
                            
                            {/* Button text input */}
                            <div className="mb-5">
                                <label
                                    htmlFor="link"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Button text:
                                </label>
                                <select
                                    name="button"
                                    id="button"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={button.toString()} // Convert the 'button' value to a string
                                    onChange={onChange} // This should handle the change in selection
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>

                            {/* Position input */}
                            <div className="mb-5">
                                <label
                                    htmlFor="link"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Position:
                                </label>
                                <select
                                    name="imagePos"
                                    id="imagePos"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={imagePos} // Convert the 'button' value to a string
                                    onChange={onChange} // This should handle the change in selection
                                >
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>

                            {/* Approach Image file input */}
                            <div className="mb-6 pt-4">
                                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                    Benefit Image
                                </label>
                                <div className="mb-8">
                                    <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} />
                                    <label
                                        htmlFor="file"
                                        className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                                    >
                                        <div>
                                            {/* Display selected file name or default message */}
                                            <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                {file ? file.name : 'Drop files here'}
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
