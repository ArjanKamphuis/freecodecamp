import { memo } from "react";
import { TetrominoType } from "../tetrominos";

type CellProps = {
    content: TetrominoType;
};

const Cell = memo(({ content }: CellProps): React.JSX.Element => {
    return (
        <div>{content}</div>
    );
});

Cell.displayName = 'Cell';
export default Cell;
