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