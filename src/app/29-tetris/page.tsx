"use client";

import Tetris from "./components/Tetris";
import "./font-family.css";

export default function App(): React.JSX.Element {
    return (
        <section className="w-full text-center space-y-2">
            <h2 className="text-4xl font-bold">Tetris with React Hooks</h2>
            <Tetris />
        </section>
    );
}
