import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";
import db from "../db/index.js"

export async function getUserByEmail(email, { includePassword = false } = {}) {
    const selectFields = {
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        resetPasswordOtp: usersTable.resetPasswordOtp,
        resetPasswordOtpExpiry: usersTable.resetPasswordOtpExpiry,
    };

    if (includePassword) {
        selectFields.password = usersTable.password;
    }

    const [user] = await db.select(selectFields)
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return user;
}

export async function getUserById(userId, { includePassword = true } = {}) {
    const selectFields = {
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        isVerified: usersTable.isVerified,
    };

    if (includePassword) {
        selectFields.password = usersTable.password;
    }

    const [user] = await db.select(selectFields)
        .from(usersTable)
        .where(eq(usersTable.id, userId));

    return user;
}


export async function createUser(firstName, lastName, email, hashedPassword, verificationToken, termsAccepted) {
    const [user] = await db.insert(usersTable).values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verificationToken,
        termsAccepted,
    }).returning({ id: usersTable.id });

    return user;
}

export async function getUserByVerificationToken(verificationToken, { includePassword = false } = {}) {
    const selectFields = {
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        isVerified: usersTable.isVerified,
        verificationToken: usersTable.verificationToken,
    };

    if (includePassword) {
        selectFields.password = usersTable.password;
    }

    const [user] = await db.select(selectFields)
        .from(usersTable)
        .where(eq(usersTable.verificationToken, verificationToken));

    return user;
}

export const updateUser = async (userId, updates) => {
    const [updatedUser] = await db.update(usersTable).set(updates).where(eq(usersTable.id, userId)).returning();
    return updatedUser;
}