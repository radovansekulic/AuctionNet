"use client"

import {useState} from "react";
import {useRouter} from 'next/navigation';
import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, formData);
            console.log('Registration successful:', response.data);
            router.push('/login')
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center mt-20 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto"
                     src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                     alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your
                    account now</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <div className="mt-2">
                            <input value={formData.name} onChange={handleChange} name="name" type="text"
                                   autoComplete="name" placeholder="Nickname" required
                                   className="block w-full rounded-md border-0 mb-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">
                            <input value={formData.email} onChange={handleChange} name="email" type="email"
                                   autoComplete="email" placeholder="Email address"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">
                            <input value={formData.password} onChange={handleChange} name="password" type="password"
                                   autoComplete="current-password"
                                   placeholder="Password" required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <Link href={"/login"} className="font-semibold leading-6 text-green-600 hover:text-green-500"> Log
                        In</Link>
                </p>
            </div>
        </div>
    )
}