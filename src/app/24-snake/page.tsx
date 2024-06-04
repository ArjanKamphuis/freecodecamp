"use client";

import { CSSProperties, useMemo, useRef, useState } from "react";
import { Button } from "../components/Button";
import { useEventCallback, useEventListener, useInterval } from "usehooks-ts";

const BOARD_WIDTH: number = 13;
const BOARD_HEIGHT: number = 8;
const BOARD_SIZE: number = BOARD_WIDTH * BOARD_HEIGHT;

const boardStyle: CSSProperties = {
    width: `${BOARD_WIDTH * 20 + 2}px`,
    height: `${BOARD_HEIGHT * 20 + 2}px`
};

type Square = {
    id: number;
    content: 'empty' | 'snake' | 'apple';
};

type Direction = 'left' | 'right' | 'up' | 'down';

const directionMap: Map<Direction, number> = new Map();
directionMap.set('left', -1);
directionMap.set('right', 1);
directionMap.set('up', -BOARD_WIDTH);
directionMap.set('down', BOARD_WIDTH);

const initialSnake: number[] = [2, 1, 0];
const initialBoard: Square[] = [];
for (let i = 0; i < BOARD_SIZE; i++) {
    initialBoard.push({ id: i, content: initialSnake.includes(i) ? 'snake' : 'empty' });
}

export default function SnakeGame(): React.JSX.Element {
    const [board, setBoard] = useState<Square[]>([]);
    const [snake, setSnake] = useState<number[]>([]);
    const [direction, setDirection] = useState<Direction>('right');
    const [score, setScore] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);

    const documentRef = useRef<Document>(null);
    const gameOver = useMemo((): boolean => {
        return speed === 0;
    }, [speed]);

    const onStartBtnClick = useEventCallback((): void => {
        const appleId: number = getRandomAppleId(initialBoard);
        setBoard(initialBoard.map(s => s.id === appleId ? { ...s, content: 'apple' } : s));
        setSnake(initialSnake);
        setDirection('right');
        setScore(0);
        setSpeed(1000);
    });

    useEventListener('keyup', (e: KeyboardEvent): void => {
        switch (e.code) {
            case 'ArrowLeft': setDirection('left'); break;
            case 'ArrowRight': setDirection('right'); break;
            case 'ArrowUp': setDirection('up'); break;
            case 'ArrowDown': setDirection('down'); break;
        }
    }, documentRef);

    useInterval(() => {
        if (
            (snake[0] + BOARD_WIDTH >= BOARD_SIZE && direction === 'down') ||
            (snake[0] % BOARD_WIDTH === (BOARD_WIDTH - 1) && direction === 'right') ||
            (snake[0] % BOARD_WIDTH === 0 && direction === 'left') ||
            (snake[0] - BOARD_WIDTH < 0 && direction === 'up') ||
            board[snake[0] + directionMap.get(direction)!].content === 'snake'
        ) {
            setSpeed(0);
            return;
        }

        const tail: Square = board[snake[snake.length - 1]];
        const newHead: Square = board[snake[0] + directionMap.get(direction)!];
        const foundApple: boolean = newHead.content === 'apple';
        
        setBoard(board => {
            let newBoard: Square[] = board.map(square => {
                if (!foundApple && square.id === tail.id) return { ...square, content: 'empty' };
                if (square.id === newHead.id) return { ...square, content: 'snake' };
                return square;
            });
            if (foundApple) {
                const appleId: number = getRandomAppleId(newBoard);
                return newBoard.map(s => s.id === appleId ? { ...s, content: 'apple' } : s);
            }
            return newBoard;
        });
        
        setSnake(snake => {
            const newSnake: number[] = snake.map(s => s);
            if (!foundApple) newSnake.pop();
            newSnake.unshift(newHead.id);
            return newSnake;
        });

        if (foundApple) {
            setScore(s => s + 1);
            setSpeed(s => s *= 0.9);
        }
    }, gameOver ? null : speed);

    const squareList: React.JSX.Element[] = useMemo(() => board.map(square => {
        const classes: string = `w-5 h-5${square.content === 'snake' ? ' bg-blue-500' : (square.content === 'apple' ? ' bg-green-500' : '')}`
        return <div key={square.id} className={classes}></div>;
    }), [board]);

    return (
        <section className="space-y-2">
            <div className="flex space-x-4 items-center">
                <h2 className="text-4xl font-bold">Snake</h2>
                <Button style="dark" onClick={onStartBtnClick}>Start/Restart</Button>
            </div>
            <div className="italic">Score: {score}</div>
            <div className="flex flex-wrap border border-black" style={boardStyle}>{squareList}</div>
            {gameOver && <p className="text-3xl font-bold">Game Over!</p>}
        </section>
    );
}

const getRandomAppleId = (board: Square[]): number => {
    let randomSquare: Square = board.find(s => s.content === 'snake')!;
    while (randomSquare.content === 'snake') randomSquare = board[Math.floor(Math.random() * board.length)];
    return randomSquare.id;
};
