import { pool } from "../db.js";
import bcrypt from "bcrypt";

export async function createUser({
  email,
  username,
  firstName,
  lastName,
  password,
}) {
  const passwordHash = await bcrypt.hash(password, 10);
  const sql = `
        insert into airline.users (email, username, first_name, last_name, password_hash)
        values ($1, $2, $3, $4, $5)
        returning id, email, username, first_name, last_name, created_at
    `;
  const params = [email, username, firstName, lastName, passwordHash];
  const { rows } = await pool.query(sql, params);
  return rows[0];
}
