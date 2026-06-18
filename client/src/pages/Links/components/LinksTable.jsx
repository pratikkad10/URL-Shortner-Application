import React from 'react';
import { toast } from 'sonner';
import { getShortUrlBase } from '../../../utils/format';
import Pagination from '../../../components/ui/Pagination';
import LinksTableRow from './LinksTableRow';

const LinksTable = ({ 
    links, 
    isLoading, 
    page, 
    setPage, 
    limit, 
    setLimit, 
    totalPages, 
    totalItems 
}) => {
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
