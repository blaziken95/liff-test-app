import { Geist } from "next/font/google";
import "./globals.css";
import { Metadata } from 'next';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Your app description'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geist.className} text-black flex flex-col h-screen`}>
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4 h-16">
                <h1 className="text-center text-2xl font-bold">LIFF 데이터 확인용 앱</h1>
            </header>
            <main className="flex-grow mt-16 mb-16 overflow-y-auto">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-10 p-4 h-16">
                <p className="text-center text-sm">© eric_dc</p>
            </footer>
        </body>
        </html>
    );
}
