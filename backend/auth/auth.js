import { pool } from "../db.js";
import bcrypt from "bcrypt";

//creates users
export async function createUser({
  email,
  userName,
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
  const params = [email, userName, firstName, lastName, passwordHash];
  const { rows } = await pool.query(sql, params);
  return rows[0];
}

//creates login ability for users
// export: allows us to export and use in other files
// async: allows us to use await inside the fucntion
// userLogin(x,x): contains two objects to pass through
export async function userLogin({ usernameOrEmail, password }) {
  //this is a string containing SQL
  // which prepares the SQL command as text, it does not RUN SQL yet
  const sql = `
  select id, email, username, first_name, last_name, password_hash, created_at
  from airline.users
  where username = $1 or email = $1
  limit 1`;
  // $1 will be replaced with params
  const params = [usernameOrEmail];

  // This runs SQL against PostgreSQL
  //pool.query(...) -> sends the SQL + params to the database
  // rows means we only take the rows part of a result
  const { rows } = await pool.query(sql, params);
  //since we only used limit 1 then we only need the first position of rows array
  const user = rows[0];

  if (!user) {
    return null;
  }

  //password checks if password is in plain text
  //user.password_hash: the bcyrpt hash stored in the database during signup
  //bcrypt.compare(): hashes the entered password and checks if it matches the stored hash
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return null;
  }

  const { password_hash, ...safeUser } = user;
  return safeUser;
}

// allows users to choose flights, seats and price of flight tickets
export async function searchFlight({}) {
  const sql = `
  ...
  `;
}
