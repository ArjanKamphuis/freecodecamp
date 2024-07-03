import { useCallback, useEffect, useState } from "react";
import { fetchExternal } from "../utils/fetchExternal";

export type JobType = {
    id: string;
    order: number;
    title: string;
    dates: string;
    duties: string[];
    company: string;
};

export const useJobs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [currentJobIndex, setCurrentJobIndex] = useState<number>(0);

    const fetchJobs = useCallback(async (abortController?: AbortController): Promise<void> => {
        setLoading(true);
        const data: JobType[] = await fetchExternal('https://course-api.com/react-tabs-project');
        if (!abortController?.signal.aborted) setJobs(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchJobs(abortController);
        return () => { abortController.abort(); };
    }, [fetchJobs]);

    return { jobs, loadingJobs: loading, currentJobIndex, setCurrentJobIndex, currentJob: jobs.at(currentJobIndex) };
};
