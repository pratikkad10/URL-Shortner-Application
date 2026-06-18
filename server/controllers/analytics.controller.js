import { getDashboardStats } from "../services/analytics.services.js";

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
