import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { urlsTable } from "./url.model.js";

export const clicksTable = pgTable("clicks", {
    id: uuid().defaultRandom().primaryKey(),
    urlId: uuid().references(() => urlsTable.id, { onDelete: 'cascade' }),
    timestamp: timestamp().defaultNow(),
    ipAddress: varchar("ip_address", { length: 255 }),
    referrer: varchar("referrer", { length: 255 }),
    device: varchar("device", { length: 255 }),
    country: varchar("country", { length: 255 }),
    city: varchar("city", { length: 255 })
});