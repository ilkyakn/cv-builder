const get = id => document.getElementById(id);

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

/* ================= TOGGLE ================= */
const toggleAbout = get("toggleAbout");
const toggleEducation = get("toggleEducation");
const toggleReference = get("toggleReference");

/* ================= PREVIEW ================= */
const previewName = get("previewName");
const previewJob = get("previewJob");
const previewPhone = get("previewPhone");
const previewAddress = get("previewAddress");
const previewAbout = get("previewAbout");
const previewEducation = get("previewEducation");
const previewReference = get("previewReference");
const previewPhoto = get("previewPhoto");

const aboutSection = get("aboutSection");
const educationSection = get("educationSection");
const referenceSection = get("referenceSection");

const cv = get("cv");

/* ================= MOBİL BUTONLAR ================= */
const openPreviewBtn = get("openPreviewBtn");
const closePreviewBtn = get("closePreviewBtn");

/* ================= PROGRESS ================= */
const progressBar = get("progressBar");
const progressText = get("progressText");

/* ================= PDF ================= */
const downloadPdfBtn = get("downloadPdfBtn");

/* ================= CANLI METİN ================= */
nameInput.oninput = () => {
  previewName.textContent = nameInput.value || "Ad Soyad";
  updateProgress();
};

jobInput.oninput = () => {
  previewJob.textContent = jobInput.value || "Meslek";
  updateProgress();
};

phoneInput.oninput = () => {
  previewPhone.textContent = phoneInput.value || "-";
  updateProgress();
};

addressInput.oninput = () => {
  previewAddress.textContent = addressInput.value || "-";
  updateProgress();
};

aboutInput.oninput = () => {
  previewAbout.textContent = aboutInput.value || "-";
  updateProgress();
};

educationInput.oninput = () => {
  previewEducation.textContent = educationInput.value || "-";
  updateProgress();
};

referenceInput.oninput = () => {
  previewReference.textContent = referenceInput.value || "-";
  updateProgress();
};

/* ================= FOTO ================= */
photoInput.onchange = () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewPhoto.src = reader.result;
  };
  reader.readAsDataURL(file);
};

photoToggle.onchange = () => {
  previewPhoto.style.display = photoToggle.checked ? "block" : "none";
};

/* ================= FONT ================= */
fontSelect.onchange = () => {
  cv.style.fontFamily = fontSelect.value;
};

/* ================= RENK ================= */
cv.classList.add("mono");
colorSelect.onchange = () => {
  cv.classList.remove("mono", "blue");
  cv.classList.add(colorSelect.value);
};

/* ================= BÖLÜM GÖSTER / GİZLE ================= */
function syncSection(toggle, section, input) {
  section.style.display = toggle.checked ? "block" : "none";
  input.disabled = !toggle.checked;
  updateProgress();
}

toggleAbout.onchange = () => syncSection(toggleAbout, aboutSection, aboutInput);
toggleEducation.onchange = () => syncSection(toggleEducation, educationSection, educationInput);
toggleReference.onchange = () => syncSection(toggleReference, referenceSection, referenceInput);

toggleAbout.onchange();
toggleEducation.onchange();
toggleReference.onchange();

/* ================= PROGRESS HESABI ================= */
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

  if (percent === 0) {
    progressText.textContent = "CV henüz doldurulmadı";
  } else if (percent < 50) {
    progressText.textContent = "CV eksik görünüyor";
  } else if (percent < 80) {
    progressText.textContent = "CV neredeyse hazır";
  } else {
    progressText.textContent = "CV başvuruya hazır";
  }
}

/* ================= MOBİL ÖNİZLEME ================= */
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

if (openPreviewBtn && closePreviewBtn) {
  openPreviewBtn.onclick = () => {
    if (!isMobile()) return;
    document.body.classList.add("preview-open");
    window.scrollTo(0, 0);
  };

  closePreviewBtn.onclick = () => {
    if (!isMobile()) return;
    document.body.classList.remove("preview-open");
    window.scrollTo(0, 0);
  };
}

/* ================= PDF ================= */
downloadPdfBtn.onclick = () => {
  downloadPdfBtn.style.display = "none";

  // 🔴 KRİTİK: PDF sırasında CV'yi zorla görünür yap
  const wasPreviewOpen = document.body.classList.contains("preview-open");
  const originalDisplay = cv.style.display;

  cv.style.display = "block";
  document.body.classList.add("preview-open");

  html2pdf()
    .from(cv)
    .set({
      margin: 10,
      filename: "cv.pdf",
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
    .save()
    .then(() => {
      // 🔁 eski durumu geri al
      cv.style.display = originalDisplay;
      if (!wasPreviewOpen) {
        document.body.classList.remove("preview-open");
      }
      downloadPdfBtn.style.display = "block";
    });
};
