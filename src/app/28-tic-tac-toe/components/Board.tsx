import { memo, useMemo } from "react";
import Square from "./Square";
import { SquareType } from "../helpers";

type BoardProps = {
    squares: SquareType[];
    onClick: (value: number) => void;
};

const Board = memo(({ squares, onClick }: BoardProps): React.JSX.Element => {
    const board = useMemo((): React.JSX.Element[] => squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i) } />
    )), [onClick, squares]);
    return <div className="border-4 border-blue-900 rounded-xl w-64 h-64 grid grid-rows-3 grid-cols-3">{board}</div>;
});

Board.displayName = 'Board';
export default Board;
