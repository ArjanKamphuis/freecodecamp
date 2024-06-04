"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/Button";

type Player = 'one' | 'two';
type Square = {
    id: number;
    state: 'empty' | 'bottom' | Player;
};

const initialSquares: Square[] = [];
for (let i = 0; i < 49; i++) {
    initialSquares.push({ id: i, state: i < 42 ? 'empty' : 'bottom' });
}

export default function ConnectFour(): React.JSX.Element {
    const [squares, setSquares] = useState<Square[]>(initialSquares);
    const [currentPlayer, setCurrenPlayer] = useState<Player>('one');
    const [winner, setWinner] = useState<Player | null>(null);

    const onSquareClick = useCallback((id: number) => {
        if (winner || squares[id].state !== 'empty' || squares[id + 7].state === 'empty') return;
        const newSquares: Square[] = squares.map(s => s.id === id ? { ...s, state: currentPlayer } : s);
        if (checkForWinner(newSquares, currentPlayer)) setWinner(currentPlayer);
        setSquares(newSquares);
        setCurrenPlayer(p => p === 'one' ? 'two' : 'one');
    }, [currentPlayer, squares, winner]);

    const onPlayAgainClick = useCallback((): void => {
        setSquares(initialSquares);
        setWinner(null);
    }, []);

    const squareList: React.JSX.Element[] = squares.map((square => {
        const classes: string = `w-10 h-10${square.state === 'one' ? ' bg-red-500 rounded-full' : (square.state === 'two' ? ' bg-blue-500 rounded-full' : '')}`;
        return <div key={square.id} className={classes} onClick={() => onSquareClick(square.id)}></div>;
    }));

    return (
        <section className="space-y-2">
            <h2 className="text-4xl font-bold">Connect Four</h2>
            <div className="flex flex-wrap w-[282px] h-[242px] border border-black">{squareList}</div>
            {winner ? <div className="flex space-x-2 items-center">
                <p className="text-xl font-semibold capitalize">Player {winner} Wins!</p>
                <Button style="dark" onClick={onPlayAgainClick}>Play Again</Button>
            </div> : <p className="text-xl font-semibold">The current Player is: Player {currentPlayer === 'one' ? 1 : 2}</p>}
        </section>
    );
}

const checkForWinner = (squares: Square[], player: Player): boolean => {
    for (let i = 0; i < winningArrays.length; i++) {
        const winningSquare: Square[] = [squares[winningArrays[i][0]], squares[winningArrays[i][1]], squares[winningArrays[i][2]], squares[winningArrays[i][3]]];
        if (winningSquare.every(square => square.state === player)) {
            return true;
        }
    }
    return false;
};

const winningArrays: number[][] = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
];
