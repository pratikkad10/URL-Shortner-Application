import { count, and, eq, gte, lte, desc, sql } from "drizzle-orm";
import db from "../db/index.js";
import { urlsTable, clicksTable } from "../models/index.js";

function calculateGrowth(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number((((current - previous) / previous) * 100).toFixed(1));
}

export async function getDashboardStats(userId) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Total Links (All time vs All time up to 30 days ago)
    const [currentLinksRes] = await db.select({ count: count() })
        .from(urlsTable)
        .where(eq(urlsTable.userId, userId));
    const currentLinks = currentLinksRes.count;

    const [recentLinksRes] = await db.select({ count: count() })
        .from(urlsTable)
        .where(and(eq(urlsTable.userId, userId), gte(urlsTable.createdAt, thirtyDaysAgo)));
    const previousLinks = currentLinks - recentLinksRes.count;

    const linksGrowth = calculateGrowth(currentLinks, previousLinks);

    // Total Clicks
    const [currentClicksRes] = await db.select({ count: count() })
        .from(clicksTable)
        .innerJoin(urlsTable, eq(clicksTable.urlId, urlsTable.id))
        .where(
            and(
                eq(urlsTable.userId, userId),
                gte(clicksTable.timestamp, thirtyDaysAgo)
            )
        );

    const [previousClicksRes] = await db.select({ count: count() })
        .from(clicksTable)
        .innerJoin(urlsTable, eq(clicksTable.urlId, urlsTable.id))
        .where(
            and(
                eq(urlsTable.userId, userId),
                gte(clicksTable.timestamp, sixtyDaysAgo),
                lte(clicksTable.timestamp, thirtyDaysAgo)
            )
        );

    const currentClicksLast30 = currentClicksRes.count;
    const previousClicks = previousClicksRes.count;
    const clicksGrowth = calculateGrowth(currentClicksLast30, previousClicks);

    const [totalClicksRes] = await db.select({ count: count() })
        .from(clicksTable)
        .innerJoin(urlsTable, eq(clicksTable.urlId, urlsTable.id))
        .where(eq(urlsTable.userId, userId));
    const totalClicks = totalClicksRes.count;

    // Active Links (Links clicked in timeframe)
    const [activeLinksRes] = await db.select({ count: sql`count(distinct ${clicksTable.urlId})`.mapWith(Number) })
        .from(clicksTable)
        .innerJoin(urlsTable, eq(clicksTable.urlId, urlsTable.id))
        .where(
            and(
                eq(urlsTable.userId, userId),
                gte(clicksTable.timestamp, thirtyDaysAgo)
            )
        );

    const [prevActiveLinksRes] = await db.select({ count: sql`count(distinct ${clicksTable.urlId})`.mapWith(Number) })
        .from(clicksTable)
        .innerJoin(urlsTable, eq(clicksTable.urlId, urlsTable.id))
        .where(
            and(
                eq(urlsTable.userId, userId),
                gte(clicksTable.timestamp, sixtyDaysAgo),
                lte(clicksTable.timestamp, thirtyDaysAgo)
            )
        );

    const activeLinks = activeLinksRes.count;
    const prevActiveLinks = prevActiveLinksRes.count;
    const activeLinksGrowth = calculateGrowth(activeLinks, prevActiveLinks);

    // Avg Conversion (Defined as % of Active Links / Total Links)
    const currentConversion = currentLinks > 0 ? (activeLinks / currentLinks) * 100 : 0;
    const prevConversion = previousLinks > 0 ? (prevActiveLinks / previousLinks) * 100 : 0;
    const conversionGrowth = currentConversion - prevConversion;

    // Recent Activity Feed
    const rawClicks = await db.select({
        id: clicksTable.id,
        timestamp: clicksTable.timestamp,
        shortUrl: urlsTable.shortUrl,
        ipAddress: clicksTable.ipAddress
    })
        .from(clicksTable)
        .innerJoin(urlsTable, eq(clicksTable.urlId, urlsTable.id))
        .where(eq(urlsTable.userId, userId))
        .orderBy(desc(clicksTable.timestamp))
        .limit(5);

    const recentClicks = rawClicks.map(c => ({ ...c, type: 'click' }));

    const rawLinks = await db.select({
        id: urlsTable.id,
        timestamp: urlsTable.createdAt,
        shortUrl: urlsTable.shortUrl,
    })
        .from(urlsTable)
        .where(eq(urlsTable.userId, userId))
        .orderBy(desc(urlsTable.createdAt))
        .limit(5);

    const recentLinks = rawLinks.map(l => ({ ...l, type: 'link' }));

    // Merge and sort newest first
    const recentActivity = [...recentClicks, ...recentLinks]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    return {
        totalLinks: {
            value: currentLinks,
            growth: linksGrowth
        },
        totalClicks: {
            value: totalClicks,
            growth: clicksGrowth
        },
        activeLinks: {
            value: activeLinks,
            growth: activeLinksGrowth
        },
        avgConversion: {
            value: Number(currentConversion.toFixed(1)),
            growth: Number(conversionGrowth.toFixed(1))
        },
        recentActivity
    };
}

