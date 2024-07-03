"use client";

import { useMemo, useState } from "react";
import { Person, data } from "./data";
import Image from "next/image";

export default function Birthday(): React.JSX.Element {
    const [people, setPeople] = useState<Person[]>(data);

    const peopleList: React.JSX.Element[] = useMemo(() => {
        return people.map(person => {
            const { id, name, age, image } = person;
            return (
                <article key={id} className="flex flex-row space-x-2 cursor-pointer hover:bg-gray-100 items-center border border-gray-300 p-2 rounded-xl shadow-lg">
                    <Image src={image} alt={name} width={1000} height={667} className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <h4 className="font-bold mb-1">{name}</h4>
                        <p className="font-light">{age} years</p>
                    </div>
                </article>
            );
        });
    }, [people]);

    const innerContainerClasses: string = useMemo(() => {
        return `bg-white p-4 rounded-xl space-y-${people.length ? '4' : '1'}`;
    }, [people]);

    return (
        <section className="w-full min-h-[calc(100vh-5rem)] grid items-center justify-items-center bg-purple-400 text-gray-700">
            <div className={innerContainerClasses}>
                <h2 className="text-2xl font-bold">{people.length} birthday{people.length === 1 ? '' : 's'} today</h2>
                <div className="space-y-6">{peopleList}</div>
                <button onClick={() => setPeople(people.length ? [] : data)}
                    className="bg-purple-400 hover:bg-purple-500 active:bg-purple-600 px-2 py-1 w-full font-extrabold rounded-xl uppercase text-lg"
                >{people.length ? 'Clear All' : 'Reload'}</button>
            </div>
        </section>
    );
}
