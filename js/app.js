const DEFAULT_AVATAR =
  "data:image/png;base64,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";
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
  contact: "İletişim Bilgileri",
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
  contact: "Contact Information",
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

  previewPhoto.src = d.photo || DEFAULT_AVATAR;
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

/* ================= AD SOYAD / MESLEK TEMİZLEME ================= */
const header = clone.querySelector(".header");
const nameEl = clone.querySelector("#previewName");
const jobEl = clone.querySelector("#previewJob");

if (header) {

  // Ad Soyad boşsa sadece onu kaldır
  if (!nameInput.value.trim() && nameEl) {
    nameEl.remove();
  }

  // Meslek boşsa sadece onu kaldır
  if (!jobInput.value.trim() && jobEl) {
    jobEl.remove();
  }

  // İkisi de yoksa, header tamamen silinsin
  if (!nameInput.value.trim() && !jobInput.value.trim()) {
    header.remove();
  }
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
