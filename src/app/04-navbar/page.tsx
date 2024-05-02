"use client";

import Image from "next/image";
import "./styles.css";
import { useEffect } from "react";

export default function NavBar(): React.JSX.Element {
    useEffect(() => {
        const navToggle: Element = document.querySelector('.nav-toggle')!;
        const links: Element = document.querySelector('.links')!;

        function handleNavToggleClick(): void {
            // console.log(links.classList);
            // if (links.classList.contains('show-links')) {
            //     links.classList.remove('show-links');
            // } else {
            //     links.classList.add('show-links');
            // }
            links.classList.toggle('show-links');
        }

        navToggle.addEventListener('click', handleNavToggleClick);

        return (): void => { navToggle.removeEventListener('click', handleNavToggleClick); };
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            <nav className="nav">
                <div className="nav-center">
                    <div className="nav-header">
                        <Image src="./logo.svg" className="logo" alt="logo" width={230} height={47} />
                        <button className="nav-toggle">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <ul className="links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">projects</a></li>
                        <li><a href="#">contact</a></li>
                    </ul>
                    <ul className="social-icons">
                        <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-behance"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fab fa-sketch"></i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
