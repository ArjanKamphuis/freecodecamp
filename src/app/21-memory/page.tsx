"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { useTimeout } from "usehooks-ts";

type Card = {
    id: number;
    name: string;
    matched: boolean;
    flipped: boolean;
};

export default function MemoryGame(): React.JSX.Element {
    const [cards, setCards] = useState<Card[]>([]);
    const [cardsChosen, setCardsChosen] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);

    const won: boolean = useMemo(() => {
        return cards.length > 0 && score === cards.length / 2;
    }, [cards, score]);

    const flipCard = useCallback((card: Card): void => {
        if (cardsChosen.length === 2 || card.flipped || card.matched) return;
        setCards(cards.map(c => {
            return { ...c, flipped: c.flipped || c.id === card.id };
        }));
        setCardsChosen([...cardsChosen, card.name]);
    }, [cards, cardsChosen]);

    const checkforMatch = useCallback((): void => {
        let match: boolean = false;
        if (cardsChosen[0] === cardsChosen[1]) {
            match = true;
            setScore(s => s + 1);
        }
        setCards(cards.map(card => {
            return { ...card, flipped: false, matched: card.matched || (match && card.name === cardsChosen[0]) };
        }));
        setCardsChosen([]);
        setMoves(m => m + 1);
    }, [cards, cardsChosen]);

    const restartButtonClick = useCallback((): void => {
        setCards(c => c.map(card => {
            return { ...card, flipped: false, matched: false }
        }).sort((() => Math.random() - 0.5)));
        setScore(0);
        setMoves(0);
    }, []);

    useEffect(() => {
        setCards(initialCards.sort(() => Math.random() - 0.5));
    }, []);

    useTimeout(checkforMatch, cardsChosen.length === 2 ? 500 : null);
    // useEffect(() => {
    //     if (cardsChosen.length === 2) {
    //         const timeout: NodeJS.Timeout = setTimeout(checkforMatch, 500);
    //         return (): void => clearTimeout(timeout);
    //     }
    // }, [cardsChosen, checkforMatch]);

    const cardList: React.JSX.Element[] = useMemo(() => cards.map(card => {
        const imgName: string = card.matched ? 'white' : (card.flipped ? card.name : 'blank');
        return <Image key={card.id} src={`/memory/${imgName}.png`} alt={card.name} width={100} height={100} onClick={() => flipCard(card)} priority />;
    }), [cards, flipCard]);

    return (
        <section className="grid justify-center text-center">
            <h2 className="text-4xl font-bold mb-6">Memory Game</h2>
            {won ? <>
                <h3 className="text-2xl font-semibold mb-2">Congratulations, you won in {moves} moves!</h3>
                <Button style="dark" className="w-fit mx-auto" onClick={restartButtonClick}>Play Again</Button>
            </> : <>
                <h3 className="text-2xl font-semibold mb-2">Moves: {moves}</h3>
                <div className="flex flex-wrap w-[412px] h-[308px] gap-1">{cardList}</div>
            </>}
        </section>
    );
}

const initialCards: Card[] = [
    { id: 0, name: 'fries', matched: false, flipped: false },
    { id: 1, name: 'fries', matched: false, flipped: false },
    { id: 2, name: 'cheeseburger', matched: false, flipped: false },
    { id: 3, name: 'cheeseburger', matched: false, flipped: false },
    { id: 4, name: 'ice-cream', matched: false, flipped: false },
    { id: 5, name: 'ice-cream', matched: false, flipped: false },
    { id: 6, name: 'pizza', matched: false, flipped: false },
    { id: 7, name: 'pizza', matched: false, flipped: false },
    { id: 8, name: 'milkshake', matched: false, flipped: false },
    { id: 9, name: 'milkshake', matched: false, flipped: false },
    { id: 10, name: 'hotdog', matched: false, flipped: false },
    { id: 11, name: 'hotdog', matched: false, flipped: false },
];

