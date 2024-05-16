"use client";

import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

type Sector = { index: number, id: string, flashColor: string, defaultColor: string };
type GameState = 'off' | 'idle' | 'computer' | 'playing' | 'win' | 'lose';

const NUM_ROUNDS = 20;

const sectors: Sector[] = [
    { index: 0, id: 'topleft', flashColor: 'lightgreen', defaultColor: 'darkgreen' },
    { index: 1, id: 'topright', flashColor: 'tomato', defaultColor: 'darkred' },
    { index: 2, id: 'bottomright', flashColor: 'lightskyblue', defaultColor: 'darkblue' },
    { index: 3, id: 'bottomleft', flashColor: 'yellow', defaultColor: 'goldenrod' }
];

export default function SimonGame(): React.JSX.Element {
    const [gameState, setGameState] = useState<GameState>('off');
    const [strictMode, setStrictMode] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(0);
    const [order, setOrder] = useState<number[]>([]);
    const [playerOrder, setPlayerOrder] = useState<number[]>([]);

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    const turnOn = useCallback((): void => {
        setStrictMode(false);
        setOrder([]);
        setPlayerOrder([]);
        setGameState('idle');
    }, []);
    const turnOff = useCallback((): void => {
        dimAllSectors();
        clearInterval(intervalIdRef.current!);
        setGameState('off');
    }, []);

    const getDisplayContent = useCallback((): string => {
        switch (gameState) {
            case 'off': return '';
            case 'idle': return '-';
            case 'win': return 'WIN';
            case 'lose': return 'NO';
            default: return level.toString();
        }
    }, [gameState, level]);

    // computer turn
    useEffect(() => {
        if (gameState !== 'computer') return;

        let currentComputerTurn = 0;

        intervalIdRef.current = setInterval(() => {
            if (currentComputerTurn === level) {
                setGameState('playing');
                clearInterval(intervalIdRef.current!);
            } else {
                setTimeout(() => flash(order[currentComputerTurn++]), 200);
            }
        }, 800);

        return (): void => {
            clearInterval(intervalIdRef.current!);
        };

    }, [order, level, gameState]);

    // player turn
    const handleSectorClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
        if (!(gameState === 'idle' || gameState === 'playing')) return;

        let valid = true;
        let won = false;

        if (gameState === 'playing') {
            const sectorIndex: number = sectors.find(sector => sector.id === e.currentTarget.id)!.index;
            const newPlayerOrder = [...playerOrder, sectorIndex];
            setPlayerOrder(newPlayerOrder);

            if (order[newPlayerOrder.length - 1] !== newPlayerOrder[newPlayerOrder.length - 1]) {
                valid = false;
                setGameState('lose');
                setPlayerOrder([]);
                if (strictMode) {
                    setOrder(getRandomOrder());
                    setLevel(1);
                }
                setTimeout(() => setGameState('computer'), 800);
            } else if (newPlayerOrder.length === order.length) {
                won = true;
                setGameState('win');
            }

            if (valid && !won && newPlayerOrder.length === level) {
                setPlayerOrder([]);
                setLevel(t => t + 1);
                setGameState('computer');
            }
        }

        flash(-1, e.currentTarget, valid);
        if (won) setTimeout(lightAllSectors, 400);
    }, [gameState, level, order, playerOrder, strictMode]);

    const handlePlayClick = useCallback((): void => {
        if (!(gameState === 'win' || gameState === 'idle')) return;
        dimAllSectors();
        setPlayerOrder([]);
        setLevel(1);
        setOrder(getRandomOrder());
        setGameState('computer');
    }, [gameState]);

    const handleStrictClick = useCallback((): void => {
        if (gameState === 'off') return;
        setStrictMode(m => !m);
    }, [gameState]);

    const sectorList = useMemo((): React.JSX.Element[] => sectors.map(sector => {
        return (
            <div key={sector.index} id={sector.id} onClick={handleSectorClick} data-flash={sector.flashColor}>
                <audio><source src={`https://s3.amazonaws.com/freecodecamp/simonSound${sector.index + 1}.mp3`} /></audio>
            </div>
        );
    }), [handleSectorClick]);

    return (
        <section id="simon-app">
            <div id="outer-circle">
                {sectorList}
                <div id="inner-circle">
                    <div id="inner-circle-container">
                        <div id="title" className="font-effect-emboss">SIMON!</div>
                        <div id="switches">
                            <div className={`led toggle${gameState === 'off' ? '' : ' on'}`} onClick={gameState === 'off' ? turnOn : turnOff}></div>
                            <button className="button" id="start" onClick={handlePlayClick}>Start</button>
                            <div className={`led toggle${strictMode ? ' on' : ''}`} onClick={handleStrictClick}></div>
                        </div>
                        <div className="text1">
                            <span>POWER</span><span>STRICT</span>
                        </div>
                        <div id="level">{getDisplayContent()}</div>
                        <div className="text2">LEVEL</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const getRandomOrder = (): number[] => {
    const order: number[] = [];
    for (let i = 0; i < NUM_ROUNDS; i++) {
        order.push(Math.floor(Math.random() * 4));
    }
    return order;
};

const dimAllSectors = (): void => {
    sectors.forEach(sector => document.getElementById(sector.id)!.style.backgroundColor = sector.defaultColor);
};
const lightAllSectors = (): void => {
    sectors.forEach(sector => document.getElementById(sector.id)!.style.backgroundColor = sector.flashColor);
}

const flash = (index: number, element?: HTMLElement, playSound: boolean = true): void => {
    element = element || document.getElementById(sectors.find(sector => sector.index === index)!.id)!;
    element.style.backgroundColor = element.dataset.flash!;
    if (playSound) {
        const audioElement: HTMLAudioElement = element.firstElementChild as HTMLAudioElement;
        audioElement.currentTime = 0;
        audioElement.play();
    }
    setTimeout(dimAllSectors, 300);
};
