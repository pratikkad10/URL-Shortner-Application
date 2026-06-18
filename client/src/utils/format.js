export const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    
    if (seconds < 10) return "Just now";
    return Math.floor(seconds) + " seconds ago";
};

// Returns the base domain for shortened URLs (e.g. localhost:5000 in dev)
export const getShortUrlBase = () => {
    // Try to extract host from API URL or fallback to localhost:5000
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    try {
        const urlObj = new URL(apiUrl);
        return urlObj.host;
    } catch (e) {
        return 'localhost:5000';
    }
};
