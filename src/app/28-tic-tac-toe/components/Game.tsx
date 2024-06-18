import { memo, useCallback, useMemo, useState } from "react";
import Board from "./Board";
import { SquareType, calculateWinner } from "../helpers";

const Game = memo((): React.JSX.Element => {
    const [history, setHistory] = useState<SquareType[][]>([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    
    const xIsNext: boolean = stepNumber % 2 === 0;
    const winner: SquareType = calculateWinner(history[stepNumber]);

    const handleClick = useCallback((i: number) => {
        if (winner || history[stepNumber][i]) return;
        const newHistory: SquareType[][] = history.slice(0, stepNumber + 1);
        const squares: SquareType[] = [...newHistory[stepNumber]];
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...newHistory, squares]);
        setStepNumber(newHistory.length);
    }, [history, stepNumber, winner, xIsNext]);

    const renderMoves = useMemo((): React.JSX.Element[] => {
        return history.map((_value, move) => {
            const destination: string = move ? `Go to move#${move}` : 'Go to start';
            return (
                <li key={move}>
                    <button className="bg-blue-200 hover:bg-blue-300 active:bg-blue-400 py-1 px-2 rounded-full" onClick={() => setStepNumber(move)}>{destination}</button>
                </li>
            );
        });
    }, [history]);

    return (
        <>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="mt-5 space-y-2">
                <p>{winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}</p>
                <ul className="space-y-1">{renderMoves}</ul>
            </div>
        </>
    );
});

Game.displayName = 'Game;'
export default Game;
