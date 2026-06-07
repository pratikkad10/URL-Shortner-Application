import db from "../db/index.js";
import { urlsTable } from "../models/index.js";

export async function createUrl(shortUrl, longUrl, userId) {
    const [response] = await db.insert(urlsTable).values({
        shortUrl,
        longUrl,
        userId
    }).returning({ userId: urlsTable.userId, shortUrl: urlsTable.shortUrl, longUrl: urlsTable.longUrl });
    return response;
}