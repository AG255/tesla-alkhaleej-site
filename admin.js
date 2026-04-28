let isAdmin = false;
let selectedAdminBrand = "";

// تسجيل الدخول
async function loginAdmin() {
  const email = document.getElementById("adminEmail").value;

  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (data.success) {
    isAdmin = true;
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");

    loadParts();
  } else {
    document.getElementById("loginMsg").innerText = "❌ الإيميل غير مصرح";
  }
}

// اختيار الشركة
function setBrand(brand) {
  selectedAdminBrand = brand;
  document.getElementById("selectedBrandText").innerText = `تم اختيار: ${brand}`;
}

// إضافة قطعة
async function addPart() {
  if (!selectedAdminBrand) {
    alert("اختر الشركة أولاً");
    return;
  }

  const part = {
    brand: selectedAdminBrand,
    code: code.value,
    name: name.value,
    car: car.value,
    model: model.value,
    price: price.value,
    nasim: Number(nasim.value || 0),
    khaleej: Number(khaleej.value || 0),
    dammam1: Number(dammam1.value || 0),
    dammam2: Number(dammam2.value || 0)
  };

  const res = await fetch("/api/parts", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(part)
  });

  const data = await res.json();
  addMsg.innerText = data.message;

  loadParts();
}

// تحميل القطع
async function loadParts() {
  const res = await fetch("/api/parts");
  const data = await res.json();

  partsList.innerHTML = data.map(p => `
    <div style="margin:10px;padding:10px;background:#eee;color:black">
      ${p.name} (${p.code})
      <button onclick="deletePart(${p.id})">🗑️ حذف</button>
    </div>
  `).join("");
}

// حذف
async function deletePart(id) {
  await fetch("/api/parts/" + id, { method: "DELETE" });
  loadParts();
}
