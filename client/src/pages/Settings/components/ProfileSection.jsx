import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'sonner';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/authService';

const ProfileSection = () => {
    const { user, checkAuthStatus } = useAuth();
    const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User';

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!firstName) {
            toast.error("First name is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await authService.updateProfile({ firstName, lastName });
            if (response.success) {
                toast.success("Profile updated successfully");
                await checkAuthStatus();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6" id="profile">
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6">Profile Information</h2>
            
            <form onSubmit={handleSubmit}>

            <div className="flex items-center gap-6 mb-8">
                <div className="relative group hover:scale-105 hover:-rotate-3 transition-all duration-300 shadow-md rounded-full">
                    <Avatar
                        name={fullName}
                        size="80"
                        round={true}
                        className="transition-transform"
                    />
                </div>
                <div>
                    <h3 className="text-label-md font-label-md text-on-surface mb-1">Profile</h3>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        containerClassName="bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]"
                        required
                    />
                    <Input
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        containerClassName="bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]"
                    />
                </div>
                <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    value={user?.email || ""}
                    disabled
                    containerClassName="bg-surface-container-low border border-outline-variant rounded opacity-70 cursor-not-allowed h-[40px]"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col justify-center">
                        <span className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Account Status</span>
                        <div className="flex items-center gap-2">
                            {user?.isVerified ? (
                                <>
                                    <span className="material-symbols-outlined text-success text-[20px]">verified</span>
                                    <span className="text-body-md font-medium text-success">Verified Account</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-error text-[20px]">gpp_maybe</span>
                                    <span className="text-body-md font-medium text-error">Unverified Account</span>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col justify-center">
                        <span className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Member Since</span>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                            <span className="text-body-md font-medium text-on-surface">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) : 'Recently Joined'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button type="submit" className="px-6 py-2" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
            </form>
        </section>
    );
};

export default ProfileSection;
