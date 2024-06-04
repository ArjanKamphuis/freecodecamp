"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { useInterval } from "usehooks-ts";

export default function WhacAMole(): React.JSX.Element {
    const [score, setScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [mole, setMole] = useState<number>(-1);

    const playing = useMemo((): boolean => {
        return timeLeft > 0;
    }, [timeLeft]);

    const onSquareClick = useCallback((squareId: number): void => {
        if (!playing) return;
        if (squareId === mole) {
            setScore(s => s + 1);
            setMole(-1);
        }
    }, [mole, playing]);

    const onPlayClick = useCallback((): void => {
        if (playing) return;
        setTimeLeft(60);
        setScore(0);
        setMole(-1);
    }, [playing]);

    useInterval((): void => {
        setTimeLeft(t => t - 1);
    }, playing ? 1000 : null);

    useInterval((): void => setMole(m => {
        let newMole: number = m;
        while (newMole === m) newMole = Math.floor(Math.random() * 9);
        return newMole;
    }), playing ? 500 : null);

    const squares = useMemo((): React.JSX.Element[] => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(id => {
            const classes: string = `w-52 h-52 border border-black${mole === id ? ' bg-[url("/mole.jpg")] bg-cover' : ''}`;
            return <div key={id} className={classes} onClick={() => onSquareClick(id)}></div>;
        });
    }, [mole, onSquareClick]);

    return (
        <section className="w-[624px] text-center">
            <h2 className="text-4xl font-bold mb-6">Whac a Mole</h2>
            <div className="flex justify-between items-center px-4">
                <div>
                    <h3 className="text-xl font-semibold">Your score: {score}</h3>
                    <h3 className="text-xl font-semibold">Time Left: {timeLeft}</h3>
                </div>
                {!playing && <div className="flex space-x-2 items-center">
                    <p className="text-xl font-semibold">Time&apos;s up</p>
                    <Button style="dark" onClick={onPlayClick}>Play</Button>
                </div>}
            </div>
            <div className="flex flex-wrap relative">{squares}</div>
        </section>
    );
}
