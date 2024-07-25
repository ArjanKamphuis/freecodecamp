"use client";

import { FormEvent, useMemo, useState } from "react";
import SingleColor from "./SingleColor";
import { useEventCallback } from "usehooks-ts";
import Values from "values.js";

const initialColor: string = '#f15025';
const initialWeight: number = 10;

export default function ColorGenerator(): React.JSX.Element {
    const [color, setColor] = useState<string>(initialColor);
    const [colorWeight, setColorWeight] = useState<string>(initialWeight.toString());
    const [error, setError] = useState<string>('');
    const [list, setList] = useState<Values[]>(new Values(initialColor).all(initialWeight));

    const handleSubmit = useEventCallback((e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        try {
            setList(new Values(color).all(Number(colorWeight)));
            setError('');
        } catch (ex: any) {
            setError(ex.message);
            console.error(ex.message);
        }
    });

    const colorList = useMemo((): React.JSX.Element[] => {
        return list.map((color, index) => (
            <SingleColor key={index} hex={color.hexString()} weight={color.weight} type={color.type} />
        ));
    }, [list]);

    return (
        <section className="space-y-2">
            <header className="flex space-x-4 items-center">
                <h2 className="text-4xl font-bold">Color Generator</h2>
                <form className="flex space-x-1 items-center" onSubmit={handleSubmit}>
                    <div className={`flex flex-col space-y-1 border p-1 rounded-lg ${error ? 'border-red-500' : 'border-transparent'}`}>
                        <div className="flex">
                            <label htmlFor="color" className="w-16 font-bold">Color:</label>
                            <input id="color" value={color} onChange={(e) => setColor(e.currentTarget.value)} className="border rounded-lg px-1" />
                        </div>
                        <div className="flex">
                            <label htmlFor="weight" className="w-16 font-bold">Weight:</label>
                            <input id="weight" type="number" min={1} max={100} value={colorWeight} onChange={(e) => setColorWeight(e.currentTarget.value)} className="border rounded-lg px-1" />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-600 active:bg-blue-700">Submit</button>
                </form>
            </header>
            {error ?
                <p className="text-red-500">{error}</p> :
                <div className="flex flex-wrap">{colorList}</div>
            }
        </section>
    );
}
