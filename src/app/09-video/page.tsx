"use client";

import Image from "next/image";
import "./styles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTimeout } from "../utils/useTimeout";

export default function Video(): React.JSX.Element {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    //const btnRef = useRef<HTMLButtonElement>(null);

    useTimeout(() => {
        if (videoRef.current === null) return;
            videoRef.current.play();
            setIsPlaying(true);
            setIsLoaded(true);
    }, 1000);

    // useEffect(() => {
    //     if (btnRef.current === null || videoRef.current === null) return;
    //     const btn: HTMLButtonElement = btnRef.current;
    //     const video: HTMLVideoElement = videoRef.current;

    //     const handleButtonClick = () => {
    //         if (btn.classList.contains('slide')) {
    //             btn.classList.remove('slide');
    //             video.play();
    //         } else {
    //             btn.classList.add('slide');
    //             video.pause();
    //         }
    //     };

    //     btn.addEventListener('click', handleButtonClick);
    //     return (): void => { btn.removeEventListener('click', handleButtonClick); }
    // }, []);

    const handleButtonClick = useCallback(() => {
        if (videoRef.current === null) return;
        const newValue: boolean = !isPlaying;
        if (newValue) videoRef.current.play();
        else videoRef.current.pause();
        setIsPlaying(newValue);
    }, [isPlaying]);
    
    return (
        <div className="relative">
            <div className="preloader" style={{ display: `${isLoaded ? 'none' : ''}` }}>
                <Image src="/preloader.gif" alt="preloader" width={200} height={200} unoptimized />
            </div>
            <header className="header">
                <video ref={videoRef} controls muted loop className="video-container">
                    <source src="./video.mp4" type="video/mp4" />
                </video>
                <h2 className="text-4xl font-bold text-white">Video Project</h2>
                <button /*ref={btnRef}*/ onClick={handleButtonClick} className={`switch-btn${isPlaying ? '' : ' slide'}`}>
                    <span>Play</span>
                    <span>Pause</span>
                    <span className="switch"></span>
                </button>
            </header>
        </div>
    );
}
