import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SecuritySection = () => {
    return (
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6" id="security">
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6">Security</h2>
            
            <div className="mb-8">
                <h3 className="text-label-md font-label-md text-on-surface mb-4">Change Password</h3>
                <div className="space-y-4">
                    <Input 
                        id="currentPassword" 
                        type="password" 
                        label="Current Password" 
                        containerClassName="md:w-2/3 bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                    />
                    <Input 
                        id="newPassword" 
                        type="password" 
                        label="New Password" 
                        containerClassName="md:w-2/3 bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                    />
                    <div className="pt-2">
                        <Button variant="outline" className="px-4 py-2">Update Password</Button>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-outline-variant flex items-center justify-between">
                <div>
                    <h3 className="text-label-md font-label-md text-on-surface">Two-Factor Authentication</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Add an extra layer of security to your account.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" value="" />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
        </section>
    );
};

export default SecuritySection;
