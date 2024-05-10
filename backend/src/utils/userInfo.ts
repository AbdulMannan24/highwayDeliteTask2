import { db } from "../db";

export async function getUser(email: string) {
    let user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (user.rows.length > 0) {
        return user.rows;
    } else {
        return [];
    }
}

export async function fetchUser(email: string) {
    let user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (user.rows.length > 0) {
        return 1;
    } else {
        return 0;
    }
}
