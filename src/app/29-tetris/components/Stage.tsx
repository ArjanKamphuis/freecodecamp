import { memo } from "react";
import Cell from "./Cell";
import { CellType } from "../gameHelpers";

type StageProps = {
    stage: CellType[][];
};

const Stage = memo(({ stage }: StageProps): React.JSX.Element => {
    const grid: React.JSX.Element[][] = stage.map(row => row.map((cell, i) => <Cell key={i} content={cell.content} />));
    return <div>{grid}</div>;
});

Stage.displayName = 'Stage';
export default Stage;
