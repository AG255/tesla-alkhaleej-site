const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// 👇 الأدمن
const admins = [
  "ghdawyly28@gmail.com",
  "ahmedghadawi@gmail.com"
];

// 👇 تسجيل دخول الأدمن
app.post("/api/admin-login", (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const allowedAdmins = admins.map(e => e.trim().toLowerCase());

  if (allowedAdmins.includes(email)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// 👇 تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
