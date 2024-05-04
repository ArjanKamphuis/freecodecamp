import { memo, useMemo } from "react";
import { btnClasses, categories } from './data';

export const Buttons = memo(({ onCategoryClick }: { onCategoryClick: (newCategory: string) => void }): React.JSX.Element => {
    const btns: React.JSX.Element[] = useMemo(() => categories.map(category => {
        return <button onClick={e => onCategoryClick(e.currentTarget.dataset.id!)} className={btnClasses} key={category} data-id={category}>{category}</button>;
    }), [onCategoryClick]);
    return <div className="flex space-x-2 justify-center">{btns}</div>;
});
Buttons.displayName = 'Buttons';
