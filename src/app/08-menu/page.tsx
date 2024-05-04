"use client";

import { useMemo, useState } from "react";
import { Buttons } from "./Buttons";
import { MenuItemType, menu } from "./data";
import { MenuItem } from "./MenuItem";

export default function Menu(): React.JSX.Element {
    const [category, setCategory] = useState<string>('all');

    const filteredMenu: MenuItemType[] = useMemo(() => {
        return category === 'all' ? menu : menu.filter(item => item.category === category);
    }, [category]);

    return (
        <section className="space-y-4">
            <div className="text-center">
                <h2 className="text-4xl font-bold capitalize">Our Menu - {category}</h2>
                <div className="w-20 h-1 bg-amber-500 mx-auto rounded-xl"></div>
            </div>
            <Buttons onCategoryClick={(newCategory: string) => setCategory(newCategory)} />
            <div className="grid gap-y-12 gap-x-8 justify-items-center xl:grid-cols-2">
                {filteredMenu.map(item => <MenuItem key={item.id} {...item} />)}
            </div>
        </section>
    );
}
