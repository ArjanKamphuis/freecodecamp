"use client";

import { questions } from "./questions";
import Question from "./Question";

export default function Accordion(): React.JSX.Element {
    return (
        <section className="min-h-[calc(100vh-5rem)] bg-blue-950 flex items-center justify-center">
            <div className="px-10 py-8 bg-white space-y-4 rounded-xl w-3/4">
                <h2 className="text-2xl font-bold text-center">Questions And Answers About Login</h2>
                <div className="space-y-4">{questions.map(question => <Question key={question.id} question={question} />)}</div>
            </div>
        </section>
    );
}
