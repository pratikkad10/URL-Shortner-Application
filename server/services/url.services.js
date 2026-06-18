import db from "../db/index.js";
import { urlsTable, clicksTable } from "../models/index.js";
import { and, eq, count, desc, sql } from "drizzle-orm";

export async function createUrl(shortUrl, longUrl, userId) {
    const [response] = await db.insert(urlsTable).values({
        shortUrl,
        longUrl,
        userId
    }).returning({ userId: urlsTable.userId, shortUrl: urlsTable.shortUrl, longUrl: urlsTable.longUrl });
    return response;
}

export async function findUrlByShortUrl(shortUrl) {
    const [url] = await db.select().from(urlsTable).where(eq(urlsTable.shortUrl, shortUrl)).limit(1);
    return url;
}


export async function findUrlsByUserId(userId) {
    const urls = await db.select({
        id: urlsTable.id,
        shortUrl: urlsTable.shortUrl,
        longUrl: urlsTable.longUrl,
        createdAt: urlsTable.createdAt,
        clicks: sql`count(${clicksTable.id})`.mapWith(Number)
    })
        .from(urlsTable)
        .leftJoin(clicksTable, eq(urlsTable.id, clicksTable.urlId))
        .where(eq(urlsTable.userId, userId))
        .groupBy(urlsTable.id)
        .orderBy(desc(urlsTable.createdAt));

    return urls;
}

export async function deleteUrlByShortUrl(shortUrl, userId) {
    await db.delete(urlsTable).where(and(
        eq(urlsTable.shortUrl, shortUrl),
        eq(urlsTable.userId, userId)
    ));
}

export async function updateUrl(id, shortUrl, longUrl, userId) {
    const [response] = await db.update(urlsTable).set({
        shortUrl,
        longUrl,
        userId
    }).where(and(
        eq(urlsTable.id, id),
        eq(urlsTable.userId, userId)
    )).returning({ id: urlsTable.id, userId: urlsTable.userId, shortUrl: urlsTable.shortUrl, longUrl: urlsTable.longUrl });
    return response;
}

export async function findUrlById(id, userId) {
    const [url] = await db.select().from(urlsTable).where(and(
        eq(urlsTable.id, id),
        eq(urlsTable.userId, userId)
    ));
    return url;
}

export async function logClick(urlId, ipAddress, referrer, device) {
    const [response] = await db.insert(clicksTable).values({
        urlId,
        ipAddress,
        referrer,
        device
    }).returning();
    return response;
}