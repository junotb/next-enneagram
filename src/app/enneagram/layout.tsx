import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EnneagramProvider } from "@/contexts/EnneagramContext";

export default function EnneagramLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans flex flex-col w-full h-full">
      <Header />
      <main className="flex flex-col items-center w-full h-full overflow-y-auto">
        <EnneagramProvider>
          {children}
        </EnneagramProvider>
      </main>
      <Footer />
    </div>
  );
}