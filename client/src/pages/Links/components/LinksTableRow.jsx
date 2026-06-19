import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../components/ui/IconButton';
import PlatformIcon from '../../../components/ui/PlatformIcon';

const LinksTableRow = ({ link, domain, formatNumber, formatDate, handleCopy }) => {
    const navigate = useNavigate();
    // Right now, we assume all links are active since we don't have expiration in schema
    const isExpired = false; 
    const status = 'Active';
    
    return (
        <tr className={`hover:bg-surface-container-lowest/50 transition-colors min-h-[56px] group ${isExpired ? 'opacity-75' : ''}`}>
            <td className="p-4">
                <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container" type="checkbox" />
            </td>
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <PlatformIcon platform={link.platform || 'web'} />
                    <div className="truncate max-w-[300px]" title={link.longUrl}>
                        {link.longUrl}
                    </div>
                </div>
            </td>
            <td className="p-4">
                <a 
                    className={`font-mono-sm ${isExpired ? 'text-on-surface-variant line-through' : 'text-primary hover:underline'}`} 
                    href={`${domain}/${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {domain}/{link.shortUrl}
                </a>
            </td>
            <td className={`p-4 text-right font-medium ${isExpired ? 'text-on-surface-variant' : ''}`}>
                {formatNumber(link.clicks)}
            </td>
            <td className="p-4 text-on-surface-variant">{formatDate(link.createdAt)}</td>
            <td className="p-4 text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${isExpired ? 'bg-surface-container text-on-surface-variant' : 'bg-success-container/20 text-success'}`}>
                    {status}
                </span>
            </td>
            <td className="p-4">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isExpired && (
                        <IconButton icon="content_copy" onClick={() => handleCopy(link.shortUrl)} className="p-1! hover:text-primary! [&>span]:text-[18px]!" title="Copy" />
                    )}
                    <IconButton icon="bar_chart" onClick={() => navigate(`/analytics/${link.shortUrl}`)} className="p-1! hover:text-primary! [&>span]:text-[18px]!" title="Analytics" />
                    {!isExpired ? (
                        <IconButton icon="more_vert" className="p-1! hover:text-primary! [&>span]:text-[18px]!" title="More" />
                    ) : (
                        <IconButton icon="delete" className="p-1! hover:text-error! [&>span]:text-[18px]!" title="Delete" />
                    )}
                </div>
            </td>
        </tr>
    );
};

export default LinksTableRow;
