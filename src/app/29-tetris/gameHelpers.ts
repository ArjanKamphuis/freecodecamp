import { TetrominoType } from "./tetrominos";

export const STAGE_WIDTH = 12 as const;
export const STAGE_HEIGHT = 20 as const;

export type CellType = {
    content: TetrominoType;
    state: 'clear' | 'merged';
};
export type StageType = CellType[][];

export type Player = {
    pos: { x: number, y: number };
    tetromino: TetrominoType[][];
    collided?: boolean;
};

export const createStage = (): StageType => (
    Array.from(Array<CellType[]>(STAGE_HEIGHT), () => (
        new Array<CellType>(STAGE_WIDTH).fill({ content: 0, state: 'clear'})
    ))
);

export const checkCollision = (player: Player, stage: StageType, moveX: number, moveY: number): boolean => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for  (let x = 0; x < player.tetromino[y].length; x++) {
            if (player.tetromino[y][x] === 0) continue;
            const newY: number = y + player.pos.y + moveY;
            const newX: number = x + player.pos.x + moveX;
            if (
                !stage[newY] ||
                !stage[newY][newX] ||
                stage[newY][newX].state !== 'clear'
            ) return true;
        }
    }
    return false;
};
