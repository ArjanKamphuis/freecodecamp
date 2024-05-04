import { memo } from "react";
import Image from "next/image";
import { MenuItemType } from "./data";

export const MenuItem = memo((menuItem: MenuItemType): React.JSX.Element => {
    return (
        <article className="grid gap-y-4 gap-x-8 max-w-96 md:grid-cols-2 md:gap-y-0 md:gap-x-5 md:max-w-2xl">
            <Image className="h-48 md:h-44 xl:h-36 w-auto object-cover border-2 border-amber-500 rounded-xl" key={menuItem.id} src={menuItem.img} alt={menuItem.title} width={200} height={0} priority />
            <div>
                <header className="flex justify-between items-center border-b border-dotted border-gray-500 font-bold tracking-widest capitalize">
                    <h4>{menuItem.title}</h4>
                    <h4 className="text-amber-500">${menuItem.price}</h4>
                </header>
                <p>{menuItem.desc}</p>
            </div>
        </article>
    );
});
MenuItem.displayName = 'MenuItem';
