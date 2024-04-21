import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/configuration/provider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <Providers>
            <body className={inter.className}>
               <header className="flex flex-row bg-green-400 py-3 px-3">
                  <h2 className="text-neutral-900 font-bold text-xl">Redux</h2>
                  <nav className="ml-auto w-1/3">
                     <ul className="flex flex-row gap-3 items-center">
                        <li>
                           <Link href="/post-slice">Post Slice</Link>
                        </li>
                        <li>
                           <Link href="/thunk-function">Thunk Function</Link>
                        </li>
                     </ul>
                  </nav>
               </header>
               {children}
            </body>
         </Providers>
      </html>
   );
}
