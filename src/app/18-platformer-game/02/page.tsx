"use client";

import { useEffect, useRef } from "react";
import { Platformer } from "./Platformer";

export default function PlatformerGame(): React.JSX.Element {
    const mountedRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const platformer: Platformer = new Platformer(mountedRef.current!, canvasRef.current!);
        platformer.start();
        return (): void => { platformer.stop(); };
    }, []);

    return (
        <section ref={mountedRef} id="platformer" className="grid justify-center items-center bg-[#202830] min-h-[calc(100vh-5rem)]">
            <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }}></canvas>
        </section>
    );   
}
