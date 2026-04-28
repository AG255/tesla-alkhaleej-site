let isAdmin = false;
let selectedAdminBrand = "";

async function loginAdmin() {
  const email = document.getElementById("adminEmail").value.trim();

  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (data.success) {
    isAdmin = true;
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    document.getElementById("loginMsg").innerText = "الإيميل غير مصرح له";
  }
}

function setBrand(brand) {
  selectedAdminBrand = brand;
  document.getElementById("selectedBrandText").innerText = `تم اختيار: ${brand}`;
}

async function addPart() {
  if (!isAdmin) return;

  if (!selectedAdminBrand) {
    alert("اختر هيونداي أو كيا أولاً");
    return;
  }

  const part = {
    brand: selectedAdminBrand,
    code: document.getElementById("code").value.trim(),
    name: document.getElementById("name").value.trim(),
    car: document.getElementById("car").value.trim(),
    model: document.getElementById("model").value.trim(),
    price: document.getElementById("price").value.trim(),
    nasim: Number(document.getElementById("nasim").value || 0),
    khaleej: Number(document.getElementById("khaleej").value || 0),
    dammam1: Number(document.getElementById("dammam1").value || 0),
    dammam2: Number(document.getElementById("dammam2").value || 0)
  };

  if (!part.code || !part.name) {
    alert("اكتب كود القطعة واسم القطعة");
    return;
  }

  const res = await fetch("/api/parts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(part)
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById("addMsg").innerText = "تمت إضافة القطعة بنجاح ✅";
  }
}