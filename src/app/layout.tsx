import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationList } from "./navigation";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Freecodecamp - 40 JavaScript Projects for Beginners",
    description: "https://www.freecodecamp.org/news/javascript-projects-for-beginners",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen">
                    <Header />
                    <div className="flex max-w-6xl mx-auto">
                        <nav className="w-1/4 border-r border-black p-4">
                            <h2 className="text-xl font-semibold">Projects:</h2>
                            <NavigationList />
                        </nav>
                        <main className="w-3/4 p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
