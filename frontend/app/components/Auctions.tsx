"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Auctions() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getAll`);
                setData(response.data);
            } catch (err) {
                setError(err);
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto md:w-[40%] mt-20 px-4">
            {data.map((item) => (
                <div key={item["id"]} className="border shadow-sm rounded-2xl p-4 mb-4">
                    <Link href={`/items/${item["id"]}`}>
                        <h1 className="text-xl mb-2">{item["title"]}</h1>
                        <div className="flex items-baseline">
                            <p className="text-xl mb-5 me-2">🤝 {item["startingPrice"]}$</p>
                            <button className="bg-rose-500 text-white px-4">View Auction</button>
                        </div>
                        <p className="mb-10 border-s ps-2">{item["description"]}</p>
                        <img className="object-cover mt-2 w-full"
                             src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item["image"]}`} alt={item["title"]}/>
                    </Link>
                </div>
            ))}
        </div>
    );
}
