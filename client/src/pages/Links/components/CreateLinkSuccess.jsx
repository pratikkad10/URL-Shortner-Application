import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../../../components/ui/Button';

const CreateLinkSuccess = ({ generatedLink, onReset }) => {
    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="w-full max-w-[640px] bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h2 className="text-headline-md font-headline-md mb-2">Link Created Successfully!</h2>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6">Your new trackable link is ready to share.</p>

            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-primary shrink-0">link</span>
                    <span className="text-body-lg font-mono-sm tracking-tight truncate">{generatedLink}</span>
                </div>
                <Button
                    variant="outline"
                    className="bg-surface-container-lowest gap-1 ml-4 shrink-0"
                    onClick={handleCopy}
                >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    Copy
                </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 border-t border-outline-variant/50 pt-6">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-surface-container-highest rounded border border-outline-variant flex items-center justify-center mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-surface-variant opacity-20"></div>
                        <span className="material-symbols-outlined text-[48px] text-on-surface-variant">qr_code_2</span>
                    </div>
                    <button className="text-primary text-label-sm font-label-sm hover:underline">Download QR Code</button>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <Button className="w-full" onClick={() => navigate('/analytics')}>View Analytics</Button>
                    <Button variant="outline" className="w-full" onClick={onReset}>Create Another Link</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateLinkSuccess;
