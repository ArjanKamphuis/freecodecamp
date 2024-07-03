import { memo, useMemo } from "react";
import { TourType } from "./useTours";
import Tour from "./Tour";

type ToursProps = {
    tours: TourType[];
    removeTour: (id: string) => void;
};

const Tours = memo(({ tours, removeTour }: ToursProps): React.JSX.Element => {
    const tourList = useMemo((): React.JSX.Element[] => {
        return tours.map(tour => <Tour key={tour.id} tour={tour} removeTour={removeTour} />);
    }, [removeTour, tours]);
    return (
        <>
            <h2 className="text-4xl font-bold text-center">Our Tours</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-xl"></div>
            <div className="space-y-4">{tourList}</div>
        </>
    );
});

Tours.displayName = 'Tours';
export default Tours;
