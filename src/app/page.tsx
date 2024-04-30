"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    router.replace('/01-colorflipper');
    return <p className="text-xl font-semibold">Loading...</p>;
}
