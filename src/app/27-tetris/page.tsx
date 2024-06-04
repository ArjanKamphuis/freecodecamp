"use client";

import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { useEventListener, useInterval, useTimeout } from "usehooks-ts";

const GRID_WIDTH = 10 as const;
const GRID_HEIGHT = 20 as const;
const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;

const gridStyle: CSSProperties = {
    width: `${GRID_WIDTH * 20}px`,
    height: `${GRID_HEIGHT * 20}px`
};

const tetrominoColors = ['blue', 'green', 'navy', 'peach', 'purple', 'yellow'] as const;
type TetrominoColor = typeof tetrominoColors[number];

type RawTetromino = number[][];
type Tetromino = {
    indices: RawTetromino;
    position: number;
    rotation: number;
    color: TetrominoColor;
};

const l1Tetromino: RawTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
];
const l2Tetromino: RawTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 0],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    [GRID_WIDTH * 3, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
];
const z1Tetromino: RawTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
];
const z2Tetromino: RawTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
];
const tTetromino: RawTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
];
const oTetromino: RawTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
];
const iTetromino: RawTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
];

const theTetrominoes: RawTetromino[] = [l1Tetromino, l2Tetromino, z1Tetromino, z2Tetromino, tTetromino, oTetromino, iTetromino]

type Cell = {
    index: number;
    color?: TetrominoColor;
};

const initialGrid: Cell[] = [];
for (let index = 0; index < GRID_SIZE; index++) {
    initialGrid.push({ index });
}

