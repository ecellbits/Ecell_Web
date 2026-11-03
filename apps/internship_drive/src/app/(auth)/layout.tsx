import { Footer } from "@/components/layout/footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-accent-lime/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-accent-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex items-center justify-center py-12 px-4 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
