"use client";

import { useCallback, useEffect, useState} from "react";
import { Button } from "../components/Button";

export default function Counter(): React.JSX.Element {
    const [count, setCount] = useState<number>(0);

    const handleButtonClick = useCallback((btnClassList: DOMTokenList): void => {
        if (btnClassList.contains('decrease')) setCount(c => c - 1);
        else if (btnClassList.contains('increase')) setCount(c => c + 1);
        else setCount(0);
    }, []);

    useEffect(() => {
        const btns: NodeListOf<Element> = document.querySelectorAll('.btn');
        const btnListeners: Map<Element, () => void> = new Map();
        btns.forEach(btn => {
            const handler: () => void = handleButtonClick.bind(null, btn.classList);
            btn.addEventListener('click', handler);
            btnListeners.set(btn, handler);
        });
        return (): void => {
            btnListeners.forEach((handler, btn) => btn.removeEventListener('click', handler));
        };
    }, [handleButtonClick]);

    useEffect(() => {
        const value: HTMLElement = document.querySelector('#value')!;
        value.style.color = count < 0 ? 'red' : (count > 0 ? 'green' : 'black');
    }, [count]);

    return (
        <div className="flex w-full justify-center text-center">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Counter</h2>
                <p id="value" className="text-5xl font-bold">{count}</p>
                <div className="flex space-x-2">
                    <Button className="btn decrease" style="alternative">Decrease</Button>
                    <Button className="btn reset" style="alternative">Reset</Button>
                    <Button className="btn increase" style="alternative">Increase</Button>
                </div>
            </div>
        </div>
    );
}
