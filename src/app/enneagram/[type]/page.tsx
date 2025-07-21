"use client";

import { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import EnneagramCard from "@/components/enneagram/EnneagramCard";
import { useEnneagram } from "@/contexts/EnneagramContext";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { type } = use(params);
  const { enneagrams } = useEnneagram();
  const [enneagram, setEnneagram] = useState<Enneagram | null>(null);

  useEffect(() => {
    if (!enneagrams || enneagrams.length === 0) return;
    setEnneagram(enneagrams.find(enneagram => enneagram.type === parseInt(type)) || null);
  }, [enneagrams, type]);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="relative flex flex-col flex-grow pt-16 pb-12 w-full h-full items-center">
        <div className="flex justify-center items-center w-full h-full">
          {enneagram
            ? <EnneagramCard enneagram={enneagram} />
            : <Loader />}
        </div>
      </main>
      <Footer />
    </div>
  );
}