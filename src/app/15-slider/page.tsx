"use client";

import Image from "next/image";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";

type SlideMode = 'scroll' | 'hide';

export default function Slider(): React.JSX.Element {
    const [counter, setCounter] = useState<number>(0);
    const [slideList, setSlideList] = useState<HTMLDivElement[]>([]);
    const [slideMode, setSlideMode] = useState<SlideMode>('scroll');

    const slideTo = useCallback((newIndex: number): void => {
        if (newIndex < 0) newIndex = slideList.length - 1;
        else if (newIndex >= slideList.length) newIndex = 0;
        setCounter(newIndex);
        slideList.forEach(slide => slide.style.transform = `translateX(-${newIndex * 100}%)`);
    }, [slideList]);

    useEffect(() => {
        const slides: NodeListOf<HTMLDivElement> = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => slide.style.left = `${index * 100}%`);
        setSlideList(Array.from(slides));
    }, []);

    const showPrevBtn: boolean = slideMode === 'scroll' || counter > 0;
    const showNextBtn: boolean = slideMode === 'scroll' || counter < slideList.length - 1;

    return (
        <div>
            <div className="flex lg:grid lg:grid-cols-3 justify-between items-center mb-2">
                <h2 className="lg:col-start-2 lg:text-center text-2xl font-bold">Slider - {slideMode.toUpperCase()} Mode</h2>
                <div className="lg:flex lg:justify-end space-x-2">
                    <Button onClick={() => setSlideMode('scroll')} disabled={slideMode === 'scroll'}>Scroll</Button>
                    <Button onClick={() => setSlideMode('hide')} disabled={slideMode === 'hide'}>Hide</Button>
                </div>
            </div>
            <div className="slider-container">
                <div className="slide">
                    <Image src="/img-1.jpeg" className="slide-img" alt="img-1" width={1000} height={800} priority />
                    <h2 className="text-9xl font-bold">1</h2>
                </div>
                <div className="slide">
                    <h2 className="text-9xl font-bold">2</h2>
                </div>
                <div className="slide">
                    <h2 className="text-9xl font-bold">3</h2>
                </div>
                <div className="slide">
                    <div>
                        <Image src="/person-1.jpeg" className="person-img" alt="person-1" width={1000} height={667} />
                        <h3 className="text-xl font-semibold tracking-widest">Susan Doe</h3>
                        <h2 className="text-9xl font-bold">4</h2>
                    </div>
                </div>
            </div>
            <div className="btn-container">
                <button className={`prevBtn${showPrevBtn ? '' : ' hidden'}`} onClick={() => slideTo(counter - 1)}>Prev</button>
                <button className={`nextBtn${showNextBtn ? '' : ' hidden'}`} onClick={() => slideTo(counter + 1)}>Next</button>
            </div>
        </div>
    );
}
