import { memo, useState } from "react";
import { QuestionType } from "./questions";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Question = memo(({ question }: { question: QuestionType }): React.JSX.Element => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    return (
        <article onClick={() => setShowInfo(i => !i)} className="p-4 shadow-lg border border-gray-400 space-y-4 cursor-pointer hover:bg-gray-100">
            <header className="flex flex-row justify-between items-center space-x-2">
                <h4 className="text-xl font-semibold">{question.title}</h4>
                <i className="bg-gray-300 rounded-full p-1">{showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}</i>
            </header>
            {showInfo && <p>{question.info}</p>}
        </article>
    );
});

Question.displayName = 'Question';
export default Question;
