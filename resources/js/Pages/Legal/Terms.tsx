import Navbar from "@/Components/old_components/layout/Navbar";
import Footer from "@/Components/old_components/layout/Footer";
import { Head, usePage } from '@inertiajs/react';

export default function TermsOfService() {
    const { siteName } = usePage().props as any;
    const name = siteName || 'SMARTOUIES';

    return (
        <div className="bg-background min-h-screen text-accent/80 font-body selection:bg-accent/20">
            <Head title={`Terms of Service | ${name}`} />
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-40 leading-relaxed">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-accent mb-12 tracking-tight">
                    Terms of Service / <br />
                    <span className="text-neutral-500">Conditions Générales d'Utilisation (CGU)</span>
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and utilizing the digital infrastructure and services provided by {name}, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using our platforms and proprietary architectures.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">2. Intellectual Property</h2>
                        <p>
                            All custom code, UI/UX designs, animations, and system architectures developed by {name} remain our exclusive intellectual property until full transfer of rights is officially executed under separate contractual agreement. You may not reverse-engineer or duplicate our Swiss Design implementations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">3. Limitation of Liability</h2>
                        <p>
                            While we architect systems for digital weightlessness and 99.9% uptime, {name} shall not be held liable for indirect, incidental, or consequential damages resulting from the use or inability to use our services, including data loss or business interruption.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">4. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of France. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts of Paris.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-border/10 text-sm text-neutral-500">
                        Last Updated: March 2026
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
