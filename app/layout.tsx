import "./globals.css";
import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { SearchProvider } from "@/contexts/SearchContext";

export const metadata: Metadata = {
  title: "JavaScript Documentation - Complete Reference Guide",
  description:
    "Comprehensive JavaScript documentation with examples and copy-paste code snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-gray-900 text-gray-100`}>
        <SearchProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
