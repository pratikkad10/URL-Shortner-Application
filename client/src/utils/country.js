/**
 * Converts a 2-letter ISO 3166-1 alpha-2 country code to its corresponding flag emoji.
 * @param {string} countryCode - The 2-letter country code (e.g., 'US', 'IN')
 * @returns {string} The flag emoji or a globe emoji if invalid/unknown
 */
export const getFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode === 'Unknown' || countryCode === 'Unknown Location') return '🌍';
    
    // Ensure it's a 2-letter string
    if (typeof countryCode !== 'string' || countryCode.length !== 2) return '🌍';

    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
        
    try {
        return String.fromCodePoint(...codePoints);
    } catch (e) {
        return '🌍';
    }
};

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

/**
 * Converts a 2-letter ISO 3166-1 alpha-2 country code to its full name.
 * @param {string} countryCode - The 2-letter country code (e.g., 'US', 'IN')
 * @returns {string} The full country name
 */
export const getCountryName = (countryCode) => {
    if (!countryCode || countryCode === 'Unknown' || countryCode === 'Unknown Location') return 'Unknown Location';
    
    try {
        // Only valid 2-letter codes work with Intl.DisplayNames
        if (typeof countryCode === 'string' && countryCode.length === 2) {
            return regionNames.of(countryCode.toUpperCase()) || countryCode;
        }
        return countryCode;
    } catch (e) {
        return countryCode;
    }
};
