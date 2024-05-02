"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "../components/Button";

type ReviewType = {
    id: number;
    name: string;
    job: string;
    img: string;
    text: string;
};

export default function Reviews(): React.JSX.Element {
    const [currentReviewIndex, setCurrentViewIndex] = useState<number>(0);
    const currentReview: ReviewType = reviews[currentReviewIndex];

    const handleNextButtonClick = useCallback((): void => {
        setCurrentViewIndex(i => (i + 1) % reviews.length);
    }, []);
    const handlePreviousButtonClick = useCallback((): void => {
        setCurrentViewIndex(i => i - 1 < 0 ? reviews.length - 1 : i - 1);
    }, []);
    const handleRandomButtonClick = useCallback((): void => {
        let randomIndex = currentReviewIndex;
        while (randomIndex === currentReviewIndex) {
            randomIndex = Math.floor(Math.random() * reviews.length);
        }
        setCurrentViewIndex(randomIndex);
    }, [currentReviewIndex]);

    return (
        <section className="flex flex-col w-full justify-center text-center">
            <div className="text-center space-y-2 mb-4">
                <h2 className="text-4xl font-bold">Our Reviews</h2>
                <div className="w-20 h-1 bg-cyan-600 mx-auto"></div>
            </div>
            <article className="px-6 py-8 shadow-xl shadow-gray-400 hover:shadow-gray-600 rounded-md">
                <div className="relative mx-auto w-40 h-40 mb-6">
                    <Image className="rounded-full object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={currentReview.img} alt={currentReview.name} key={currentReview.id} />
                </div>
                <h4 className="text-xl font-semibold mb-1 capitalize">{currentReview.name}</h4>
                <p className="uppercase mb-2 text-sm text-slate-400">{currentReview.job}</p>
                <p className="mb-3">{currentReview.text}</p>
                <div>
                    <div className="space-x-2 mx-auto mb-2">
                        <Button onClick={handlePreviousButtonClick} className="text-xl font-bold" style="alternative">&#x3c;</Button>
                        <Button onClick={handleNextButtonClick} className="text-xl font-bold" style="alternative">&#x3e;</Button>
                    </div>
                    <Button onClick={handleRandomButtonClick} style="alternative">Surprise Me</Button>
                </div>
            </article>
        </section>
    );
}

const reviews: ReviewType[] = [{
    id: 1,
    name: 'susan smith',
    job: 'web developer',
    img: 'https://www.course-api.com/images/people/person-1.jpeg',
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
}, {
    id: 2,
    name: 'anna johnson',
    job: 'web designer',
    img: 'https://www.course-api.com/images/people/person-2.jpeg',
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
}, {
    id: 3,
    name: 'peter jones',
    job: 'intern',
    img: 'https://www.course-api.com/images/people/person-4.jpeg',
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
}, {
    id: 4,
    name: 'bill anderson',
    job: 'the boss',
    img: 'https://www.course-api.com/images/people/person-3.jpeg',
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
}];
