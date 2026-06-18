import React from 'react';
import Button from '../../../components/ui/Button';
import IconButton from '../../../components/ui/IconButton';

const RecentLinksTable = () => {
    const links = [
        { short: 'lsnp.co/q9x2', original: 'https://example.com/marketing/campaign-2024', clicks: '1,204' },
        { short: 'lsnp.co/promo', original: 'https://example.com/store/promotions/summer', clicks: '856' },
        { short: 'lsnp.co/beta', original: 'https://app.example.com/signup?ref=beta', clicks: '342' },
        { short: 'lsnp.co/docs', original: 'https://docs.example.com/api/v2/reference', clicks: '128' },
    ];

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
                        {links.map((link, idx) => (
                            <tr key={idx} className="hover:bg-surface/50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-mono-sm">{link.short}</span>
                                        <IconButton
                                            icon="content_copy"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1! hover:text-primary! [&>span]:text-[16px]"
                                        />
                                    </div>
                                </td>
                                <td className="p-4 truncate max-w-[200px] text-on-surface-variant">{link.original}</td>
                                <td className="p-4 text-right font-medium">{link.clicks}</td>
                                <td className="p-4">
                                    <IconButton icon="more_vert" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentLinksTable;
