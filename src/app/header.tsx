import React from "react";

export const Header = React.memo(() => {
    return (
        <header className="grid content-center justify-center w-full p-2 shadow-lg">
            <h1 className="text-2xl font-bold">Freecodecamp - 40 JavaScript Projects for Beginners</h1>
        </header>
    );
});
Header.displayName = 'AppHeader';
