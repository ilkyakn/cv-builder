const get = id => document.getElementById(id);
const translations = {
  tr: {
  name: "Ad Soyad",
  job: "Meslek",
  phone: "Telefon",
  address: "Adres",
  about: "Hakkımda",
  education: "Eğitim",
  reference: "Referans",
  download: "PDF olarak indir",   // ← BURAYA VİRGÜL
  cvInfo: "CV Bilgileri",
  showContact: "İletişim bilgilerini göster",
  showAbout: "Hakkımda bölümünü göster",
  showEducation: "Eğitim bölümünü göster",
  showReference: "Referans bölümünü göster",
  photo: "Fotoğraf",
  showPhoto: "Fotoğrafı CV'de göster",
  font: "Yazı Fontu",
  color: "Renk Teması",
  mono: "Siyah - Beyaz",
  blue: "Mavi",
  reset: "Sıfırla",
  progressTitle: "CV Doluluk Durumu",
  progressEmpty: "CV henüz doldurulmadı",
  progressLow: "CV eksik görünüyor",
  progressMid: "CV neredeyse hazır",
  progressFull: "CV başvuruya hazır",

  openPreview: "Önizlemeyi Gör",
  closePreview: "← Düzenlemeye Dön",
},
  en: {
  name: "Full Name",
  job: "Job Title",
  phone: "Phone",
  address: "Address",
  about: "About Me",
  education: "Education",
  reference: "References",
  download: "Download PDF",   // ← BURAYA VİRGÜL
  cvInfo: "CV Information",
  showContact: "Show contact information",
  showAbout: "Show About section",
  showEducation: "Show Education section",
  showReference: "Show References section",
  photo: "Photo",
  showPhoto: "Show photo on CV",
  font: "Font",
  color: "Color Theme",
  mono: "Black & White",
  blue: "Blue",
  reset: "Reset",
  progressTitle: "CV Completion Status",
  progressEmpty: "CV is not filled yet",
  progressLow: "CV looks incomplete",
  progressMid: "CV is almost ready",
  progressFull: "CV is ready to apply",

  openPreview: "View Preview",
  closePreview: "← Back to Edit",
 } 
};

/* ================= FORM ================= */
const nameInput = get("nameInput");
const jobInput = get("jobInput");
const phoneInput = get("phoneInput");
const addressInput = get("addressInput");
const aboutInput = get("aboutInput");
const educationInput = get("educationInput");
const referenceInput = get("referenceInput");
const photoInput = get("photoInput");
const photoToggle = get("photoToggle");
const fontSelect = get("fontSelect");
const colorSelect = get("colorSelect");
const languageSelect = get("languageSelect");

/* ================= TOGGLE ================= */
const toggleAbout = get("toggleAbout");
const toggleEducation = get("toggleEducation");
const toggleReference = get("toggleReference");
const toggleContact = get("toggleContact");

/* ================= PREVIEW ================= */
const previewName = get("previewName");
const previewJob = get("previewJob");
const previewPhone = get("previewPhone");
const previewAddress = get("previewAddress");
const previewAbout = get("previewAbout");
const previewEducation = get("previewEducation");
const previewReference = get("previewReference");
const previewPhoto = get("previewPhoto");
const contactSection = get("contactSection");
const aboutSection = get("aboutSection");
const educationSection = get("educationSection");
const referenceSection = get("referenceSection");

const cv = get("cv");

/* ================= STORAGE ================= */
const STORAGE_KEY = "cv-builder-data";

/* ================= MOBİL BUTONLAR ================= */
const openPreviewBtn = get("openPreviewBtn");
const closePreviewBtn = get("closePreviewBtn");

/* ================= PROGRESS ================= */
const progressBar = get("progressBar");
const progressText = get("progressText");

/* ================= PDF ================= */
const downloadPdfBtn = get("downloadPdfBtn");

/* ================= CANLI METİN ================= */
function bindInput(input, preview, i18nKey, defaultDash = false) {
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      preview.textContent = input.value;
    } else {
      const lang = languageSelect.value;
      preview.textContent = defaultDash
        ? "-"
        : translations[lang][i18nKey];
    }

    updateProgress();
    saveToStorage();
  });
}

bindInput(nameInput, previewName, "name");
bindInput(jobInput, previewJob, "job");

bindInput(phoneInput, previewPhone, null, true);
bindInput(addressInput, previewAddress, null, true);
bindInput(aboutInput, previewAbout, null, true);
bindInput(educationInput, previewEducation, null, true);
bindInput(referenceInput, previewReference, null, true);

/* ================= FOTO ================= */
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewPhoto.src = reader.result;
    saveToStorage();
  };
  reader.readAsDataURL(file);
});

