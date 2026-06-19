import { getDashboardStats, getLinkAnalytics } from "../services/analytics.services.js";

export const getDashboardStatsController = async (req, res) => {
    try {
        const stats = await getDashboardStats(req.user.id);
        
        return res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch dashboard statistics" 
        });
    }
};

export const getLinkAnalyticsController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const days = parseInt(req.query.days) || 30;
        
        const stats = await getLinkAnalytics(shortUrl, req.user.id, days);
        
        return res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error("Link analytics error:", error);
        if (error.message === "URL not found or unauthorized") {
            return res.status(404).json({ success: false, message: error.message });
        }
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch link analytics" 
        });
    }
};
