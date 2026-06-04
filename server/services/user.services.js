import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";
import db from "../db/index.js"

export async function getUserByEmail(email, { includePassword = false } = {}) {
    const selectFields = {
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
    };

    if (includePassword) {
        selectFields.password = usersTable.password;
    }

    const [user] = await db.select(selectFields)
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return user;
}


export async function createUser(firstName, lastName, email, hashedPassword) {
    const [user] = await db.insert(usersTable).values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    }).returning({ id: usersTable.id });

    return user;
}

