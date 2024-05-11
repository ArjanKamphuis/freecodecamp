"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Button } from "../components/Button";
import { text as data } from "./text";

export default function LoremIpsum(): React.JSX.Element {
    const [loremAmount, setLoremAmount] = useState<number>(5);
    const [loremText, setLoremText] = useState<string[]>([]);

    const formSubmitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Number.isNaN(loremAmount) || loremAmount < 1 || loremAmount > 9) {
            setLoremText([data[Math.floor(Math.random() * data.length)]]);
        } else {
            const shuffledData: string[] = data.sort(() => Math.random() - 0.5);
            setLoremText(shuffledData.slice(0, loremAmount));
        }
        
    }, [loremAmount]);

    return (
        <section className="text-center">
            <h2 className="text-2xl font-bold mb-2">Tired of boring Lorem Ipsum?</h2>
            <form onSubmit={formSubmitHandler} className="flex space-x-2 justify-center items-center mb-8">
                <label className="text-lg font-semibold" htmlFor="amount">Paragraphs:</label>
                <input className="w-12 bg-gray-100 px-2 py-1 rounded-xl border border-gray-500"
                    type="number" name="amount" id="amount" value={loremAmount} min={0} max={9}
                    onChange={e => setLoremAmount(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)} />
                <Button type="submit" className="uppercase">Generate</Button>
            </form>
            <article className="space-y-8">{loremText.map((lorem, index) => <p key={index}>{lorem}</p>)}</article>
        </section>
    );
}
