import React from 'react';
import { getFlagEmoji, getCountryName } from '../../../utils/country';

const TopCountries = ({ data = [] }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="col-span-1 md:col-span-6 lg:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">Top Countries</h3>
            
            {data.length > 0 ? (
                <div className="space-y-5 flex-1">
                    {data.map((country, index) => {
                        const percentage = total > 0 ? Math.round((country.value / total) * 100) : 0;
                        const fullName = getCountryName(country.name);
                        
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1 text-body-sm font-body-sm">
                                    <span className="flex items-center gap-2 truncate pr-2">
                                        <span className="text-xl">{getFlagEmoji(country.name)}</span> 
                                        <span className="truncate" title={fullName}>{fullName}</span>
                                    </span>
                                    <span className="font-medium whitespace-nowrap">{country.value.toLocaleString()} ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-surface-variant rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-on-surface-variant">
                    No country data available.
                </div>
            )}
        </div>
    );
};

export default TopCountries;
