'use client';

import Game from "./components/Game";

export default function TicTacToe(): React.JSX.Element {
    return (
        <section className="w-fit text-center space-y-2">
            <h2 className="text-4xl font-bold">Tic Tac Toe</h2>
            <Game />
        </section>
    );
}
