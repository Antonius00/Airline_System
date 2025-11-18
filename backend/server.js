import express from "express";
import authRoute from "./auth/authRoute.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoute);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(3000, () => console.log("API on http://localhost:3000"));
