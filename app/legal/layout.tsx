import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050505] text-white/80 font-body selection:bg-white/20">
                <div className="max-w-4xl mx-auto px-4 py-40 leading-relaxed">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}
