import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-surface flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {/* Header section */}
                <div className="mb-8 text-center">
                    <h1 className="text-headline-lg font-semibold text-on-surface tracking-tight mb-3">Privacy Policy</h1>
                    <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
                        We are committed to protecting your personal information and your right to privacy.
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
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">1. Information We Collect</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>We collect information you provide directly to us when you create an account, create short links, or communicate with us. This includes:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li><strong className="text-on-surface font-medium">Account Information:</strong> Your email address, name, and password.</li>
                                    <li><strong className="text-on-surface font-medium">Usage Data:</strong> Analytics regarding the links you generate and track, including click counts, geographic data, and referrers.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">2. How We Use Information</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>We use the information we collect to operate, maintain, and improve our services. Specifically, we use your data to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Provide and maintain our URL shortening and tracking services.</li>
                                    <li>Analyze usage patterns and improve user experience.</li>
                                    <li>Send administrative information, such as updates to our terms or policies.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">3. Data Security</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>We implement a variety of security measures to maintain the safety of your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk.</p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-title-lg font-semibold text-on-surface mb-3 pb-2 border-b border-outline-variant">4. Contact Us</h2>
                            <div className="space-y-3 text-body-md text-on-surface-variant leading-relaxed">
                                <p>If you have any questions about this Privacy Policy or our data practices, please reach out to us at:</p>
                                <div className="bg-surface-container p-4 rounded-lg mt-3 border border-outline-variant">
                                    <p className="font-medium text-on-surface">LinkSnap Privacy Team</p>
                                    <p>Email: <a href="mailto:privacy@linksnap.com" className="text-primary hover:underline">privacy@linksnap.com</a></p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
