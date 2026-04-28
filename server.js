const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

let parts = [];

const admins = [
  "ghdawyly28@gmail.com",
  "ahmedghadawi@gmail.com"
];

app.post("/api/admin-login", (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();

  const allowedAdmins = admins.map(e => e.trim().toLowerCase());

  res.json({ success: allowedAdmins.includes(email) });
});


  const part = {
    id: Date.now(),
    brand: req.body.brand,
    code: req.body.code,
    name: req.body.name,
    car: req.body.car,
    model: req.body.model,
    price: req.body.price,
    nasim: req.body.nasim,
    khaleej: req.body.khaleej,
    dammam1: req.body.dammam1,
    dammam2: req.body.dammam2
  };

  parts.push(part);
  res.json({ success: true, part });
});

app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const brand = req.query.brand || "";

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
  console.log(`Server running on http://localhost:${PORT}`);
});
