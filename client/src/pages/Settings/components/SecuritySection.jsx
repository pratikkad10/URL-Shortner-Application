import React, { useState } from 'react';
import { toast } from 'sonner';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { authService } from '../../../services/authService';

const SecuritySection = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!oldPassword || !newPassword) {
            toast.error("Please fill in both password fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await authService.changePassword({ oldPassword, newPassword });
            if (response.success) {
                toast.success("Password updated successfully");
                setOldPassword('');
                setNewPassword('');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6" id="security">
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6">Security</h2>
            
            <div className="mb-4">
                <h3 className="text-label-md font-label-md text-on-surface mb-4">Change Password</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        id="currentPassword" 
                        type="password" 
                        label="Current Password" 
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        containerClassName="md:w-2/3 bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                        required
                    />
                    <Input 
                        id="newPassword" 
                        type="password" 
                        label="New Password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        containerClassName="md:w-2/3 bg-background border border-outline-variant rounded focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[40px]" 
                        required
                    />
                    <div className="pt-2">
                        <Button 
                            type="submit" 
                            variant="outline" 
                            className="px-4 py-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SecuritySection;
