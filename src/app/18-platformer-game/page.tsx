"use client";

import Link from "next/link";

type PlatformerPart = {
    text: string;
    link: string;
}
const platformerParts: PlatformerPart[] = [
    { text: 'Setup & Changing Background', link: '/01' },
    { text: 'World & Player', link: '/02' },
    { text: 'TileSheet Background', link: '/03' },
    { text: 'Collision Detection', link: '/04' },
    { text: 'Animated Sprite', link: '/05' },
    { text: 'Loading Levels', link: '/06' },
    { text: 'Collecting Items', link: '/07' }
];

export default function PlatformerGame(): React.JSX.Element {
    const list: React.JSX.Element[] = platformerParts.map((item) => {
        return (
            <li key={item.link} className="text-blue-500 flex items-center space-x-2 justify-center">
                <span>&#x26F9;</span>
                <Link className="hover:underline text-xl font-semibold" href={`/18-platformer-game/${item.link}`}>{item.text}</Link>
            </li>
        );
    });

    return (
        <section className="text-center">
            <h2 className="text-4xl font-bold mb-2">Platformer Game</h2>
            <ul>{list}</ul>
        </section>
    );
}
