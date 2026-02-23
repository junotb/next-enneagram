export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-theme-background text-theme-text transition-colors duration-500">
      <main className="relative flex flex-col flex-grow items-center py-8 w-full min-h-screen space-y-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}