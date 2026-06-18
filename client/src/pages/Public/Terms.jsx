import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-surface flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {/* Header section */}
                <div className="mb-8 text-center">
                    <h1 className="text-headline-lg font-semibold text-on-surface tracking-tight mb-3">Terms of Service</h1>
                    <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
                        Please read these terms carefully before using our platform.
                    </p>
                    <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant text-body-sm font-medium text-on-surface-variant">
                        Last Updated: <span className="text-on-surface ml-1 font-semibold">June 18, 2026</span>
                    </div>
                </div>

                {/* Content section */}
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-6 md:p-10 space-y-8">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">1. Acceptance of Terms</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>By accessing or using LinkSnap ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">2. Acceptable Use Policy</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>You agree not to use the Service to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Create links to malicious, illegal, or harmful content (e.g., malware, phishing sites).</li>
                                    <li>Distribute spam or unsolicited bulk messages.</li>
                                    <li>Violate the intellectual property rights of others.</li>
                                </ul>
                                <p>We reserve the right to immediately terminate accounts and delete links that violate this policy without prior notice.</p>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">3. Service Reliability & Availability</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>While we strive to provide 99.9% uptime, the Service is provided on an "as is" and "as available" basis. LinkSnap makes no warranties, expressed or implied, regarding the continuous availability of the platform.</p>
                            </div>
                        </section>
                        
                        {/* Section 4 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">4. Limitation of Liability</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>In no event shall LinkSnap, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the Service.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
