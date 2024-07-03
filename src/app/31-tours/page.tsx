"use client";

import { useEffect, useMemo } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import { useTours } from "./useTours";

const url: string = 'https://course-api.com/react-tours-project';

export default function ToursApp(): React.JSX.Element {
    const { tours, loadingTours, removeTour, refreshTours } = useTours();

    const sectionData = useMemo((): React.JSX.Element => {
        if (loadingTours) return <Loading />;
        if (tours.length > 0) return <Tours tours={tours} removeTour={removeTour} />;
        return (
            <div className="space-y-2 text-center">
                <h2 className="text-4xl font-bold">No Tours Left</h2>
                <button className="px-2 py-1 rounded-xl text-white text-lg font-semibold tracking-widest bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                    onClick={async () => await refreshTours()}
                >Refresh</button>
            </div>
        );
    }, [loadingTours, refreshTours, removeTour, tours]);

    return (
        <section className="w-full space-y-2">
            {sectionData}
        </section>
    );
}
