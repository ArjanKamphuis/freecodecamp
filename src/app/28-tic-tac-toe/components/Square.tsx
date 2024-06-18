import { memo } from "react";
import { SquareType } from "../helpers";

type SquareProps = {
    value: SquareType;
    onClick: () => void;
};

const Square = memo(({ value, onClick }: SquareProps): React.JSX.Element => {
    return (
        <button className="bg-blue-200 border-2 border-blue-900 text-xl font-extrabold hover:bg-blue-300 active:bg-blue-400" onClick={onClick}>{value}</button>
    );
});

Square.displayName = 'Square';
export default Square;
