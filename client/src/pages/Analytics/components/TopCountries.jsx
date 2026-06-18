import React from 'react';

const countriesData = [
    { flag: '🇺🇸', name: 'United States', clicks: '45,120', percentage: '36%' },
    { flag: '🇬🇧', name: 'United Kingdom', clicks: '28,500', percentage: '23%' },
    { flag: '🇨🇦', name: 'Canada', clicks: '18,200', percentage: '15%' },
    { flag: '🇦🇺', name: 'Australia', clicks: '12,400', percentage: '10%' },
    { flag: '🇩🇪', name: 'Germany', clicks: '8,100', percentage: '6%' },
];

const TopCountries = () => {
    return (
        <div className="col-span-1 md:col-span-6 lg:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">Top Countries</h3>
            <div className="space-y-5">
                {countriesData.map((country, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-1 text-body-sm font-body-sm">
                            <span className="flex items-center gap-2">
                                <span className="text-xl">{country.flag}</span> {country.name}
                            </span>
                            <span className="font-medium">{country.clicks}</span>
                        </div>
                        <div className="w-full bg-surface-variant rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: country.percentage }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCountries;
