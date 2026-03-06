import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background text-accent/80 font-body selection:bg-accent/20">
                <div className="max-w-4xl mx-auto px-4 py-40 leading-relaxed">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}
