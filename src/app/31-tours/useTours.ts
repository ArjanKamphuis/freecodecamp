import { useCallback, useEffect, useState } from "react";
import { fetchExternal } from "../utils/fetchExternal";

export type TourType = {
    id: string;
    name: string;
    info: string;
    image: string;
    price: string;
};

export const useTours = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [tours, setTours] = useState<TourType[]>([]);

    const fetchTours = useCallback(async (abortController?: AbortController): Promise<void> => {
        setLoading(true);
        const data: TourType[] = await fetchExternal('https://course-api.com/react-tours-project');
        if (!abortController?.signal.aborted) setTours(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        const abortController: AbortController = new AbortController();
        fetchTours(abortController);
        return () => { abortController.abort(); };
    }, [fetchTours]);

    const removeTour = useCallback((id: string): void => {
        setTours(ts => ts.filter(tour => tour.id !== id));
    }, []);

    const loadingTours = loading;
    const refreshTours = fetchTours;

    return { tours, loadingTours, removeTour, refreshTours };
};
