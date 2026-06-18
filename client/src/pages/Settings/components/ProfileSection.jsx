import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProfileSection = () => {
    return (
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6" id="profile">
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6">Profile Information</h2>
            
            <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-surface-variant overflow-hidden border border-outline-variant flex items-center justify-center relative group cursor-pointer">
                    <span className="material-symbols-outlined text-outline text-3xl">person</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white">upload</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-label-md font-label-md text-on-surface mb-1">Avatar</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mb-3">JPG, GIF or PNG. 1MB max.</p>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="px-4 py-1.5 font-label-sm h-auto">Upload</Button>
                        <Button variant="ghost" size="sm" className="px-4 py-1.5 font-label-sm text-error hover:bg-error-container/20 hover:text-error h-auto">Remove</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                        id="firstName" 
                        label="First Name" 
                        defaultValue="Jane" 
                        containerClassName="bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                    />
                    <Input 
                        id="lastName" 
                        label="Last Name" 
                        defaultValue="Doe" 
                        containerClassName="bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                    />
                </div>
                <Input 
                    id="email" 
                    type="email" 
                    label="Email Address" 
                    defaultValue="jane.doe@example.com" 
                    containerClassName="bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                />
                
                <div className="space-y-2 w-full">
                    <label className="block text-label-md font-label-md text-on-surface" htmlFor="bio">Bio</label>
                    <textarea 
                        className="w-full border border-outline-variant rounded-md p-3 font-body-md text-on-surface bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" 
                        id="bio" 
                        rows="3" 
                        defaultValue="Product Manager focused on building seamless user experiences."
                    ></textarea>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button className="px-6 py-2">Save Changes</Button>
            </div>
        </section>
    );
};

export default ProfileSection;
