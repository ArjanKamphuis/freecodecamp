import { memo } from "react";
import { TETROMINOS, TetrominoType } from "../tetrominos";
import { StyledCell } from "./styles/StyledCell";

type CellProps = {
    content: TetrominoType;
};

const Cell = memo(({ content }: CellProps): React.JSX.Element => (
    <StyledCell content={content} color={TETROMINOS.get(content)!.color} />
));

Cell.displayName = 'Cell';
export default Cell;
