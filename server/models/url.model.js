import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  shortUrl: varchar({ length: 255 }).notNull().unique(),
  longUrl: text().notNull(),
  userId: uuid().notNull().references(() => usersTable.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});