"use client";

import Image from "next/image";
import "./styles.css";
import { MouseEvent, memo, useCallback, useEffect, useState } from "react";
import { useEffectEvent } from "../utils/useEffectEvent";

type SectionType = {
    id: string;
    h2: string;
    span: string;
}

type ScrollLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const ScrollLink = memo(({ href, children, className }: ScrollLinkProps): React.JSX.Element => {
    const handleLinkClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        // e.preventDefault();

        // const id: string = e.currentTarget.getAttribute('href')!.slice(1);
        // const target: HTMLElement = document.getElementById(id)!;
        // const linksContainer: HTMLElement = document.querySelector('.links-container')!;
        // const navbar: Element = document.getElementById('nav')!;

        // const navHeight: number = navbar.getBoundingClientRect().height;
        // const linksContainerHeight: number = linksContainer.getBoundingClientRect().height;
        // const fixedNav: boolean = navbar.classList.contains('fixed-nav');

        // let position: number = target.offsetTop - navHeight;
        // if (!fixedNav) position -= navHeight;
        // if (navHeight > 82) position += linksContainerHeight;

        // window.scrollTo({
        //     left: 0,
        //     top: position
        // });

        // linksContainer.style.height = '0';
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' } as ScrollIntoViewOptions);
    }, [href]);
    return <a onClick={handleLinkClick} href={href} className={className}>{children}</a>;
});
ScrollLink.displayName = 'ScrollLink';

export default function Scroll(): React.JSX.Element {
    const [linksContainerHeight, setLinksContainerHeight] = useState<number>(0);

    useEffect(() => {
        const date: Element = document.getElementById('date')!;
        date.innerHTML = ` ${new Date().getFullYear()}`;
    });

    // const handleLinkClick = useEffectEvent((link: Element): void => {
    //     const href: string = link.getAttribute('href')!;
    //     const element: Element = document.querySelector(href)!;
    //     element.scrollIntoView();
    // });

    // useEffect(() => {
    //     const linkListeners: Map<Element, () => void> = new Map();
    //     document.querySelectorAll('.scroll-link').forEach(link => {
    //         const linkListener: () => void = handleLinkClick.bind(null, link);
    //         linkListeners.set(link, linkListener);
    //         link.addEventListener('click', linkListener);
    //     });

    //     return (): void => {
    //         linkListeners.forEach((listener, link) => link.removeEventListener('click', listener));
    //     }
    // }, [handleLinkClick]);

    const handleNavToggle = useCallback(() => {
        const linksHeight: DOMRect = document.querySelector('.links')!.getBoundingClientRect();
        setLinksContainerHeight(height => height > 0 ? 0 : linksHeight.height);
    }, []);

    const handleScroll = useEffectEvent(() => {
        const navbar: Element = document.getElementById('nav')!;
        const topLink: Element = document.querySelector('.top-link')!;

        const scrollHeight: number = window.scrollY;
        const navHeight: number = navbar.getBoundingClientRect().height;

        navbar.classList[scrollHeight > navHeight ? 'add' : 'remove']('fixed-nav');
        topLink.classList[scrollHeight > 500 ? 'add' : 'remove']('show-link');
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (): void => { window.removeEventListener('scroll', handleScroll); };
    }, [handleScroll]);

    const handleResize = useEffectEvent(() => {
        const navbar: HTMLElement = document.getElementById('nav')!;
        navbar.style.width = `${document.getElementById('home')!.getBoundingClientRect().width}px`;
    });

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => { window.removeEventListener('resize', handleResize); };
    }, [handleResize]);

    return (
        <div className="relative">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            <header id="home">
                <nav id="nav">
                    <div className="nav-center">
                        <div className="nav-header">
                            <Image src="./logo2.svg" alt="Logo" className="logo" width={147} height={125} priority />
                            <button onClick={handleNavToggle} className="nav-toggle"><i className="fas fa-bars"></i></button>
                        </div>
                        <div className="links-container" style={{ height: linksContainerHeight }}>
                            <ul className="links">{navLinkList}</ul>
                        </div>
                    </div>
                </nav>
                <div className="banner">
                    <div className="container">
                        <h2 className="text-4xl font-bold uppercase text-white mb-4">Scroll Project</h2>
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas eos neque sunt in? Id, necessitatibus quos quisquam distinctio laudantium fugiat?</p>
                        <ScrollLink className="btn btn-white" href="#tours">Explore Tours</ScrollLink>
                        {/* <a href="#tours" className="scroll-link btn btn-white">Explore Tours</a> */}
                    </div>
                </div>
            </header>
            {sectonList}
            <footer className="section" id="footer">
                <p>
                    copyright &copy; backroads travel tours company
                    <span id="date"></span>. all rights reserved
                </p>
            </footer>
            <ScrollLink className="top-link" href="#home"><i className="fas fa-arrow-up"></i></ScrollLink>
            {/* <a className="scroll-link top-link" href="#home">
                <i className="fas fa-arrow-up"></i>
            </a> */}
        </div>
    );
}

const sections: SectionType[] = [
    { id: 'about', h2: 'About', span: 'Us' },
    { id: 'services', h2: 'Our', span: 'Services' },
    { id: 'tours', h2: 'Featured', span: 'Tours' }
];
const sectonList: React.JSX.Element[] = sections.map(section => {
    return (
        <section key={section.id} id={section.id} className="section">
            <div className="title">
                <h2>{section.h2} <span>{section.span}</span></h2>
            </div>
        </section>
    );
});

const navLinks: ScrollLinkProps[] = [
    { href: '#home', children: 'Home' },
    { href: '#about', children: 'About' },
    { href: '#services', children: 'Services' },
    { href: '#tours', children: 'Tour' }
];
const navLinkList: React.JSX.Element[] = navLinks.map(link => {
    return <li key={link.href}><ScrollLink {...link} /></li>;
});
