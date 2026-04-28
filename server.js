const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// 🟢 قاعدة بيانات مؤقتة
let parts = [];

// 🟢 الأدمن
const admins = [
  "ghdawyly28@gmail.com",
  "ahmedghadawi@gmail.com"
];

// 🟢 تسجيل دخول الأدمن
app.post("/api/admin-login", (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const allowedAdmins = admins.map(e => e.trim().toLowerCase());

  res.json({ success: allowedAdmins.includes(email) });
});

// 🟢 إضافة قطعة
app.post("/api/parts", (req, res) => {
  const part = {
    id: Date.now(),
    brand: req.body.brand,
    code: req.body.code,
    name: req.body.name,
    car: req.body.car,
    model: req.body.model,
    price: req.body.price,
    nasim: Number(req.body.nasim || 0),
    khaleej: Number(req.body.khaleej || 0),
    dammam1: Number(req.body.dammam1 || 0),
    dammam2: Number(req.body.dammam2 || 0)
  };

  parts.push(part);

  res.json({
    success: true,
    message: `✅ تمت إضافة:
${part.name}
كود: ${part.code}`
  });
});

// 🟢 جلب كل القطع (للأدمن)
app.get("/api/parts", (req, res) => {
  res.json(parts);
});

// 🟢 حذف قطعة
app.delete("/api/parts/:id", (req, res) => {
  const id = Number(req.params.id);
  parts = parts.filter(p => p.id !== id);
  res.json({ success: true });
});

// 🟢 البحث
app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  const brand = (req.query.brand || "").trim();

  const result = parts.filter(p =>
    p.brand === brand &&
    (
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q)
    )
  );

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
