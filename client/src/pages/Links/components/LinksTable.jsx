import React, { useState, useEffect } from 'react';
import { urlService } from '../../../services/urlService';
import { toast } from 'sonner';
import { getShortUrlBase } from '../../../utils/format';
import Pagination from '../../../components/ui/Pagination';
import LinksTableRow from './LinksTableRow';

const LinksTable = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchLinks = async () => {
        setIsLoading(true);
        try {
            const response = await urlService.getCodes(page, limit);
            if (response.success) {
                setLinks(response.data.items || []);
                if (response.data.pagination) {
                    setTotalPages(response.data.pagination.totalPages);
                    setTotalItems(response.data.pagination.totalItems);
                }
            }
        } catch (error) {
            toast.error("Failed to load links");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [page, limit]);

    const domain = getShortUrlBase();

    const handleCopy = (shortUrl) => {
        const fullUrl = `${domain}/${shortUrl}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Link copied to clipboard!");
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    
    const formatNumber = (num) => num?.toLocaleString() || '0';

    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                            <th className="p-4 w-12">
                                <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container" type="checkbox" />
                            </th>
                            <th className="p-4 font-medium">Original URL</th>
                            <th className="p-4 font-medium w-48">Short URL</th>
                            <th className="p-4 font-medium w-32 text-right">Clicks</th>
                            <th className="p-4 font-medium w-40">Created</th>
                            <th className="p-4 font-medium w-32 text-center">Status</th>
                            <th className="p-4 font-medium w-32 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-outline-variant">
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="p-12 text-center text-on-surface-variant">
                                    Loading links...
                                </td>
                            </tr>
                        ) : links.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-12 text-center text-on-surface-variant">
                                    No links found. Create your first short link to get started!
                                </td>
                            </tr>
                        ) : (
                            links.map((link) => (
                                <LinksTableRow 
                                    key={link.id} 
                                    link={link} 
                                    domain={domain} 
                                    formatDate={formatDate} 
                                    formatNumber={formatNumber} 
                                    handleCopy={handleCopy} 
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination 
                page={page} 
                setPage={setPage} 
                limit={limit} 
                setLimit={setLimit} 
                totalPages={totalPages} 
                totalItems={totalItems} 
                isLoading={isLoading} 
            />
        </div>
    );
};

export default LinksTable;
