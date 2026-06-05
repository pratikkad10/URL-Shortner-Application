import { pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  shortUrl: varchar({ length: 255 }).notNull().unique(),
  longUrl: text().notNull(),
  userId: uuid().notNull().references(() => usersTable.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});
