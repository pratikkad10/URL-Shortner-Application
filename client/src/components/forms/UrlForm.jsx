import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { urlService } from '../../services/urlService';
import { toast } from 'sonner';
import Input from '../ui/Input';
import Button from '../ui/Button';

const UrlForm = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [longUrl, setLongUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!longUrl) return;

        if (!user) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const response = await urlService.shortenUrl({ longUrl });
            if (response.success) {
                toast.success('Link shortened successfully!');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to shorten URL');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto glass-panel p-2 rounded-xl flex flex-col sm:flex-row items-center shadow-lg focus-ring bg-surface-container-lowest gap-2 sm:gap-0">
            <div className="w-full grow">
                <Input 
                    id="hero-url-input"
                    name="url"
                    aria-label="URL to shorten" 
                    icon="link"
                    placeholder="Paste your long URL here..." 
                    type="url" 
                    required
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    containerClassName="border-none shadow-none bg-transparent h-[48px]"
                />
            </div>
            <Button type="submit" size="lg" className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0" disabled={isLoading}>
                {isLoading ? "Shortening..." : "Shorten Now"}
            </Button>
        </form>
    );
};

export default UrlForm;
