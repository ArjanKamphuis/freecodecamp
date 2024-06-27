import { KeyboardEvent, memo, useCallback, useMemo, useState } from "react";
import { useEventCallback, useInterval } from "usehooks-ts";

import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { useGameStatus } from "../hooks/useGameStatus";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

import { checkCollision, createStage } from "../gameHelpers";

const Tetris = memo((): React.JSX.Element => {
    const [dropTime, setDropTime] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const [player, updatePlayer, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, rows, level, increaseLevel, resetGameStatus] = useGameStatus(rowsCleared);

    const startGame = useEventCallback(() => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        resetGameStatus();
    });

    const movePlayerHorizontal = useCallback((x: number) => {
        if (checkCollision(player, stage, x, 0)) return;
        updatePlayer(x, 0);
    }, [player, stage, updatePlayer]);

    const drop = useCallback(() => {
        if (rows > (level + 1) * 10) {
            increaseLevel();
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, 0, 1)) {
            updatePlayer(0, 1);
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayer(0, 0, true);
        }
    }, [increaseLevel, level, player, rows, stage, updatePlayer]);

    const dropPlayer = useCallback(() => {
        setDropTime(null);
        drop();
    }, [drop]);

    const keyUp = useEventCallback(({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (!gameOver && code === 'ArrowDown') {
            setDropTime(1000 / (level + 1) + 200);
        }
    });

    const move = useEventCallback(({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (gameOver) return;
        switch (code) {
            case 'ArrowLeft': return movePlayerHorizontal(-1);
            case 'ArrowRight': return movePlayerHorizontal(1);
            case 'ArrowDown': return dropPlayer();
            case 'ArrowUp': return rotatePlayer(stage, 1);
        }
    });

    useInterval(drop, dropTime);

    const displayContent: React.JSX.Element = useMemo(() => gameOver ? (
        <Display gameOver={gameOver} text="GameOver" />
    ) : (
        <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
        </div>
    ), [gameOver, level, rows, score]);

    return (
        <StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={move} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {displayContent}
                    <StartButton onClick={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
});

Tetris.displayName = 'Tetris';
export default Tetris;
