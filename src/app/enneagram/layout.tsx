import { EnneagramProvider } from "@/contexts/EnneagramContext";

export default function EnneagramLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <EnneagramProvider>
      {children}
    </EnneagramProvider>
  );
}