
import React from 'react'
import Image from 'next/image'


const page = () => {
    return (
        <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                            <div className="flex items-center justify-center p-12">
                                
                                <div className="mx-auto w-full max-w-[550px] bg-white">
                                    <form
                                        className="py-6 px-9"
                                        action="https://formbold.com/s/FORM_ID"
                                        method="POST"
                                    >
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
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                htmlFor="paragraph"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Paragraph:
                                            </label>
                                            <textarea
                                                name="paragraph"
                                                id="paragraph"
                                                placeholder="Description"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                htmlFor="link"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Link text:
                                            </label>
                                            <input
                                                type="text"
                                                name="link"
                                                id="link"
                                                placeholder="https://"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div className="mb-6 pt-4">
                                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                                Upload File
                                            </label>

                                            <div className="mb-8">
                                                <input type="file" name="file" id="file" className="sr-only" />
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
                                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page