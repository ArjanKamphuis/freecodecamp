"use client";

import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { Button } from "../components/Button";
import { useEventListener, useInterval } from "usehooks-ts";

const GRID_WIDTH = 9 as const;
const GRID_HEIGHT = 9 as const;
const GRID_SIZE: number = GRID_WIDTH * GRID_HEIGHT;
const gridStyle: CSSProperties = {
    width: `${GRID_WIDTH * 40 + 2}px`,
    height: `${GRID_HEIGHT * 40 + 2}px`
};

type CellContent = 'empty' | 'frog' | 'start' | 'end' | 'car' | 'road' | 'log' | 'water';
type Cell = {
    index: number;
    content: CellContent
};

type GameState = 'idle' | 'playing' | 'win' | 'lose';

export default function Frogger(): React.JSX.Element {
    const [grid, setGrid] = useState<Cell[]>(initialGrid);
    const [frog, setFrog] = useState<number>(-1);
    const [logs, setLogs] = useState<number[]>(initialLogs);
    const [water, setWater] = useState<number[]>(initialWater);
    const [cars, setCars] = useState<number[]>(initialCars);
    const [road, setRoad] = useState<number[]>(initialRoad);
    const [timeLeft, setTimeLeft] = useState<number>(20);
    const [gameState, setGameState] = useState<GameState>('idle');

    const documentRef = useRef<Document>(null);

    const renderGrid = useCallback((): void => {
        setGrid(grid => grid.map(cell => {
            return { ...cell, content: getCellContent(cell.index, frog, logs, water, cars, road) };
        }));
    }, [cars, frog, logs, road, water]);

    const animateObjects = useCallback((): void => {
        setCars(cars => cars.map(car => (car >= GRID_WIDTH * 5 && car < GRID_WIDTH * 6) ? moveLeft(car) : moveRight(car)));
        setRoad(road => road.map(piece => (piece >= GRID_WIDTH * 5 && piece < GRID_WIDTH * 6) ? moveLeft(piece) : moveRight(piece)));

        setLogs(logs => logs.map(log => {
            if (log >= GRID_WIDTH * 2 && log < GRID_WIDTH * 3) {
                if (log === frog) setFrog(moveLeft(frog));
                return moveLeft(log);
            }
            if (log === frog) setFrog(moveRight(frog));
            return moveRight(log);
        }));
        
        setWater(water => water.map(puddle => {
            if (puddle >= GRID_WIDTH * 2 && puddle < GRID_WIDTH * 3) {
                if (puddle === frog) setFrog(moveLeft(frog));
                return moveLeft(puddle);
            }
            if (puddle === frog) setFrog(moveRight(frog));
            return moveRight(puddle);
        }));
    }, [frog]);

    const checkResult = useCallback((): void => {
        if (water.includes(frog) || cars.includes(frog) || timeLeft <= 0) setGameState('lose');
        else if (frog === initialEndIndex) setGameState('win');
    }, [cars, frog, timeLeft, water]);

    const onKeyboardUp = useCallback((e: KeyboardEvent): void => {
        if (gameState !== 'playing') return;
        let newFrogIndex: number = frog;
        switch (e.code) {
            case 'ArrowLeft':
                if (frog % GRID_WIDTH > 0) newFrogIndex--;
                break;
            case 'ArrowRight':
                if (frog % GRID_WIDTH < GRID_WIDTH - 1) newFrogIndex++;
                break;
            case 'ArrowUp':
                if (frog - GRID_WIDTH >= 0) newFrogIndex -= GRID_WIDTH;
                break;
            case 'ArrowDown':
                if (frog + GRID_WIDTH < GRID_SIZE) newFrogIndex += GRID_WIDTH;
                break;
        }
        if (newFrogIndex !== frog) {
            setFrog(newFrogIndex);
        }
    }, [frog, gameState]);

    const handleBtnClick = useCallback((): void => {
        if (gameState === 'playing') setGameState('idle');
        else {
            setGrid(initialGrid);
            setFrog(initialStartIndex);
            setLogs(initialLogs);
            setWater(initialWater);
            setCars(initialCars);
            setRoad(initialRoad);
            setTimeLeft(20);
            setGameState('playing');
        }
    }, [gameState]);

    useEventListener('keyup', onKeyboardUp, documentRef);
    useInterval(renderGrid, 1000 / 30);
    useInterval(animateObjects, gameState !== 'idle' ? 1000 : null);
    useInterval(checkResult, gameState === 'playing' ? 100 : null);
    useInterval(() => setTimeLeft(t => t - 1), gameState === 'playing' && timeLeft > 0 ? 1000 : null);

    const gridList = useMemo((): React.JSX.Element[] => grid.map(cell => {
        let classes: string = 'w-10 h-10';
        switch (cell.content) {
            case 'frog': classes += ' bg-green-500'; break;
            case 'log': classes += ' bg-emerald-700'; break;
            case 'water': classes += ' bg-blue-300'; break;
            case 'car': classes += ' bg-gray-900'; break;
            case 'road': classes += ' bg-gray-400'; break;
            case 'start': classes += ' bg-blue-500'; break
            case 'end': classes += ' bg-red-500'; break;
        }
        return <div key={cell.index} className={classes}></div>;
    }), [grid]);

    const result = useMemo((): string => {
        switch (gameState) {
            case 'win': return 'You Won!';
            case 'lose': return 'You Lose!';
            case 'playing': return '...';
            default: return 'Paused';
        }
    }, [gameState]);

    return (
        <section className="w-fit text-center space-y-2">
            <h2 className="text-4xl font-bold">Frogger</h2>
            <h3 className="text-xl font-semibold">Seconds left: {timeLeft}</h3>
            <h3 className="text-xl font-semibold uppercase">{result}</h3>
            <Button onClick={handleBtnClick} style="dark">{gameState === 'playing' ? 'Pause' : 'Start'}</Button>
            <div className="flex flex-wrap border border-black" style={gridStyle}>{gridList}</div>
        </section>
    );
}

const moveLeft = (index: number): number => {
    return (index % GRID_WIDTH - 1) < 0 ? index + GRID_WIDTH - 1 : index - 1;
};
const moveRight = (index: number): number => {
    return (index % GRID_WIDTH + 1) >= GRID_WIDTH ? index - GRID_WIDTH + 1 : index + 1;
};

const getCellContent = (index: number, frog: number, logs: number[], water: number[], cars: number[], road: number[]): CellContent => {
    switch (true) {
        case index === frog: return 'frog';
        case index === initialStartIndex: return 'start';
        case index === initialEndIndex: return 'end';
        case logs.includes(index): return 'log';
        case water.includes(index): return 'water';
        case cars.includes(index): return 'car';
        case road.includes(index): return 'road';
        default: return 'empty';
    }
};

const initialStartIndex: number = GRID_SIZE - Math.round(GRID_WIDTH / 2);
const initialEndIndex: number = Math.floor(GRID_WIDTH / 2);
const initialLogs: number[] = [18, 19, 20, 23, 24, 25, 28, 29, 30, 33, 34, 35];
const initialWater: number[] = [21, 22, 26, 27, 31, 32];
const initialCars: number[] = [45, 48, 51, 54, 57, 60];
const initialRoad: number[] = [46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62];
const initialGrid: Cell[] = [];
for (let index: number = 0; index < GRID_SIZE; index++) {
    initialGrid.push({ index, content: getCellContent(index, -1, initialLogs, initialWater, initialCars, initialRoad) });
}
