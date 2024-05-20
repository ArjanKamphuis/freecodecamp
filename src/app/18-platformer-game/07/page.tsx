"use client";

import { useEffect, useRef } from "react";
import { Game } from "./Game";

export default function PlatformerGame(): React.JSX.Element {
    const mountedRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const game: Game = new Game(mountedRef.current!, canvasRef.current!);
        game.start();
        return (): void => { game.stop(); };
    }, []);

    return (
        <section ref={mountedRef} className="grid justify-center items-center bg-[#202830] min-h-[calc(100vh-5rem)]">
            <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }}></canvas>
        </section>
    );   
}
