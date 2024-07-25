import { createContext, useCallback, useContext, useState } from "react";
import { SubLink, sublinks } from "./data";

type Coordinates = { center: number, bottom: number };

type AppContextType = {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    isSubmenuOpen: boolean;
    openSubmenu: (page: string, coordinates: Coordinates) => void;
    closeSubmenu: () => void;
    page: SubLink;
    location: Coordinates;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);
    const [page, setPage] = useState<SubLink>({ page: '', links: []});
    const [location, setLocation] = useState<Coordinates>({ center: 0, bottom: 0 });

    const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
    const closeSubmenu = useCallback(() => setIsSubmenuOpen(false), []);

    const openSubmenu = useCallback((page: string, coordinates: Coordinates) => {
        setPage(sublinks.find(link => link.page === page)!);
        setLocation(coordinates);
        setIsSubmenuOpen(true);
    }, []);

    return (
        <AppContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar, isSubmenuOpen, openSubmenu, closeSubmenu, page, location }}>{children}</AppContext.Provider>
    );
};

export const useGlobalContext = (): AppContextType => {
    return useContext(AppContext);
};
