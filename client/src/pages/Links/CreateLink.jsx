import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { urlService } from '../../services/urlService';
import { getShortUrlOrigin } from '../../utils/format';
import CreateLinkForm from './components/CreateLinkForm';
import CreateLinkSuccess from './components/CreateLinkSuccess';

const CreateLink = () => {
    const [successState, setSuccessState] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (formData) => {
        setIsLoading(true);
        try {
            const response = await urlService.shortenUrl({
                longUrl: formData.url,
                shortUrl: formData.alias || undefined,
                expiresAt: formData.expirationDate || undefined,
                utmSource: formData.utmSource || undefined,
                utmMedium: formData.utmMedium || undefined,
                utmCampaign: formData.utmCampaign || undefined
            });

            if (response.success) {
                const baseUrl = getShortUrlOrigin();
                const shortCode = response.data.shortUrl;
                const fullShortUrl = `${baseUrl}/${shortCode}`;

                setGeneratedLink(fullShortUrl);
                setSuccessState(true);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to generate link');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setSuccessState(false);
        setGeneratedLink('');
    };

    return (
        <div className="p-4 md:p-8 max-w-container-max mx-auto w-full flex-1 flex flex-col items-center justify-center">
            {!successState ? (
                <div className="w-full max-w-[640px] bg-surface-container-lowest border border-surface-variant rounded-xl p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),0_2px_4px_-2px_rgb(0_0_0/0.05)] relative overflow-hidden z-10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary"></div>

                    <div className="mb-8 border-b border-outline-variant pb-6 text-center sm:text-left">
                        <h1 className="text-headline-lg font-headline-lg mb-2">Create New Link</h1>
                        <p className="text-body-md font-body-md text-on-surface-variant">Transform your long URL into a trackable, manageable short link.</p>
                    </div>

                    <CreateLinkForm onSubmit={handleGenerate} />
                </div>
            ) : (
                <CreateLinkSuccess generatedLink={generatedLink} onReset={resetForm} />
            )}
        </div>
    );
};

export default CreateLink;
