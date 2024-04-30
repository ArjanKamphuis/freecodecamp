import Link from "next/link";
import React from "react";

type NavigationLink = {
    id: number;
    text: string;
    link: string;
};

const navigationList: NavigationLink[] = [
    { id: 0, text: 'Color Flipper', link: '/01-colorflipper' },
];

const listItems: React.JSX.Element[] = navigationList.map(nav => {
    return (
        <li key={nav.id} className=" text-blue-500 hover:text-blue-600 hover:underline font-medium">
            <Link href={nav.link}>{nav.id + 1}. {nav.text}</Link>
        </li>
    )
});

export const NavigationList = React.memo(() => {
    return <ul>{listItems}</ul>;
});
NavigationList.displayName = 'NavigationList';
