import Image from "next/image";
import { memo, MouseEvent, useMemo } from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { sublinks } from "./data";
import { useEventCallback } from "usehooks-ts";

const Navbar = memo((): React.JSX.Element => {
    const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

    const displaySubmenu = useEventCallback((e: MouseEvent<HTMLButtonElement>) => {
        const page: string = (e.target as HTMLButtonElement).textContent!;
        const btnRect: DOMRect = (e.target as HTMLButtonElement).getBoundingClientRect();
        const center: number = (btnRect.left + btnRect.right) / 2;
        const bottom: number = btnRect.bottom;
        openSubmenu(page, { center, bottom });
    });

    const handleSubmenu = useEventCallback((e: MouseEvent<HTMLElement>) => {
        if (!(e.target instanceof HTMLButtonElement)) closeSubmenu();
    });

    const navList = useMemo(() => {
        return sublinks.map(sublink => (
            <li key={sublink.page}>
                <button onMouseOver={displaySubmenu} className="bg-transparent border-transparent text-lg text-white tracking-widest capitalize w-40">{sublink.page}</button>
            </li>
        ));
    }, [displaySubmenu]);

    return (
        <nav className="h-20 w-full flex items-center justify-center bg-transparent relative z-10" onMouseOver={handleSubmenu}>
            <div className="w-[90%] lg:grid lg:grid-flow-col items-center justify-between">
                <div className="flex justify-between items-center">
                    <Image src={logo} alt="logo" />
                    <button className="lg:hidden" onClick={openSidebar}>
                        <FaBars />
                    </button>
                </div>
                <ul className="hidden justify-center lg:grid lg:grid-cols-3 text-center h-full items-center">{navList}</ul>
                <button className="hidden lg:inline-block py-1 px-3 rounded-xl text-white bg-black hover:bg-gray-800">Sign in</button>
            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';
export default Navbar;
