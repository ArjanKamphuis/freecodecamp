import { memo } from "react";
import Cell from "./Cell";
import { CellType } from "../gameHelpers";
import { StyledStage } from "./styles/StyledStage";

type StageProps = {
    stage: CellType[][];
};

const Stage = memo(({ stage }: StageProps): React.JSX.Element => {
    const grid: React.JSX.Element[][] = stage.map(row => row.map((cell, i) => <Cell key={i} content={cell.content} />));
    return <StyledStage width={stage[0].length} height={stage.length}>{grid}</StyledStage>;
});

Stage.displayName = 'Stage';
export default Stage;
