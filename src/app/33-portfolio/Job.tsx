import { memo, useMemo } from "react";
import { JobType } from "./useJobs";
import { FaAngleDoubleRight } from "react-icons/fa";

const Job = memo(({ job }: { job: JobType }): React.JSX.Element => {
    const { title, dates, duties, company } = job;

    const dutyList = useMemo((): React.JSX.Element[] => {
        return duties.map((duty, index) => {
            return (
                <li key={index} className="flex items-center space-x-5">
                    <i className="text-gray-500"><FaAngleDoubleRight /></i>
                    <span>{duty}</span>
                </li>
            );
        });
    }, [duties]);

    return (
        <article className="flex flex-col space-y-2">
            <h3 className="text-3xl font-bold tracking-wide">{title}</h3>
            <p className="uppercase font-semibold px-2 w-fit bg-gray-300 tracking-widest">{company}</p>
            <p className="text-xl tracking-wider font-light text-gray-600">{dates}</p>
            <ul className="space-y-5">{dutyList}</ul>
        </article>
    );
});

Job.displayName = 'Job';
export default Job;
