"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import {useRouter} from 'next/navigation';

export default function Item({ params }: { params: { id: number } }) {
    const [data, setData] = useState([]);
    const [bids, setBids] = useState([]);
    const [error, setError] = useState(null);
    const [priceInput, setPriceInput] = useState('');
    const [userData, setUserData] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseItems = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/item/${params.id}`);
                setData(responseItems.data);
                const responseBids = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getBindings/${params.id}`);
                setBids(responseBids.data);
            } catch (err) {
                setError(err);
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [params.id]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            try {
                const parsedUserData = JSON.parse(storedUserData);
                setUserData(parsedUserData);
            } catch (error) {
                console.error('Failed to parse userData:', error);
            }
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/createBid`, {
                itemId: params.id,
                userName: userData.name,
                price: priceInput,
            });
            location.reload()
            console.log("Bid submitted successfully:", response.data);
        } catch (err) {
            setError(err);
            console.error("Failed to submit bid:", err);
        }
    };

    const handlePriceChange = (event: any) => {
        setPriceInput(event.target.value);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto md:w-[40%] mt-20 px-4">
                {data.map((item) => (
                    <div key={item["id"]} className="border shadow-sm rounded-2xl p-4 mb-4">
                        <h1 className="text-xl mb-2">{item["title"]}</h1>
                        <div className="flex items-baseline">
                            <p className="text-xl mb-5 me-2">🤝 {item["startingPrice"]}$</p>
                        </div>
                        <p className="mb-10 border-s ps-2">{item["description"]}</p>
                        <div className="my-10">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Give Price
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <form onSubmit={handleSubmit} className="flex gap-5">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        name="price"
                                        type="number"
                                        placeholder="0.00"
                                        required={true}
                                        onChange={handlePriceChange}
                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    />
                                    <input className="px-5 border cursor-pointer" type="submit" value="Submit" />
                                </form>
                            </div>
                            <div className="my-5">
                                {bids.map((item, index) => (
                                    <>
                                        <p className="text-xl"><span>{index + 1}. </span><u>{item["userName"]}</u>: {item["price"]}$</p>
                                    </>
                                ))}
                            </div>
                        </div>
                        <img
                            className="object-cover mt-2 w-full"
                            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item["image"]}`}
                            alt={item["title"]}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