photoToggle.addEventListener("change", () => {
  previewPhoto.style.display = photoToggle.checked ? "block" : "none";
  saveToStorage();
});

languageSelect.addEventListener("change", () => {
  function saveLanguage(lang) {
  localStorage.setItem("cv-language", lang);
}
  applyLanguage(languageSelect.value);
  updateLanguageLabel(languageSelect.value);
  saveLanguage(languageSelect.value);
});
const languageLabel = document.getElementById("languageLabel");

function updateLanguageLabel(lang) {
  if (lang === "tr") {
    languageLabel.textContent = "Dil (Language)";
  } else {
    languageLabel.textContent = "Language (Dil)";
  }
}

/* ================= FONT ================= */
fontSelect.addEventListener("change", () => {
  cv.style.fontFamily = fontSelect.value;
  saveToStorage();
});

/* ================= RENK ================= */
cv.classList.add("mono");
colorSelect.addEventListener("change", () => {
  cv.classList.remove("mono", "blue");
  cv.classList.add(colorSelect.value);
  saveToStorage();
});

/* ================= BÖLÜM GÖSTER / GİZLE ================= */
function syncSection(toggle, section, input) {
  section.style.display = toggle.checked ? "block" : "none";
  input.disabled = !toggle.checked;
}

function syncContactSection() {
  contactSection.style.display = toggleContact.checked ? "block" : "none";
  phoneInput.disabled = !toggleContact.checked;
  addressInput.disabled = !toggleContact.checked;
}

[toggleAbout, toggleEducation, toggleReference].forEach(toggle => {
  toggle.addEventListener("change", () => {
    syncSection(
      toggle,
      toggle === toggleAbout ? aboutSection :
      toggle === toggleEducation ? educationSection :
      referenceSection,
      toggle === toggleAbout ? aboutInput :
      toggle === toggleEducation ? educationInput :
      referenceInput
    );
    updateProgress();
    saveToStorage();
  });
});
toggleContact.addEventListener("change", () => {
  syncContactSection();
  updateProgress();
  saveToStorage();
});


/* ================= PROGRESS ================= */
function updateProgress() {
  let filled = 0;
  const total = 7;

  if (nameInput.value.trim()) filled++;
  if (jobInput.value.trim()) filled++;
  if (phoneInput.value.trim()) filled++;
  if (addressInput.value.trim()) filled++;
  if (aboutInput.value.trim() && !aboutInput.disabled) filled++;
  if (educationInput.value.trim() && !educationInput.disabled) filled++;
  if (referenceInput.value.trim() && !referenceInput.disabled) filled++;

  const percent = Math.round((filled / total) * 100);
  progressBar.style.width = percent + "%";

  const lang = languageSelect.value; 

  progressText.textContent =
  percent === 0 ? translations[lang].progressEmpty :
  percent < 50 ? translations[lang].progressLow :
  percent < 80 ? translations[lang].progressMid :
  translations[lang].progressFull;

}

/* ================= LOCAL STORAGE ================= */
function saveToStorage() {
  const data = {
    name: nameInput.value,
    job: jobInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
    about: aboutInput.value,
    education: educationInput.value,
    reference: referenceInput.value,
    toggleContact: toggleContact.checked,
    toggleAbout: toggleAbout.checked,
    toggleEducation: toggleEducation.checked,
    toggleReference: toggleReference.checked,
    photoToggle: photoToggle.checked,
    font: fontSelect.value,
    color: colorSelect.value,
    photo: previewPhoto.src
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function applyLanguage(lang) {
  // data-i18n olanlar
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key];
  });

  // PREVIEW NAME & JOB (fallback düzeltmesi)
  if (!nameInput.value.trim()) {
    previewName.textContent = translations[lang].name;
  }

  if (!jobInput.value.trim()) {
    previewJob.textContent = translations[lang].job;
  }

  // Progress metnini de dil değişince güncelle
  updateProgress();
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const d = JSON.parse(raw);

  nameInput.value = d.name || "";
  jobInput.value = d.job || "";
  phoneInput.value = d.phone || "";
  addressInput.value = d.address || "";
  aboutInput.value = d.about || "";
  educationInput.value = d.education || "";
  referenceInput.value = d.reference || "";

  toggleAbout.checked = d.toggleAbout;
  toggleEducation.checked = d.toggleEducation;
  toggleReference.checked = d.toggleReference;
  photoToggle.checked = d.photoToggle;
  toggleContact.checked = d.toggleContact ?? true;
  syncContactSection();

  previewPhoto.src = d.photo || "assets/default-avatar.png";
  previewPhoto.style.display = photoToggle.checked ? "block" : "none";

  fontSelect.value = d.font || "Arial";
  cv.style.fontFamily = fontSelect.value;

  colorSelect.value = d.color || "mono";
  cv.classList.remove("mono", "blue");
  cv.classList.add(colorSelect.value);

  previewName.textContent = nameInput.value || "Ad Soyad";
  previewJob.textContent = jobInput.value || "Meslek";
  previewPhone.textContent = phoneInput.value || "-";
  previewAddress.textContent = addressInput.value || "-";
  previewAbout.textContent = aboutInput.value || "-";
  previewEducation.textContent = educationInput.value || "-";
  previewReference.textContent = referenceInput.value || "-";

  syncSection(toggleAbout, aboutSection, aboutInput);
  syncSection(toggleEducation, educationSection, educationInput);
  syncSection(toggleReference, referenceSection, referenceInput);

  updateProgress();
}

