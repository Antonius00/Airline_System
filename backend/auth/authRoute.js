import { Router } from "express";
import { z } from "zod";
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

// book flight schema
const detailsSchema = z.object({
  seats: z.string(),
  location: z.string(),
  price: z.string(),
});
router.post("/details", async (req, res) => {
  const parsed = detailsSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid_input",
      details: parsed.error.flatten(),
    });
  }
});

export default router;
