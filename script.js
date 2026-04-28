let selectedBrand = "";

function selectBrand(brand) {
  selectedBrand = brand;
  document.getElementById("home").classList.add("hidden");
  document.getElementById("searchPage").classList.remove("hidden");
  document.getElementById("brandTitle").innerText = `بحث قطع ${brand}`;
  document.getElementById("results").innerHTML = "";
}

function goHome() {
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("searchPage").classList.add("hidden");
  document.getElementById("results").innerHTML = "";
}

async function searchPart() {
  const q = document.getElementById("searchInput").value.trim();
  const results = document.getElementById("results");

  if (!q) {
    alert("اكتب اسم القطعة أو كود القطعة");
    return;
  }

  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&brand=${encodeURIComponent(selectedBrand)}`);
  const data = await res.json();

  if (data.length === 0) {
    results.innerHTML = `<div class="part"><h2>لم يتم العثور على القطعة</h2></div>`;
    return;
  }

  results.innerHTML = data.map(p => {
    const msg = encodeURIComponent(
      `السلام عليكم، أريد الاستفسار عن قطعة:\n` +
      `الشركة: ${p.brand}\n` +
      `الكود: ${p.code}\n` +
      `القطعة: ${p.name}\n` +
      `السيارة: ${p.car}\n` +
      `الموديل: ${p.model}`
    );

    return `
      <div class="part">
        <h2>${p.name}</h2>
        <p><b>كود القطعة:</b> ${p.code}</p>
        <p><b>الشركة:</b> ${p.brand}</p>
        <p><b>السيارة:</b> ${p.car}</p>
        <p><b>الموديل:</b> ${p.model}</p>
        <p><b>السعر:</b> ${p.price} ريال</p>

        <h3>التوفر حسب الفروع</h3>
        <p class="${p.nasim > 0 ? 'available' : 'not-available'}">النسيم: ${p.nasim > 0 ? p.nasim + ' حبة' : 'غير متوفر'}</p>
        <p class="${p.khaleej > 0 ? 'available' : 'not-available'}">الخليج: ${p.khaleej > 0 ? p.khaleej + ' حبة' : 'غير متوفر'}</p>
        <p class="${p.dammam1 > 0 ? 'available' : 'not-available'}">الخضرية 1: ${p.dammam1 > 0 ? p.dammam1 + ' حبة' : 'غير متوفر'}</p>
        <p class="${p.dammam2 > 0 ? 'available' : 'not-available'}">الخضرية 2: ${p.dammam2 > 0 ? p.dammam2 + ' حبة' : 'غير متوفر'}</p>

        ${p.nasim > 0 ? `<a class="branch-btn" target="_blank" href="https://wa.me/966552418825?text=${msg}">طلب من النسيم</a>` : ""}
        ${p.khaleej > 0 ? `<a class="branch-btn" target="_blank" href="https://wa.me/966550168428?text=${msg}">طلب من الخليج</a>` : ""}
        ${p.dammam1 > 0 ? `<a class="branch-btn" target="_blank" href="https://wa.me/966556452281?text=${msg}">طلب من الخضرية 1</a>` : ""}
        ${p.dammam2 > 0 ? `<a class="branch-btn" target="_blank" href="https://wa.me/966556455387?text=${msg}">طلب من الخضرية 2</a>` : ""}
      </div>
    `;
  }).join("");
}