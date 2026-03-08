import Navbar from "@/Components/old_components/layout/Navbar";
import Footer from "@/Components/old_components/layout/Footer";
import { Head, usePage } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const { siteName } = usePage().props as any;
    const name = siteName || 'SMARTOUIES';
    const domain = name.toLowerCase() + '.fr';

    return (
        <div className="bg-background min-h-screen text-accent/80 font-body selection:bg-accent/20">
            <Head title={`Privacy Policy | ${name}`} />
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-40 leading-relaxed">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-accent mb-12 tracking-tight">
                    Privacy Policy
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">1. Information Collection</h2>
                        <p>
                            At {name}, we prioritize your privacy. We collect minimal data necessary to provide our digital engineering services. This includes contact information submitted via our forms and basic analytics data to improve our platform's performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">2. Use of Data</h2>
                        <p>
                            The information we collect is strictly used to communicate with you regarding your projects, improve our website's typography and layout, and ensure our Headless Architecture maintains its 99.9% uptime. We do not sell, rent, or trade your personal information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">3. Data Security</h2>
                        <p>
                            We implement elite-tier security measures, including end-to-end encryption for all form submissions and secure server architecture, to protect your personal information from unauthorized access or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">4. Cookies</h2>
                        <p>
                            Our website uses strictly necessary cookies to ensure basic functionality. We do not use intrusive tracking cookies, maintaining our commitment to a weightless and frictionless digital experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-accent mb-4">5. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact our legal team at:
                            <br />
                            <a href={`mailto:legal@${domain}`} className="text-accent hover:underline mt-2 inline-block">
                                legal@{domain}
                            </a>
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
