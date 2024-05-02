"use client";

import Image from "next/image";
import "./styles.css";

const handleSidebarToggle = (): void => {
    const sidebar: Element = document.querySelector('.sidebar')!;
    sidebar.classList.toggle('show-sidebar');
};
const handleSidebarClose = (): void => {
    const sidebar: Element = document.querySelector('.sidebar')!;
    sidebar.classList.remove('show-sidebar');
};

export default function Sidebar(): React.JSX.Element {
    return (
        <div className="relative">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            <button onClick={handleSidebarToggle} className="sidebar-toggle"><i className="fas fa-bars"></i></button>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <Image src="./logo.svg" className="logo" alt="logo" width={230} height={47} />
                    <button onClick={handleSidebarClose} className="close-btn"><i className="fas fa-times"></i></button>
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
            </aside>
        </div>
    )
}