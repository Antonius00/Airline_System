import express from "express";
import authRoute from "./auth/authRoute.js";

import path from "path";
import { fileURLToPath } from "url";
import { _date } from "zod/v4/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/auth", authRoute);

app.get("/health", (_req, res) => res.json({ ok: true }));

// Default route → homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Main/home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/credentialsPage/loginPage.html")
  );
});

app.get("/signup", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/credentialsPage/signupPage.html")
  );
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
