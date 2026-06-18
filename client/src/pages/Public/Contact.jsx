import React from 'react';
import Button from '../../components/ui/Button';

const Contact = () => {
    return (
        <div className="max-w-3xl mx-auto py-16 px-6">
            <h1 className="text-display-md font-bold text-on-surface mb-4">Contact Us</h1>
            <p className="text-body-lg text-on-surface-variant mb-8">Have a question or need help? Fill out the form below and our team will get back to you within 24 hours.</p>
            
            <form className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-label-md font-bold text-on-surface">First Name</label>
                        <input type="text" className="w-full bg-transparent border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-label-md font-bold text-on-surface">Last Name</label>
                        <input type="text" className="w-full bg-transparent border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Doe" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-label-md font-bold text-on-surface">Email Address</label>
                    <input type="email" className="w-full bg-transparent border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="jane@example.com" />
                </div>
                
                <div className="space-y-2">
                    <label className="text-label-md font-bold text-on-surface">Message</label>
                    <textarea className="w-full bg-transparent border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[150px]" placeholder="How can we help you?"></textarea>
                </div>
                
                <Button className="w-full py-4 text-body-lg font-bold">Send Message</Button>
            </form>
        </div>
    );
};

export default Contact;
