"use client";

import Link from "next/link";
import React, { ReactNode, memo, useMemo, useState } from "react";

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
    { id: 19, text: 'Flappy Bird', link: '/20-flappy-bird' },
    { id: 20, text: 'Memory Game', link: '/21-memory' },
    { id: 21, text: 'Whac a Mole', link: '/22-mole' },
    { id: 22, text: 'Connect Four', link: '/23-connect-four' },
    { id: 23, text: 'Snake Game', link: '/24-snake' },
    { id: 24, text: 'Space Invaders', link: '/25-space-invaders' },
    { id: 25, text: 'Frogger Game', link: '/26-frogger' },
    { id: 26, text: 'Tetris', link: '/27-tetris' },
    { id: 27, text: 'Tic-Tac-Toe', link: '/28-tic-tac-toe' },
    { id: 28, text: 'Tetris with React Hooks', link: '/29-tetris' },
    { id: 29, text: 'Birthday Reminder', link: '/30-birthday' },
    { id: 30, text: 'Tours', link: '/31-tours' },
    { id: 31, text: 'Accordion', link: '/32-accordion' },
    { id: 32, text: 'Tabs for Portfolio', link: '/33-portfolio' },
    { id: 33, text: 'Image Slider', link: '/34-slider' }
];

type NavButtonProps = {
    children: ReactNode;
    active: boolean;
    onClick: () => void;
};

const NavButton = memo(({ children, active, onClick }: NavButtonProps): React.JSX.Element => {
    let classes: string = 'text-gray-800 border border-blue-500 rounded-xl py-1 px-2';
    classes += `${active ? ' bg-blue-500 text-white border-gray-800 hover:bg-blue-600 active:bg-blue-700' : ' hover:bg-gray-100 active:bg-gray-200'}`;
    return (
        <button className={classes} onClick={onClick}>{children}</button>
    );
});
NavButton.displayName = 'NavButton';

export const NavigationList = React.memo(() => {
    const [listOffset, setListOffset] = useState<number>(0);
    const pageSize: number = 10;

    const list = useMemo((): React.JSX.Element[] => {
        return navigationList.filter(item => item.id >= listOffset && item.id < listOffset + pageSize).map(item => {
            return (
                <li key={item.id} className=" text-blue-500 hover:text-blue-600 hover:underline font-medium">
                    <Link href={item.link}>{item.id + 1}. {item.text}</Link>
                </li>
            );
        });
    }, [listOffset]);

    return (
        <nav className="w-1/4 border-r border-black p-4 space-y-2">
            <h2 className="text-xl font-semibold">Projects:</h2>
            <div className="flex justify-between">
                <NavButton active={listOffset === 0} onClick={() => setListOffset(0)}>1-10</NavButton>
                <NavButton active={listOffset === 10} onClick={() => setListOffset(10)}>11-20</NavButton>
                <NavButton active={listOffset === 20} onClick={() => setListOffset(20)}>21-30</NavButton>
                <NavButton active={listOffset === 30} onClick={() => setListOffset(30)}>31-40</NavButton>
            </div>
            <ul>{list}</ul>
        </nav>
    );
});
NavigationList.displayName = 'NavigationList';
