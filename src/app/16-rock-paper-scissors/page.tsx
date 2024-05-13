"use client";

import { memo, useCallback, useMemo, useState } from "react";
import "./styles.css";
import Image from "next/image";

const choices = ['Rock', 'Paper', 'Scissors'] as const;
type Choice = typeof choices[number];
type Result = 'win' | 'lose' | 'draw';

type ChoiceProps = {
    choice: Choice;
    onClick: (userChoice: Choice) => void;
};
type ResultProps = {
    userChoice: Choice;
    computerChoice: Choice;
    result: Result;
};

const ChoiceComponent = memo(({ choice, onClick }: ChoiceProps): React.JSX.Element => {
    return (
        <div className={choiceClasses} onClick={() => onClick(choice)} id={choice.toLowerCase()}>
            <Image src={`/images/rock-paper-scissors/${choice.toLowerCase()}.png`} alt={choice} width={48} height={48} />
        </div>
    );
});
ChoiceComponent.displayName = 'Choice';

const ResultComponent = memo(({ userChoice, computerChoice, result }: ResultProps): React.JSX.Element => {
    const user = useMemo((): React.JSX.Element => <>{userChoice}<span className={resultSpanClasses}>user</span></>, [userChoice]);
    const computer = useMemo((): React.JSX.Element => <>{computerChoice}<span className={resultSpanClasses}>computer</span></>, [computerChoice]);

    switch (result) {
        case 'win': return <p>{user} beats {computer}. You win! 🔥</p>;
        case 'lose': return <p>{user} loses to {computer}. You lost... 💩</p>;
        case 'draw': return <p>{user} equals {computer}. It&apos;s a draw!</p>;
    }
});
ResultComponent.displayName = 'Result';

export default function RockPaperScissors(): React.JSX.Element {
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [userScore, setUserScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);
    const [resultContent, setResultContent] = useState<ResultProps>({} as ResultProps);

    const win = useCallback((userChoice: Choice, computerChoice: Choice): void => {
        setUserScore(s => s += 1);
        setResultContent({ userChoice, computerChoice, result: 'win' });
        animateChoice(userChoice, 'win');
    }, []);
    const lose = useCallback((userChoice: Choice, computerChoice: Choice): void => {
        setComputerScore(s => s += 1);
        setResultContent({ userChoice, computerChoice, result: 'lose' });
        animateChoice(userChoice, 'lose');
    }, []);
    const draw = useCallback((userChoice: Choice, computerChoice: Choice): void => {
        setResultContent({ userChoice, computerChoice, result: 'draw' });
        animateChoice(userChoice, 'draw');
    }, []);

    const choiceClickHandler = useCallback((userChoice: Choice): void => {
        if (!isStarted) setIsStarted(true);
        const computerChoice: Choice = choices[Math.floor(Math.random() * choices.length)];
        switch (calculateResult(userChoice, computerChoice)) {
            case 'win': return win(userChoice, computerChoice);
            case 'lose': return lose(userChoice, computerChoice);
            case 'draw': return draw(userChoice, computerChoice);
        }
    }, [draw, lose, isStarted, win]);

    const restartClickHandler = useCallback((): void => {
        setIsStarted(false);
        setUserScore(0);
        setComputerScore(0);
    }, []);

    const choiceList = useMemo((): React.JSX.Element[] => choices.map(choice => {
        return <ChoiceComponent key={choice.toLowerCase()} choice={choice} onClick={choiceClickHandler} />;
    }), [choiceClickHandler]);

    return (
        <div className={appClasses}>
            <header className={headerClasses}>
                <h2>Rock Paper Scissors</h2>
            </header>
            <main className="p-5 space-y-5 text-white">
                <div className={scoreBoardClasses}>
                    <div className={`${badgeClasses} -left-[25px]`}>user</div>
                    <div className={`${badgeClasses} -right-[30px]`}>comp</div>
                    <span>{userScore}</span>:<span>{computerScore}</span>
                </div>
                <div className="text-4xl font-bold min-h-12">
                    {isStarted ? <ResultComponent {...resultContent} /> : <p>Let&apos;s get Started!</p>}
                </div>
                <div className="flex justify-center space-x-10">{choiceList}</div>
                <div className="font-bold text-xl space-y-2">
                    <p>Make your move.</p>
                    <button disabled={!isStarted} className={retartBtnClasses} onClick={restartClickHandler}>Restart</button>
                </div>
            </main>
        </div>
    );
}

const calculateResult = (a: Choice, b: Choice): Result => {
    switch (a.charAt(0) + b.charAt(0)) {
        case 'RS':
        case 'PR':
        case 'SP':
            return 'win';
        case 'RP':
        case 'PS':
        case 'SR':
            return 'lose';
        case 'RR':
        case 'PP':
        case 'SS':
            return 'draw';
        default:
            throw Error(`Illegal choice combination: ${a}:${b}`);
    }
};

const animateChoice = (choice: Choice, result: Result): void => {
    const className: string = `${result === 'win' ? 'green' : (result === 'lose' ? 'red' : 'gray')}-glow`;
    const element: Element = document.getElementById(choice.toLowerCase())!;
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), 300);
};

// min-h-[calc(100vh-5rem)]
const appClasses: string = `bg-gray-800 font-['Asap'] text-center shadow-lg shadow-gray-800`;
const headerClasses: string = `bg-gray-100 text-4xl font-bold text-gray-800 p-5`;
const scoreBoardClasses: string = `relative mx-auto border-4 border-white w-48 text-5xl rounded py-4`;
const badgeClasses: string = `bg-red-500 text-sm py-[2px] px-[10px] absolute top-7 rounded`;
const choiceClasses: string = `border-4 border-white rounded-full p-3 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear`;
const retartBtnClasses: string = `bg-transparent px-2 py-1 ml-1 border-4 border-white rounded-xl hover:bg-gray-700 disabled:opacity-10 transition-all duration-300 ease-linear`;
const resultSpanClasses: string = `text-xs align-sub`;
