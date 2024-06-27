const tetrominoTypes = [0, 'O', 'J', 'L', 'S', 'T', 'Z', 'I'] as const;
export type TetrominoType = typeof tetrominoTypes[number];

export type Tetromino = {
    shape: TetrominoType[][];
    color: string;
};

export const TETROMINOS: Map<TetrominoType, Tetromino> = new Map();
TETROMINOS.set(0, { shape: [[0]], color: '0, 0, 0' });
TETROMINOS.set('O', { shape: [['O', 'O'], ['O', 'O']], color: '223, 217, 36' });
TETROMINOS.set('J', { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: '36, 95, 223' });
TETROMINOS.set('L', { shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']], color: '223, 173, 36' });
TETROMINOS.set('S', { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: '48, 211, 56' });
TETROMINOS.set('T', { shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]], color: '132, 61, 198' });
TETROMINOS.set('Z', { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: '227, 78, 78' });
TETROMINOS.set('I', { shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]], color: '80, 227, 230' });

export const randomTetromino = (): Tetromino => TETROMINOS.get(tetrominoTypes[Math.floor(Math.random() * (tetrominoTypes.length - 1)) + 1])!;
