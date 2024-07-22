"use client"

import Header from "@/app/components/Header";
import { useState } from 'react';
import {useRouter} from 'next/navigation';

export default function Create({ params }: { params: { id: number } }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startingPrice: '',
        image: null as File | null,
        userId: params.id,
    });

    const handleChange = (e: any) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'image' ? files?.[0] || null : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                formDataToSend.append(key, value as any);
            }
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className="container md:max-w-2xl mt-20 px-4 mx-auto">
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Create Auction</h2>
                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Title</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <input type="text" required={true} name="title" value={formData.title} onChange={handleChange} autoComplete="given-name"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Description</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <textarea required={true} name="description" value={formData.description} onChange={handleChange}
                                              className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"></textarea>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Enter a description.</p>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="startingPrice" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Starting Price</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <input type="number" required={true} name="startingPrice" value={formData.startingPrice} onChange={handleChange} autoComplete="off"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                                <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">File Upload</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd"></path>
                                            </svg>
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="image" type="file" onChange={handleChange} className="sr-only"/>
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-600">Publish Auction</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
