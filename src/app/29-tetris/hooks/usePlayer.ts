import { useCallback, useState } from "react";
import { Player, STAGE_WIDTH, StageType, checkCollision } from "../gameHelpers";
import { TETROMINOS, TetrominoType, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
    const [player, setPlayer] = useState<Player>({ pos: { x: 0, y: 0 }, tetromino: TETROMINOS.get(0)!.shape });

    const updatePlayer = useCallback((x: number, y: number, collided?: boolean): void => {
        setPlayer(p => ({ ...p, pos: { x: p.pos.x + x, y: p.pos.y + y }, collided }));
    }, []);

    const rotate = useCallback((tetromino: TetrominoType[][], direction: number): TetrominoType[][] => {
        const rotatedTetro: TetrominoType[][] = tetromino.map((_, index) => tetromino.map(col => col[index]));
        return direction > 0 ? rotatedTetro.map(row => row.reverse()) : rotatedTetro.reverse();
    }, []);

    const rotatePlayer = useCallback((stage: StageType, direction: number) => {
        const clonedPlayer: Player = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

        const pos: number = clonedPlayer.pos.x;
        let offset: number = 1;
        while (checkCollision(clonedPlayer, stage, 0, 0)) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -direction);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }, [player, rotate]);

    const resetPlayer = useCallback((): void => {
        setPlayer({ pos: { x: STAGE_WIDTH / 2 - 2, y: 0 }, tetromino: randomTetromino().shape });
    }, []);

    return [player, updatePlayer, resetPlayer, rotatePlayer] as const;
};
