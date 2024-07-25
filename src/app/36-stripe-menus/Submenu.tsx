import { memo, useMemo } from "react";
import { useGlobalContext } from "./context";

const Submenu = memo((): React.JSX.Element => {
    const { isSubmenuOpen, page: { page, links }, location: { center, bottom } } = useGlobalContext();

    const linkList = useMemo((): React.JSX.Element[] => {
        return links.map(link => (
            <a key={link.label} href={link.url} className="w-40 flex items-center space-x-4">
                <i>{link.icon({})}</i>
                <span>{link.label}</span>
            </a>
        ));
    }, [links]);

    const submenuBeforeClasses: string = useMemo(() => 'before:border-4 before:border-transparent before:border-b-white before:-top-2 before:absolute before:left-1/2 before:-translate-x-1/2', []);
    const submenuDefaultClasses: string = useMemo(() => 'absolute capitalize bg-white shadow-lg rounded-lg p-8 top-16 z-30 left-1/2 -translate-x-1/2 transition-all duration-300 ease-linear', []);

    return (
        <aside className={`${submenuBeforeClasses} ${submenuDefaultClasses} ${isSubmenuOpen ? 'block' : 'hidden'}`} style={{ left: `${center}px`, top: `${bottom}px`}}>
            <section>
                <h4 className="text-lg font-semibold mb-6">{page}</h4>
                <div className={`grid gap-x-1 gap-y-8 ${links.length === 3 ? 'grid-cols-3' : (links.length > 3 ? 'grid-cols-4' : 'grid-cols-2')}`}>{linkList}</div>
            </section>
        </aside>
    );
});

Submenu.displayName = 'Submenu';
export default Submenu;
