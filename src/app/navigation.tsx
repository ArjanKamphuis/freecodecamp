import Link from "next/link";
import React from "react";

type NavigationLink = {
    id: number;
    text: string;
    link: string;
};

const navigationList: NavigationLink[] = [
    { id: 0, text: 'Color Flipper', link: '/01-colorflipper' },
    { id: 1, text: 'Counter', link: '/02-counter' },
    { id: 2, text: 'Reviews', link: '/03-reviews' },
    { id: 3, text: 'Navigation Bar', link: '/04-navbar' },
    { id: 4, text: 'Sidebar', link: '/05-sidebar' },
    { id: 5, text: 'Modal', link: '/06-modal' }
];

const listItems: React.JSX.Element[] = navigationList.map(item => {
    return (
        <li key={item.id} className=" text-blue-500 hover:text-blue-600 hover:underline font-medium">
            <Link href={item.link}>{item.id + 1}. {item.text}</Link>
        </li>
    );
});

export const NavigationList = React.memo(() => {
    return <ul>{listItems}</ul>;
});
NavigationList.displayName = 'NavigationList';
