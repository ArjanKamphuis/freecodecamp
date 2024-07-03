import { memo, useState } from "react";
import { TourType } from "./useTours";
import Image from "next/image";

type TourProps = {
    tour: TourType;
    removeTour: (id: string) => void;
};

const Tour = memo(({ tour, removeTour }: TourProps): React.JSX.Element => {
    const [readMore, setReadMore] = useState<boolean>(false);
    const { id, name, info, image, price } = tour;
    return (
        <article className="rounded-b-xl shadow-lg hover:shadow-xl">
            <Image src={image} alt={name} width={1000} height={1000} priority className="w-full h-80 object-cover rounded-t-xl" />
            <footer className="px-6 py-8 space-y-4 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg">{name}</h4>
                    <h4 className="font-bold text-lg text-violet-400 bg-violet-50 px-1">${price}</h4>
                </div>
                <p className="space-x-2">
                    <span>{readMore ? info : `${info.substring(0, 250)}...`}</span>
                    <button className="text-blue-400 hover:text-blue-500"
                        onClick={() => setReadMore(r => !r)}
                    >{readMore ? 'Show Less' : 'Read More'}</button>
                </p>
                <div className="flex justify-center">
                    <button className="w-52 px-2 py-1 rounded-xl tracking-widest text-red-600 border border-red-600 hover:bg-gray-200 active:bg-gray-300"
                        onClick={() => removeTour(id)}
                    >Not Interested</button>
                </div>
            </footer>
        </article>
    );
});

Tour.displayName = 'Tour';
export default Tour;
