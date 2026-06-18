import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import IconButton from '../../../components/ui/IconButton';
import { urlService } from '../../../services/urlService';
import { toast } from 'sonner';
import { getShortUrlBase } from '../../../utils/format';

const RecentLinksTable = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await urlService.getCodes();
                if (response.success) {
                    setLinks(response.data);
                }
            } catch (error) {
                toast.error("Failed to load recent links");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();
    }, []);

    // Helper to format numbers (e.g. 1248 -> 1,248)
    const formatNumber = (num) => num?.toLocaleString() || '0';
    
    const domain = getShortUrlBase();

    const handleCopy = (shortUrl) => {
        const fullUrl = `${domain}/${shortUrl}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Recent Links</h3>
                <Button variant="ghost" size="sm" className="text-primary! hover:bg-surface-container!">
                    View All
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider border-b border-outline-variant">
                            <th className="p-4 font-medium">Short URL</th>
                            <th className="p-4 font-medium">Original URL</th>
                            <th className="p-4 font-medium text-right">Clicks</th>
                            <th className="p-4 font-medium w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-outline-variant">
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-on-surface-variant">
                                    Loading...
                                </td>
                            </tr>
                        ) : links.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-on-surface-variant">
                                    No links created yet
                                </td>
                            </tr>
                        ) : (
                            // Only show the 5 most recent links in the dashboard table
                            links.slice(0, 5).map((link) => (
                                <tr key={link.id} className="hover:bg-surface/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary font-mono-sm">{domain}/{link.shortUrl}</span>
                                            <IconButton
                                                icon="content_copy"
                                                onClick={() => handleCopy(link.shortUrl)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1! hover:text-primary! [&>span]:text-[16px]"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 truncate max-w-[200px] text-on-surface-variant" title={link.longUrl}>
                                        {link.longUrl}
                                    </td>
                                    <td className="p-4 text-right font-medium">{formatNumber(link.clicks)}</td>
                                    <td className="p-4">
                                        <IconButton icon="more_vert" />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentLinksTable;
