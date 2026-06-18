import { pgTable, varchar, boolean, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  isVerified: boolean().default(false),
  termsAccepted: boolean().default(false).notNull(),
  verificationToken: varchar({ length: 255 }),
  resetPasswordOtp: varchar({ length: 6 }),
  resetPasswordOtpExpiry: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});