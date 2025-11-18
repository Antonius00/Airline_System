import { Router } from "express";
import { z } from "zod";
import { createUser } from "./auth.js";

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  password: z.string().min(8).max(128),
});

router.post('/signup', asyn(req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success){
    return res.status(400).json({ 
        error: "invalid_input", 
        details: parsed.error.flatten() 
    });
  }; 

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

export default router;