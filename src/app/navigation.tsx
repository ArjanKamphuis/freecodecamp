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
    { id: 5, text: 'Modal', link: '/06-modal' },
    { id: 6, text: 'Questions', link: '/07-questions' },
    { id: 7, text: 'Menu', link: '/08-menu' },
    { id: 8, text: 'Video', link: '/09-video' },
    { id: 9, text: 'Scroll', link: '/10-scroll' },
    { id: 10, text: 'Tabs', link: '/11-tabs' },
    { id: 11, text: 'Countdown Timer', link: '/12-countdown-timer' },
    { id: 12, text: 'Lorem Ipsum', link : '/13-lorem-ipsum' },
    { id: 13, text: 'Grocery Bud', link: '/14-grocery-bud' },
    { id: 14, text: 'Slider', link: '/15-slider' },
    { id: 15, text: 'Rock Paper Scissors', link: '/16-rock-paper-scissors' },
    { id: 16, text: 'Simon Game', link: '/17-simon-game' },
    { id: 17, text: 'Platformer Game', link: '/18-platformer-game' },
    { id: 18, text: 'Doodle Jump', link: '/19-doodle-jump' },
    { id: 19, text: 'Flappy Bird', link: '/20-flappy-bird' }
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
