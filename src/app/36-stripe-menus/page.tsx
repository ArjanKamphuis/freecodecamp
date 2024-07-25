"use client";

import Hero from "./Hero";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Submenu from "./Submenu";
import { AppProvider } from "./context";

export default function StripeMenus(): React.JSX.Element {
    return (
        <section>
            <AppProvider>
                <Navbar />
                <Sidebar />
                <Hero />
                <Submenu />
            </AppProvider>
        </section>
    )
}
