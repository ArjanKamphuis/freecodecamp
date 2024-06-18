import { TetrominoType } from "./tetrominos";

export const STAGE_WIDTH = 12 as const;
export const STAGE_HEIGHT = 20 as const;

export type CellType = {
    content: TetrominoType;
    state: 'clear' | 'merged';
};

export const createStage = (): CellType[][] => (
    Array.from(Array(STAGE_HEIGHT), () => (
        new Array(STAGE_WIDTH).fill({ content: 0, state: 'clear'})
    ))
);
