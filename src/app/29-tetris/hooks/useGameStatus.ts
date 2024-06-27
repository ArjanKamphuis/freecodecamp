import { useCallback, useEffect, useMemo, useState } from "react";

const linePoints: number[] = [40, 100, 300, 1200];

export const useGameStatus = (rowsCleared: number) => {
    const [score, setScore] = useState<number>(0);
    const [rows, setRows] = useState<number>(0);
    const [level, setLevel] = useState<number>(0);

    const calcScore = useCallback(() => {
        if (rowsCleared > 0) {
            setScore(s => s + linePoints[rowsCleared - 1] * (level + 1));
            setRows(r => r + rowsCleared);
        }
    }, [level, rowsCleared]);

    const resetGameStatus = useCallback(() => {
        setScore(0);
        setRows(0);
        setLevel(0);
    }, []);

    const increaseLevel = useCallback(() => setLevel(l => l + 1), []);

    useEffect(() => {
        calcScore();
    }, [calcScore]);

    return [score, rows, level, increaseLevel, resetGameStatus] as const;
};
