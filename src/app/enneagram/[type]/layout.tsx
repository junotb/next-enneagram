import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-sans flex flex-col h-full">
      <Header />
      <main className="relative flex flex-col flex-grow items-center pt-16 pb-12 w-full h-full space-y-4 overflow-y-auto">
        {children }
      </main>
      <Footer />
    </div>
  );
}