/* ================= RESET ================= */
function resetCV() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

get("resetBtn").addEventListener("click", () => {
  if (confirm("Tüm CV sıfırlanacak. Emin misin?")) {
    resetCV();
  }
});

/* ================= MOBİL ================= */
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

openPreviewBtn.addEventListener("click", () => {
  if (isMobile()) document.body.classList.add("preview-open");
});

closePreviewBtn.addEventListener("click", () => {
  if (isMobile()) document.body.classList.remove("preview-open");
});
function generatePdfFileName() {
  const name = nameInput.value.trim() || "cv";

  return name
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    + "-cv.pdf";
}
function willExceedOnePage(sourceEl) {
  const A4_HEIGHT_PX = 1122;

  // Ölçüm için AYRI bir clone
  const measureClone = sourceEl.cloneNode(true);

  measureClone.style.position = "absolute";
  measureClone.style.visibility = "hidden";
  measureClone.style.width = "210mm";
  measureClone.style.top = "0";
  measureClone.style.left = "0";

  document.body.appendChild(measureClone);

  const height = measureClone.scrollHeight;

  document.body.removeChild(measureClone);

  const TOLERANCE = 120; // px — ayarlanabilir

  return height > (A4_HEIGHT_PX + TOLERANCE);
}

/* ================= PDF ================= */
downloadPdfBtn.addEventListener("click", () => {
  const cvEl = document.getElementById("cv");
  const clone = cvEl.cloneNode(true);

  /* ================= AD SOYAD KONTROL ================= */
  const nameText = nameInput.value.trim();

  if (!nameText) {
    const proceed = confirm(
      "Ad Soyad alanı boş.\nCV isimsiz olarak oluşturulacak.\n\nYine de devam etmek istiyor musun?"
    );

    if (!proceed) return;
  }

    /* ================= TEK SAYFA KONTROL ================= */
  if (willExceedOnePage(clone)) {
    const proceed = confirm(
      "CV tek sayfayı aşabilir.\n" +
      "CV’ler genellikle tek sayfa olur.\n\n" +
      "Yine de devam etmek istiyor musun?"
    );

    if (!proceed) return;
  }

  /* ================= BOŞ ALAN TEMİZLEME ================= */

  const cleanupMap = [
    { input: jobInput, selector: "#previewJob" },
    { input: phoneInput, selector: "#previewPhone", parent: "p" },
    { input: addressInput, selector: "#previewAddress", parent: "p" },
    { input: aboutInput, selector: "#aboutSection" },
    { input: educationInput, selector: "#educationSection" },
    { input: referenceInput, selector: "#referenceSection" }
  ];

  cleanupMap.forEach(item => {
  if (!item.input.value.trim()) {
    const el = clone.querySelector(item.selector);
    if (!el) return;

    // parent belirtilmişse parent'ı sil
    if (item.parent) {
      const parentEl = el.closest(item.parent);
      if (parentEl) parentEl.remove();
    } else {
      el.remove();
    }
  }
});


  /* ================= AD SOYAD SİLME ================= */
  if (!nameText) {
    const header = clone.querySelector(".header");
    if (header) header.remove();
  }

  /* ================= MOBİL UI TEMİZLE ================= */
  clone.querySelectorAll(".mobile-only").forEach(el => el.remove());

  /* ================= PDF ================= */
  html2pdf()
    .from(clone)
    .set({
      margin: 0,
      filename: generatePdfFileName(),
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    })
    .save();
});

/* ================= INIT ================= */
const savedLang = localStorage.getItem("cv-language");

if (savedLang) {
  languageSelect.value = savedLang;
}

loadFromStorage();
syncContactSection();
applyLanguage(languageSelect.value);
updateLanguageLabel(languageSelect.value);
updateProgress();
