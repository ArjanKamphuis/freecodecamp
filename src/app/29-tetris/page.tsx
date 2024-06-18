"use client";

import Tetris from "./components/Tetris";

export default function App(): React.JSX.Element {
    return (
        <section className="w-fit text-center space-y-2">
            <h2 className="text-4xl font-bold">Tetris with React Hooks</h2>
            <Tetris />
        </section>
    );
}
