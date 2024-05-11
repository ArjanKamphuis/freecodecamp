"use client";

import Image from "next/image";
import "./styles.css";
import { useEffect, useRef, useState } from "react";

type DeadLineType = {
    id: string;
    spanContent: string;
};

let futureDate: Date = new Date();
futureDate.setSeconds(futureDate.getSeconds() + 5);

const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const oneMinute: number = 60 * 1000;
const oneHour: number = oneMinute * 60;
const oneDay: number = oneHour * 24;

const getGiveawayText = (): string => {
    const year: number = futureDate.getFullYear();
    const hours: number = futureDate.getHours();
    const minutes: number = futureDate.getMinutes();
    const month: string = months[futureDate.getMonth()];
    const day: string = weekdays[futureDate.getDay()];
    const date: number = futureDate.getDate();
    return `Giveaway ends on ${day}, ${date} ${month} ${year} ${hours}:${minutes}`;
};

const handleIntervalTick = (): number => {
    const remainingTime: number = futureDate.getTime() - new Date().getTime();

    const days: number = Math.floor(remainingTime / oneDay);
    const hours: number = Math.floor((remainingTime / oneHour) % 24);
    const minutes: number = Math.floor((remainingTime / oneMinute) % 60);
    const seconds: number = Math.floor((remainingTime / 1000) % 60);
    
    const items: NodeListOf<HTMLElement> = document.querySelectorAll('.deadline-format h4');
    const values: number[] = [days, hours, minutes, seconds];

    const format = (item: number): string => {
        return item < 10 ? `0${item}` : item.toString();
    };

    items.forEach((item, index) => {
        item.innerText = format(values[index]);
    });

    return remainingTime;
};

export default function CountdownTimer(): React.JSX.Element {
    const [expired, setExpired] = useState<boolean>(false);
    const giveawayRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        handleIntervalTick();
        const intervalId: NodeJS.Timeout = setInterval(() => {
            const remainingTime: number = handleIntervalTick();
            if (remainingTime < 0) setExpired(true);
        }, 1000);
        if (expired) clearInterval(intervalId);
        return (): void => { clearInterval(intervalId); };
    }, [expired]);

    useEffect(() => {
        if (giveawayRef.current === null) return;
        giveawayRef.current.innerHTML = getGiveawayText();
    }, []);

    return (
        <section className="lg:grid lg:grid-cols-2 lg:place-items-center lg:gap-12">
            <article className="mb-8 lg:mb-0">
                <Image src="/gift.jpeg" alt="gift picture" width={1000} height={632} priority />
            </article>
            <article className="lg:space-y-2">
                <h3 className="text-2xl font-bold uppercase text-slate-500">Old IPhone Giveaway</h3>
                <h4 ref={giveawayRef} className="text-xl font-semibold tracking-widest"></h4>
                <p className="my-8 lg:my-0">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Reprehenderit molestiae cum libero atque ut voluptate qui consectetur
                    aliquid incidunt voluptatem quos, dolore, non commodi quaerat aliquam
                    eligendi, quisquam totam blanditiis.
                </p>
                <div className="deadline flex justify-center">
                    {expired ? <h4 className="expired text-xl font-semibold tracking-widest">Sorry, This Giveaway has expired!</h4> : deadlineList}
                </div>
            </article>
        </section>
    );
}

const deadLines: DeadLineType[] = [
    { id: 'days', spanContent: 'Days' },
    { id: 'hours', spanContent: 'Hours' },
    { id: 'minutes', spanContent: 'Mins' },
    { id: 'seconds', spanContent: 'Secs' }
];
const deadlineList: React.JSX.Element[] = deadLines.map(deadline => {
    return (
        <div key={deadline.id} className="deadline-format">
            <div>
                <h4></h4>
                <span>{deadline.spanContent}</span>
            </div>
        </div>
    );
});
