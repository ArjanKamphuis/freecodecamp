"use client";

import { useEffect } from "react";
import { Controller } from "./Controller";
import { Display } from "./Display";
import { Engine } from "../Engine";
import { Game } from "./Game";

export default function PlatformerGame(): React.JSX.Element {
    useEffect(() => {
        const update = (): void => {
            game.update();
        };
        
        const render = (): void => {
            display.renderColor(game.color());
            display.render();
        };

        const keyDownUpTest = (e: KeyboardEvent): void => {
            controller.keyDownUp(e);
            if (e.type === 'keydown') {
                console.log(`You pressed: ${e.code}`);
            } else {
                console.log(`You released: ${e.code}`);
            }
        };
    
        const controller: Controller = new Controller();
        const display: Display = new Display(document.querySelector('canvas')!);
        const engine: Engine = new Engine(1000 / 30, update, render);
        const game: Game = new Game();
    
        window.addEventListener('resize', display.resize);
        window.addEventListener('keydown', keyDownUpTest);
        window.addEventListener('keyup', keyDownUpTest);
    
        display.resize();
        engine.start();

        return (): void => {
            engine.stop();
            window.removeEventListener('resize', display.resize);
            window.removeEventListener('keydown', keyDownUpTest);
            window.removeEventListener('keyup', keyDownUpTest);
        };
    }, []);

    return (
        <section id="platformer" className="grid justify-center items-center bg-[#202830] min-h-[calc(100vh-5rem)]">
            <canvas style={{ imageRendering: 'pixelated' }}></canvas>
        </section>
    );   
}
