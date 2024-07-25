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
                    <div className="flex px-10">
                        <NavigationList />
                        <main className="w-3/4 p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