export default function Tetris(): React.JSX.Element {
    const [grid, setGrid] = useState<Cell[]>(initialGrid);
    const [filledCells, setFilledCells] = useState<Cell[]>([]);
    const [tetromino, setTetromino] = useState<Tetromino | null>(null);
    const [score, setScore] = useState<number>(0);

    const documentRef = useRef<Document>(null);

    const render = useCallback((): void => {
        setGrid(grid => grid.map(cell => {
            let color: TetrominoColor | undefined = filledCells.find(c => c.index === cell.index)?.color;
            if (tetromino?.indices[tetromino.rotation].includes(cell.index - tetromino.position)) color = tetromino.color;
            return { ...cell, color };
        }));
    }, [filledCells, tetromino?.color, tetromino?.indices, tetromino?.position, tetromino?.rotation]);

    const createTetromino = useCallback((): void => setTetromino({
        indices: theTetrominoes[Math.floor(Math.random() * theTetrominoes.length)],
        position: GRID_WIDTH / 2,
        rotation: Math.floor(Math.random() * 4),
        color: tetrominoColors[Math.floor(Math.random() * tetrominoColors.length)]
    }), []);

    const filterLines = useCallback((newFilledCells: Cell[]): Cell[] => {
        let fullRowIndex: number = -1;
        for (let height = GRID_HEIGHT; height > 0 ; height--) {
            for (let width = GRID_WIDTH; width > 0; width--) {
                fullRowIndex = height * GRID_WIDTH - (GRID_WIDTH - width) - 1;
                if (!newFilledCells.find(c => c.index === fullRowIndex)) {
                    fullRowIndex = -1;
                    break;
                }
            }
            if (fullRowIndex > -1) {
                setScore(s => s + 10);
                const filteredCells: Cell[] = newFilledCells.filter(cell => {
                    return !(cell.index >= fullRowIndex && cell.index < fullRowIndex + GRID_WIDTH);
                });
                return filterLines(filteredCells.map(cell => {
                    return cell.index < fullRowIndex ? { ...cell, index: cell.index + GRID_WIDTH } : cell;
                }));
            }
        }
        return newFilledCells;
    }, []);

    const otherTetrominoHit = useCallback((newIndices: number[], position: number): boolean => {
        return newIndices.map(i => i + position).some(i => filledCells.find(cell => cell.index === i));
    }, [filledCells]);

    const leftBoundaryHit = useCallback((newIndices: number[], position: number): boolean => {
        const sideHit: boolean = newIndices.some(i => (i + position) % GRID_WIDTH <= 0);
        return sideHit || otherTetrominoHit(newIndices, position - 1);
    }, [otherTetrominoHit]);

    const rightBoundaryHit = useCallback((newIndices: number[], position: number): boolean => {
        const sideHit: boolean = newIndices.some(i => (i + position) % GRID_WIDTH >= GRID_WIDTH - 1);
        return sideHit || otherTetrominoHit(newIndices, position + 1);
    }, [otherTetrominoHit]);

    const moveDown = useCallback((): void => {
        if (!tetromino) return;
        let bottomHit: boolean = false;
        for (let i = 0; i < tetromino.indices[tetromino.rotation].length; i++) {
            const newPosition: number = tetromino.indices[tetromino.rotation][i] + tetromino.position + GRID_WIDTH;
            if (newPosition > GRID_SIZE - 1 || filledCells.find(c => c.index === newPosition)) {
                bottomHit = true;
                break;
            }
        }
        if (bottomHit) {
            const tetrominoIndices: number[] = tetromino.indices[tetromino.rotation].map(index => index + tetromino.position);
            const newCells: Cell[] = tetrominoIndices.map(i => {
                return { index: i, color: tetromino.color };
            });
            let newFilledCells: Cell[] = [...filledCells, ...newCells];
            newFilledCells = filterLines(newFilledCells);
            setFilledCells(newFilledCells);
            createTetromino();
        } else {
            setTetromino({ ...tetromino, position: tetromino.position + GRID_WIDTH });
        }
    }, [createTetromino, filledCells, filterLines, tetromino]);

    const moveLeft = useCallback((): void => {
        if (!tetromino || leftBoundaryHit(tetromino.indices[tetromino.rotation], tetromino.position)) return;
        setTetromino({ ...tetromino, position: tetromino.position - 1});
    }, [leftBoundaryHit, tetromino]);

    const moveRight = useCallback((): void => {
        if (!tetromino || rightBoundaryHit(tetromino.indices[tetromino.rotation], tetromino.position)) return;
        setTetromino({ ...tetromino, position: tetromino.position + 1 });
    }, [rightBoundaryHit, tetromino]);

    const rotate = useCallback((): void => {
        if (!tetromino) return;
        const newRotation: number = (tetromino.rotation + 1) % 4;
        const newIndices: number[] = tetromino.indices[newRotation];
        const newPositions: number[] = newIndices.map(i => (i + tetromino.position) % GRID_WIDTH);
        if (newPositions.includes(0) && newPositions.includes(9)) return;
        if (otherTetrominoHit(newIndices, tetromino.position)) return;
        setTetromino(t => {
            return {...t!, rotation: (t!.rotation + 1) % 4 };
        });
    }, [otherTetrominoHit, tetromino]);

    const onKeyboardUp = useCallback((e: KeyboardEvent): void => {
        switch (e.code) {
            case 'ArrowLeft': moveLeft(); break;
            case 'ArrowRight': moveRight(); break;
            case 'ArrowDown': moveDown(); break;
            case 'ArrowUp': rotate(); break;
            case 'Space': break;
        }
    }, [moveDown, moveLeft, moveRight, rotate]);

    useEventListener('keyup', onKeyboardUp, documentRef);
    useInterval(render, 1000 / 30);
    useInterval(moveDown, 1000);
    useTimeout(createTetromino, 100);

    const gridList = useMemo((): React.JSX.Element[] => grid.map(cell => {
        let classes: string = 'w-5 h-5';
        if (!cell.color) return <div key={cell.index} className={classes}></div>;

        classes += ' bg-contain bg-no-repeat bg-center';
        return <div key={cell.index} className={classes} style={{ backgroundImage: `url('/tetris/${cell.color}_block.png')` }}></div>;
    }), [grid]);

    return (
        <section className="w-fit text-center space-y-2">
            <h2 className="text-4xl font-bold">Tetris</h2>
            <h3 className="text-xl font-semibold flex justify-between">
                <span>Score: {score}</span>
                <span>Lines: {score / 10}</span>
            </h3>
            <div className="flex flex-wrap bg-yellow-300" style={gridStyle}>{gridList}</div>
        </section>
    );
}
