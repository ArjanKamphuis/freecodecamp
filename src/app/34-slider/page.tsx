"use client";

import { CSSProperties, memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { people } from "./data";
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import Image from "next/image";

type ArticleProps = {
    name: string;
    title: string;
    quote: string;
    image: string;
    translate: number;
};

const NavigationButton = memo(({ children, onClick }: { children: ReactNode, onClick: () => void }): React.JSX.Element => (
    <button className="text-4xl text-red-700 hover:bg-red-100 active:bg-red-200 rounded-full p-2" onClick={onClick}>
        <i>{children}</i>
    </button>
));
NavigationButton.displayName = 'NavigationButton';

const Article = memo(({ name, title, quote, image, translate }: ArticleProps): React.JSX.Element => {
    const style: CSSProperties = { transform: `translateX(${translate}%)`, opacity: translate === 0 ? '1' : '0' };
    return (
        <article style={style} className="absolute text-center space-y-4 transition duration-300 ease-linear">
            <Image src={image} alt={name} width={1000} height={1000} className="w-40 h-40 rounded-full object-cover mx-auto shadow-xl shadow-gray-700 border-4 border-gray-200" />
            <div className="space-y">
                <p className="uppercase text-red-500 font-semibold">{name}</p>
                <p className="capitalize">{title}</p>
            </div>
            <p>{quote}</p>
            <div className="flex justify-center">
                <i className="text-5xl text-red-700"><FaQuoteRight /></i>
            </div>
        </article>
    );
});
Article.displayName = 'Article';

export default function Slider(): React.JSX.Element {
    const [currentPersonIndex, setPersonIndex] = useState<number>(0);

    const updatePersonIndex = useCallback((direction: number): void => {
        const newIndex: number = (currentPersonIndex + direction) % people.length;
        setPersonIndex(newIndex >= 0 ? newIndex : people.length - 1);
    }, [currentPersonIndex]);

    useEffect(() => {
        const intervalId: NodeJS.Timeout = setInterval(() => updatePersonIndex(+1), 3000);
        return () => clearInterval(intervalId);
    }, [updatePersonIndex]);

    const peopleList = useMemo((): React.JSX.Element[] => {
        return people.map((person, personIndex) => {
            const translate: number = personIndex === currentPersonIndex ? 0 : ((personIndex === currentPersonIndex - 1 || (currentPersonIndex === 0 && personIndex === people.length - 1)) ? -100 : 100);
            return <Article key={person.id} {...person} translate={translate} />;
        });
    }, [currentPersonIndex]);

    return (
        <section className="w-full space-y-5 p-5">
            <h2 className="text-4xl font-bold flex justify-center items-center space-x-4">
                <span className="text-red-700">/</span>
                <span>Reviews</span>
            </h2>
            <div className="flex justify-center items-center p-5 shadow-lg">
                <NavigationButton onClick={() => updatePersonIndex(-1)}><FiChevronLeft /></NavigationButton>
                <div className="w-full h-96 flex flex-row justify-center relative overflow-hidden">
                    {peopleList}
                </div>
                <NavigationButton onClick={() => updatePersonIndex(+1)}><FiChevronRight /></NavigationButton>
            </div>
        </section>
    );
}
