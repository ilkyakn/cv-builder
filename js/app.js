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
function bindInput(input, preview, fallback = "-") {
  input.oninput = () => {
    preview.textContent = input.value || fallback;
    updateProgress();
  };
}

bindInput(nameInput, previewName, "Ad Soyad");
bindInput(jobInput, previewJob, "Meslek");
bindInput(phoneInput, previewPhone);
bindInput(addressInput, previewAddress);
bindInput(aboutInput, previewAbout);
bindInput(educationInput, previewEducation);
bindInput(referenceInput, previewReference);

/* ================= FOTO ================= */
photoInput.onchange = () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => previewPhoto.src = reader.result;
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

updateProgress();

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

/* ================= PDF EXPORT (KESİN & STABİL) ================= */
downloadPdfBtn.onclick = () => {
  const pdfWrapper = document.createElement("div");
  pdfWrapper.style.width = "210mm";
  pdfWrapper.style.minHeight = "297mm";
  pdfWrapper.style.padding = "20mm";
  pdfWrapper.style.background = "#fff";
  pdfWrapper.style.boxSizing = "border-box";

  const pdfContent = document.getElementById("cv").cloneNode(true);

  // ❗️ DOĞRU DEĞİŞKEN pdfContent
  pdfContent.style.margin = "0";
  pdfContent.style.padding = "0";
  pdfContent.style.boxSizing = "border-box";
  pdfContent.style.width = "100%";
  pdfContent.style.boxShadow = "none";
  pdfContent.style.borderRadius = "0";
  pdfContent.style.position = "static";
  pdfContent.style.display = "block";

  // Mobil / UI elementlerini PDF’ten çıkar
  pdfContent.querySelectorAll(".mobile-only").forEach(el => el.remove());

  pdfWrapper.appendChild(pdfContent);
  document.body.appendChild(pdfWrapper);

  html2pdf()
    .from(pdfWrapper)
    .set({
      margin: 0,
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
      document.body.removeChild(pdfWrapper);
    });
};
