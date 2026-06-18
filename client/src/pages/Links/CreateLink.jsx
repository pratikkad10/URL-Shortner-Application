import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateLinkForm from './components/CreateLinkForm';
import CreateLinkSuccess from './components/CreateLinkSuccess';

const CreateLink = () => {
    const [successState, setSuccessState] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');

    const handleGenerate = (formData) => {
        // Here you would typically make an API call to create the link
        const finalAlias = formData.alias || Math.random().toString(36).substring(2, 8);
        setGeneratedLink(`linksnap.io/${finalAlias}`);
        setSuccessState(true);
    };

    const resetForm = () => {
        setSuccessState(false);
        setGeneratedLink('');
    };

    return (
        <div className="p-4 md:p-8 max-w-container-max mx-auto w-full flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-[640px] mb-6 flex justify-start items-center relative z-10">
                <Link to="/links" className="flex items-center text-on-surface-variant hover:text-primary transition-colors text-label-md font-label-md gap-2">
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Back to Links
                </Link>
            </div>

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
