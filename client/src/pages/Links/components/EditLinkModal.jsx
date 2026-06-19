import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const EditLinkModal = ({ link, onClose, onSave }) => {
    const [longUrl, setLongUrl] = useState(link?.longUrl || '');
    const [shortUrl, setShortUrl] = useState(link?.shortUrl || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await onSave(link.id, { longUrl, shortUrl });
            onClose();
        } catch (error) {
            // Error is handled in the parent component
        } finally {
            setIsSaving(false);
        }
    };

    if (!link) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-outline-variant">
                    <h2 className="text-headline-sm font-headline-sm text-on-surface">Edit Link</h2>
                    <button 
                        onClick={onClose}
                        className="text-on-surface-variant hover:text-on-surface transition-colors rounded-full p-1 hover:bg-surface-container-low"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <Input
                        id="longUrl"
                        name="longUrl"
                        type="url"
                        label="Destination URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                        className="w-full"
                    />
                    
                    <Input
                        id="shortUrl"
                        name="shortUrl"
                        type="text"
                        label="Custom Alias"
                        value={shortUrl}
                        onChange={(e) => setShortUrl(e.target.value)}
                        required
                        className="w-full"
                    />
                    
                    <div className="flex justify-end gap-3 pt-4 mt-2">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isSaving || !longUrl || !shortUrl}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLinkModal;
