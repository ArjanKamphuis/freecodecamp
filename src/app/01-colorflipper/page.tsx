"use client";

import React from "react";
import { Button } from "../components/Button";

type ColorFlipperVersion = 'Simple' | 'Hex';

const defaultBgColor: string = '#FFFFFF';
const colors: string[] = ["green", "red", "rgba(133,122,200)", "#f15025"];
const hex: (string | number)[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

export default function ColorFlipper(): React.JSX.Element {
    const [version, setVersion] = React.useState<ColorFlipperVersion>('Hex');
    const [currentBgColor, setCurrentBgColor] = React.useState<string>(defaultBgColor);

    const handleColorClick = React.useCallback(() => {
        let randomColor: string = '';
        if (version === 'Simple') {
            randomColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            randomColor += '#';
            for (let i = 0; i < 6; i++) {
                randomColor += hex[Math.floor(Math.random() * hex.length)];
            }
        }
        setCurrentBgColor(randomColor);
    }, [version]);

    React.useEffect(() => {
        const btn = document.getElementById('btn');
        btn?.addEventListener('click', handleColorClick);
        
        document.body.style.backgroundColor = currentBgColor;

        return (): void => {
            btn?.removeEventListener('click', handleColorClick);
            document.body.style.backgroundColor = defaultBgColor;
        };
    }, [currentBgColor, handleColorClick]);

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Color Flipper | {version}</h2>
                <div className="flex space-x-2 items-center">
                    <Button onClick={() => setVersion('Simple')} disabled={version === 'Simple'}>Simple</Button>
                    <Button onClick={() => setVersion('Hex')} disabled={version === 'Hex'}>Hex</Button>
                </div>
            </div>
            <div className="w-fit mx-auto mt-4">
                <p className="text-2xl font-bold bg-black text-white p-3 mb-4 rounded-lg">Background Color : <span className="color text-pink-300">{currentBgColor}</span></p>
                <div className="text-center">
                    <Button id="btn" style="dark">Click Me!</Button>
                </div>
            </div>
        </>
    )
}
