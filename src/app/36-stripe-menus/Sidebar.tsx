import { memo, useMemo } from "react";
import { useGlobalContext } from "./context";
import { FaTimes } from "react-icons/fa";
import { sublinks } from "./data";

const Sidebar = memo((): React.JSX.Element => {
    const { isSidebarOpen, closeSidebar } = useGlobalContext();

    const linkList = useMemo(() => {
        return sublinks.map(item => (
            <article key={item.page}>
                <h4 className="text-lg font-semibold">{item.page}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3">
                    {item.links.map(link => (
                        <a key={link.label} href={link.url} className="flex items-center space-x-4">
                            <i>{link.icon({})}</i>
                            <span>{link.label}</span>
                        </a>
                    ))}
                </div>
            </article>
        ));
    }, []);

    return (
        <div className={`lg:hidden absolute top-20 w-2/3 h-full grid place-items-center bg-black/50 transition-all duration-300 ease-linear ${isSidebarOpen ? 'z-20 scale-100' : '-z-10 scale-0'}`}>
            <aside className="w-[90%] h-[95%] bg-white rounded-lg shadow-lg relative py-16 px-8">
                <button className="text-3xl bg-transparent border-transparent text-gray-800 absolute top-4 right-4" onClick={closeSidebar}><FaTimes /></button>
                <div className="space-y-8 capitalize">{linkList}</div>
            </aside>
        </div>
    );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
