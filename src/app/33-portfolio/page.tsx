"use client";

import { useMemo } from "react";
import { useJobs } from "./useJobs";
import Job from "./Job";

export default function Portfolio(): React.JSX.Element {
    const { jobs, loadingJobs, currentJobIndex, setCurrentJobIndex, currentJob } = useJobs();

    const companyList = useMemo((): React.JSX.Element[] => {
        return jobs.map((job, index) => (
            <button key={job.id} onClick={() => setCurrentJobIndex(index)}
                className={`capitalize w-48 text-xl tracking-widest px-1 bg-transparent hover:bg-gray-100 border ${index === currentJobIndex ? 'border-gray-400 text-gray-500' : 'border-transparent'}`}
            >{job.company}</button>
        ));
    }, [currentJobIndex, jobs, setCurrentJobIndex]);

    return loadingJobs ? (
        <h2 className="text-4xl font-bold text-center">Loading...</h2>
    ) : (
        <section className="flex flex-col p-5 space-y-10">
            <header className="text-center space-y-1">
                <h2 className="text-4xl font-extrabold">Experience</h2>
                <div className="w-20 h-1 rounded-xl bg-gray-500 mx-auto"></div>
            </header>
            <div className="flex space-x-5 px-5">
                <div className="flex flex-col space-y-2 pt-1">{companyList}</div>
                {currentJob && <Job job={currentJob} />}
            </div>
            <button className="mx-auto bg-slate-400 text-white px-5 py-1 uppercase tracking-widest text-xl">More Info</button>
        </section>
    );
}
