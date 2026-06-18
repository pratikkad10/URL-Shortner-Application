import React from 'react';
import IconButton from '../../../components/ui/IconButton';

const linksData = [
    {
        id: 1,
        platform: 'web',
        originalUrl: 'https://www.example.com/marketing/campaign-q3-launch-details-v2',
        shortUrl: 'lsnp.co/q3-launch',
        clicks: '12,450',
        createdAt: 'Oct 24, 2023',
        status: 'Active'
    },
    {
        id: 2,
        platform: 'youtube',
        originalUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
        shortUrl: 'lsnp.co/demo-vid',
        clicks: '3,192',
        createdAt: 'Oct 22, 2023',
        status: 'Active'
    },
    {
        id: 3,
        platform: 'article',
        originalUrl: 'https://blog.example.com/2023/10/product-update-v2-1',
        shortUrl: 'lsnp.co/update-oct',
        clicks: '845',
        createdAt: 'Oct 15, 2023',
        status: 'Expired'
    }
];

const PlatformIcon = ({ platform }) => {
    if (platform === 'youtube') {
        return (
            <div className="w-6 h-6 bg-[#FFEBE6] text-[#FF5630] rounded flex items-center justify-center shrink-0 font-bold text-[10px]">
                yt
            </div>
        );
    }
    
    const iconName = platform === 'article' ? 'article' : 'language';
    
    return (
        <div className="w-6 h-6 bg-surface-container-high rounded flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">{iconName}</span>
        </div>
    );
};

const LinksTable = () => {
    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
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
                        {linksData.map((link) => {
                            const isExpired = link.status === 'Expired';
                            
                            return (
                                <tr key={link.id} className={`hover:bg-surface-container-lowest/50 transition-colors min-h-[56px] group ${isExpired ? 'opacity-75' : ''}`}>
                                    <td className="p-4">
                                        <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container" type="checkbox" />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <PlatformIcon platform={link.platform} />
                                            <div className="truncate max-w-[300px]" title={link.originalUrl}>
                                                {link.originalUrl}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <a 
                                            className={`font-mono-sm ${isExpired ? 'text-on-surface-variant line-through' : 'text-primary hover:underline'}`} 
                                            href="#"
                                        >
                                            {link.shortUrl}
                                        </a>
                                    </td>
                                    <td className={`p-4 text-right font-medium ${isExpired ? 'text-on-surface-variant' : ''}`}>
                                        {link.clicks}
                                    </td>
                                    <td className="p-4 text-on-surface-variant">{link.createdAt}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${isExpired ? 'bg-surface-container text-on-surface-variant' : 'bg-success-container/20 text-success'}`}>
                                            {link.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!isExpired && (
                                                <IconButton icon="content_copy" className="p-1! hover:text-primary! [&>span]:text-[18px]!" title="Copy" />
                                            )}
                                            <IconButton icon="bar_chart" className="p-1! hover:text-primary! [&>span]:text-[18px]!" title="Analytics" />
                                            {!isExpired ? (
                                                <IconButton icon="more_vert" className="p-1! hover:text-primary! [&>span]:text-[18px]!" title="More" />
                                            ) : (
                                                <IconButton icon="delete" className="p-1! hover:text-error! [&>span]:text-[18px]!" title="Delete" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between mt-auto">
                <div className="text-body-sm text-on-surface-variant hidden sm:block">
                    Rows per page:
                    <select className="ml-1 border-none bg-transparent text-body-sm font-medium focus:ring-0 p-0 pr-4 outline-none cursor-pointer">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface-variant disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors" disabled>
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="px-3 py-1 bg-primary-container text-on-primary rounded text-label-sm font-label-sm">1</button>
                    <button className="px-3 py-1 hover:bg-surface-container rounded text-label-sm font-label-sm text-on-surface-variant transition-colors">2</button>
                    <button className="px-3 py-1 hover:bg-surface-container rounded text-label-sm font-label-sm text-on-surface-variant transition-colors">3</button>
                    <span className="px-2 text-on-surface-variant">...</span>
                    <button className="px-3 py-1 hover:bg-surface-container rounded text-label-sm font-label-sm text-on-surface-variant transition-colors">25</button>
                    <button className="p-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinksTable;
