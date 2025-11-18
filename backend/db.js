import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();

const { Pool } = pkg;
export const pool = new Pool(); //uses PG* env vars

// quick self-test when file is first imported
pool.query("select 1").catch((e) => {
  console.error("DB connection failed:", e.message);
  process.exit(1);
});