export async function getLinkAnalytics(shortUrl, userId, days = 30) {
    const now = new Date();
    const timeframeAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // 1. Verify ownership and get url info
    const [urlInfo] = await db.select({
        id: urlsTable.id,
        createdAt: urlsTable.createdAt,
        longUrl: urlsTable.longUrl
    })
    .from(urlsTable)
    .where(and(eq(urlsTable.shortUrl, shortUrl), eq(urlsTable.userId, userId)));

    if (!urlInfo) {
        throw new Error("URL not found or unauthorized");
    }

    const urlId = urlInfo.id;

    // 2. Get total clicks for this specific link (all-time)
    const [totalClicksRes] = await db.select({ count: count() })
        .from(clicksTable)
        .where(eq(clicksTable.urlId, urlId));
    
    // 3. Get clicks over time for chart
    const clicksOverTimeRaw = await db.select({
        timestamp: clicksTable.timestamp
    })
    .from(clicksTable)
    .where(and(
        eq(clicksTable.urlId, urlId),
        gte(clicksTable.timestamp, timeframeAgo)
    ));

    // Aggregate by date (YYYY-MM-DD)
    const clicksByDateMap = {};
    clicksOverTimeRaw.forEach(click => {
        const dateStr = new Date(click.timestamp).toISOString().split('T')[0];
        clicksByDateMap[dateStr] = (clicksByDateMap[dateStr] || 0) + 1;
    });
    
    const clicksOverTime = Object.keys(clicksByDateMap).map(date => ({
        date,
        clicks: clicksByDateMap[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    // 4. Device Breakdown
    const deviceBreakdownRaw = await db.select({
        device: clicksTable.device,
        count: count()
    })
    .from(clicksTable)
    .where(and(
        eq(clicksTable.urlId, urlId),
        gte(clicksTable.timestamp, timeframeAgo)
    ))
    .groupBy(clicksTable.device);
    
    const deviceBreakdown = deviceBreakdownRaw.map(d => ({
        name: d.device || 'Unknown',
        value: d.count
    }));

    // 5. Top Countries
    const topCountriesRaw = await db.select({
        country: clicksTable.country,
        count: count()
    })
    .from(clicksTable)
    .where(and(
        eq(clicksTable.urlId, urlId),
        gte(clicksTable.timestamp, timeframeAgo)
    ))
    .groupBy(clicksTable.country)
    .orderBy(desc(count()))
    .limit(5);

    const topCountries = topCountriesRaw.map(c => ({
        name: c.country && c.country !== 'Unknown' ? c.country : 'Unknown Location',
        value: c.count
    }));

    // 6. Top Referrers
    const topReferrersRaw = await db.select({
        referrer: clicksTable.referrer,
        count: count()
    })
    .from(clicksTable)
    .where(and(
        eq(clicksTable.urlId, urlId),
        gte(clicksTable.timestamp, timeframeAgo)
    ))
    .groupBy(clicksTable.referrer)
    .orderBy(desc(count()))
    .limit(5);

    const topReferrers = topReferrersRaw.map(r => {
        let name = r.referrer;
        if (!name) name = 'Direct';
        else {
            try { name = new URL(name).hostname; } catch(e) {}
        }
        return { name, value: r.count };
    });

    return {
        urlInfo: {
            shortUrl,
            longUrl: urlInfo.longUrl,
            createdAt: urlInfo.createdAt
        },
        totalClicks: totalClicksRes.count,
        clicksOverTime,
        deviceBreakdown,
        topCountries,
        topReferrers
    };
}