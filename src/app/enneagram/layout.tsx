import { EnneagramProvider } from "@/contexts/EnneagramContext";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <EnneagramProvider>
      {children}
    </EnneagramProvider>
  );
}