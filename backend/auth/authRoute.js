import { Router } from "express";
import { object, z } from "zod";
import { createUser, userLogin } from "./auth.js";
import { parse } from "dotenv";

const router = Router();

// signup schema
const signupSchema = z.object({
  email: z.string().email(),
  userName: z.string().min(3).max(50),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  password: z.string().min(8).max(128),
});

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid_input",
      details: parsed.error.flatten(),
    });
  }

  try {
    const user = await createUser(parsed.data);
    res.status(201).json({ user });
  } catch (err) {
    // handle unique violations (email or username)
    if (err.code === "23505") {
      return res.status(409).json({ error: "duplicate", detail: err.detail });
    }
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// Login Schema
const loginSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});
router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid_input",
      details: parsed.error.flatten(),
    });
  }
  const user = await userLogin(parsed.data);
  if (!user) {
    return res.status(401).json({
      error: "invalid_credentials",
    });
  }
  return res.status(200).json({ user });
});

// search flight schema
const searchFlightschema = z.object({
  from: z.string(),
  to: z.string(),
  depart: z.string(),
});
router.get("/search-flights", async (req, res) => {
  const parsed = searchFlightschema.safeParse(req.query);
  return res.status(400).json({
    error: "invalid_input",
  });
});

export default router;
