"use client";

import { memo, useCallback, useMemo, useState } from "react";
import "./styles.css";

type Question = {
    id: number;
    title: string;
    text: string;
    collapsed: boolean;
};

type QuestionProps = {
    question: Question;
    onCollapseClick: () => void;
};

const QuestionComponent = memo(({ question, onCollapseClick }: QuestionProps) => {
    return (
        <article className="rounded-xl shadow shadow-amber-300 p-5">
            <div className="flex justify-between items-center pb-2">
                <h3 className="text-xl">{question.title}</h3>
                <button className="text-2xl bg-transparent cursor-pointer text-amber-500 transition duration-300 ease-linear hover:rotate-90" onClick={onCollapseClick}>
                    <i className={question.collapsed ? 'far fa-minus-square' : 'far fa-plus-square'}></i>
                </button>
            </div>
            {question.collapsed && <p className="pt-2 border-t border-amber-300">{question.text}</p>}
        </article>
    );
});
QuestionComponent.displayName = 'QuestionComponent';

export default function Questions(): React.JSX.Element {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);

    const handleCollapseClick = useCallback((questionId: number) => {
        setQuestions(questions.map((question: Question) => {
            return { ...question, collapsed: question.id === questionId ? !question.collapsed : false };
        }));
    }, [questions]);

    const questionList: React.JSX.Element[] = useMemo(() => questions.map(question => {
        return <QuestionComponent key={question.id} question={question} onCollapseClick={() => handleCollapseClick(question.id)} />
    }), [handleCollapseClick, questions]);

    return (
        <div className="questions">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            <section>
                <div className="title text-4xl text-amber-500 my-6">
                    <h2 className="text-center">General Questions</h2>
                </div>
                <div className="space-y-8">
                    {questionList}
                </div>
            </section>
        </div>
    )
}

const initialQuestions: Question[] = [{
    id: 0,
    title: 'Do you accept all major credit cards?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo doloribus quaerat, magni numquam repellat reprehenderit.',
    collapsed: false
}, {
    id: 1,
    title: 'Do you support local farmers?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo doloribus quaerat, magni numquam repellat reprehenderit.',
    collapsed: false
}, {
    id: 2,
    title: 'Do you use organic ingredients?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo doloribus quaerat, magni numquam repellat reprehenderit.',
    collapsed: false
}];
