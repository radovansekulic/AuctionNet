"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Auctions from "@/app/components/Auctions";

export default function Home() {
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data);
                localStorage.setItem("userData", JSON.stringify(data));
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchUserData();
    }, [setUserData]);


    return (
        <div className="bg-white">
            {token ? (
                <>
                    <Header />
                    <Auctions />
                </>
            ) : (
                <>
                    <header className="absolute inset-x-0 top-0 z-50">
                        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                             aria-label="Global">
                            <div className="flex lg:flex-1">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img className="h-8 w-auto"
                                         src="https://tailwindui.com/img/logos/mark.svg?color=green&amp;shade=600"
                                         alt=""/>
                                </a>
                            </div>
                            <div className="flex lg:hidden">
                                <button type="button"
                                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="hidden lg:flex lg:gap-x-12">
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Product</a>
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Features</a>
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Company</a>
                            </div>
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <Link href={"/login"} className="text-sm font-semibold leading-6 text-gray-900">Log
                                    in <span
                                        aria-hidden="true">→</span></Link>
                            </div>
                        </nav>
                        {/* Mobile menu, show/hide based on menu open state. */}
                        <div className="hidden" role="dialog" aria-modal="true">
                            {/* Background backdrop, show/hide based on slide-over state. */}
                            <div className="fixed inset-0 z-50"></div>
                            <div
                                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <a href="#" className="-m-1.5 p-1.5">
                                        <span className="sr-only">Your Company</span>
                                        <img className="h-8 w-auto"
                                             src="https://tailwindui.com/img/logos/mark.svg?color=green&amp;shade=600"
                                             alt=""/>
                                    </a>
                                    <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                             stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            <a href="#"
                                               className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
                                            <a href="#"
                                               className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                                            <a href="#"
                                               className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
                                            <a href="#"
                                               className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
                                        </div>
                                        <div className="py-6">
                                            <a href="#"
                                               className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                                                in</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div className="relative isolate">
                            <svg
                                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                                aria-hidden="true">
                                <defs>
                                    <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%"
                                             y="-1"
                                             patternUnits="userSpaceOnUse">
                                        <path d="M.5 200V.5H200" fill="none"></path>
                                    </pattern>
                                </defs>
                                <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                                    <path
                                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                        strokeWidth="0"></path>
                                </svg>
                                <rect width="100%" height="100%" strokeWidth="0"
                                      fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"></rect>
                            </svg>
                            <div
                                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                                aria-hidden="true">
                                <div
                                    className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-green-200 to-green-500 opacity-30"
                                    style={{clipPath: 'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)'}}></div>
                            </div>
                            <div className="overflow-hidden">
                                <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                                    <div
                                        className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                        <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                                Discover Exclusive Auction Deals Now
                                            </h1>
                                            <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">Cupidatat
                                                minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit
                                                aute
                                                velit. Et labore commodo nulla aliqua proident mollit ullamco
                                                exercitation
                                                tempor. Sint aliqua anim nulla sunt mollit id pariatur in voluptate
                                                cillum.</p>
                                            <div className="mt-10 flex items-center gap-x-6">
                                                <Link href={"/register"}
                                                      className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                                    Create Account
                                                </Link>
                                                <Link href={"/register"}
                                                      className="text-sm font-semibold leading-6 text-gray-900">Learn
                                                    more <span
                                                        aria-hidden="true">→</span></Link>
                                            </div>
                                        </div>
                                        <div
                                            className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                            <div
                                                className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                                <div className="relative">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80"
                                                        alt=""
                                                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"/>
                                                    <div
                                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                                </div>
                                            </div>
                                            <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                                <div className="relative">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80"
                                                        alt=""
                                                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"/>
                                                    <div
                                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                                </div>
                                                <div className="relative">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=.4&amp;w=396&amp;h=528&amp;q=80"
                                                        alt=""
                                                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"/>
                                                    <div
                                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                                </div>
                                            </div>
                                            <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                                <div className="relative">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;crop=left&amp;w=400&amp;h=528&amp;q=80"
                                                        alt=""
                                                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"/>
                                                    <div
                                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                                </div>
                                                <div className="relative">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80"
                                                        alt=""
                                                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"/>
                                                    <div
                                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </div>
    )
}