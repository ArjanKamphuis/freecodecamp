import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CellType, Player, STAGE_WIDTH, StageType, createStage } from "../gameHelpers";

export const useStage = (player: Player, resetPlayer: () => void): [StageType, Dispatch<SetStateAction<StageType>>, number] => {
    const [stage, setStage] = useState<StageType>(createStage());
    const [rowsCleared, setRowsCleared] = useState<number>(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = (newStage: StageType): StageType => {
            let rowsDeleted: number = 0;
            const stg: StageType = newStage.reduce<StageType>((acc: StageType, row: CellType[]) => {
                if (row.findIndex(cell => cell.content === 0) === -1) {
                    rowsDeleted++;
                    acc.unshift(new Array<CellType>(STAGE_WIDTH).fill({ content: 0, state: 'clear'}));
                    return acc;
                }
                acc.push(row);
                return acc;
            }, []);
            setRowsCleared(rowsDeleted);
            return stg;
        };

        const updateStage = (prevStage: StageType): StageType => {
            const newStage: StageType = prevStage.map(row => (
                row.map(cell => (cell.state === 'clear' ? { content: 0, state: 'clear' } : cell))
            ));
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value === 0) return;
                    newStage[y + player.pos.y][x + player.pos.x] = { content: value, state: player.collided ? 'merged' : 'clear' };
                });
            });
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }
            return newStage;
        };

        setStage(s => updateStage(s));
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};
