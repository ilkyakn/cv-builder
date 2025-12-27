const get = id => document.getElementById(id);

/* ================= FORM INPUTLARI ================= */
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
const toggleAbout = get("toggleAbout");
const toggleEducation = get("toggleEducation");
const toggleReference = get("toggleReference");
const aboutSection = get("aboutSection");
const educationSection = get("educationSection");
const referenceSection = get("referenceSection");
const aboutInfo = get("aboutInfo");
const educationInfo = get("educationInfo");
const referenceInfo = get("referenceInfo");

/* ================= PREVIEW ================= */
const previewName = get("previewName");
const previewJob = get("previewJob");
const previewPhone = get("previewPhone");
const previewAddress = get("previewAddress");
const previewAbout = get("previewAbout");
const previewEducation = get("previewEducation");
const previewReference = get("previewReference");
const previewPhoto = get("previewPhoto");
const cv = get("cv");
const downloadPdfBtn = get("downloadPdfBtn");
const progressBar = get("progressBar");
const progressText = get("progressText");
const aboutWarning = get("aboutWarning");
const educationWarning = get("educationWarning");
const referenceWarning = get("referenceWarning");

/* =============== CANLI METİN =============== */

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

/* === ÇOK SATIRLI ALANLAR (CSS pre-wrap ile) === */

aboutInput.oninput = () => {
  previewAbout.textContent = aboutInput.value || "-";
  checkLength(aboutInput, aboutWarning, 6);
  updateProgress();
};

educationInput.oninput = () => {
  previewEducation.textContent = educationInput.value || "-";
  checkLength(educationInput, educationWarning, 5);
  updateProgress();
};

referenceInput.oninput = () => {
  previewReference.textContent = referenceInput.value || "-";
  checkLength(referenceInput, referenceWarning, 4);
  updateProgress();
};


function checkLength(textarea, warningEl, maxLines) {
  const lines = textarea.value.split("\n").length;
  warningEl.style.display = lines > maxLines ? "block" : "none";
}
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

/* ================= ŞABLON ================= */
cv.classList.add("modern");

/* ================= RENK TEMASI ================= */
cv.classList.add("mono");
colorSelect.onchange = () => {
  cv.classList.remove("mono", "blue");
  cv.classList.add(colorSelect.value);
};
function updateProgress() {
  let filled = 0;
  let total = 7;

  if (nameInput.value.trim()) filled++;
  if (jobInput.value.trim()) filled++;
  if (phoneInput.value.trim()) filled++;
  if (addressInput.value.trim()) filled++;
  if (aboutInput.value.trim()) filled++;
  if (educationInput.value.trim()) filled++;
  if (referenceInput.value.trim()) filled++;

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
/* ================= PDF EXPORT (KESİN ÇÖZÜM) ================= */
downloadPdfBtn.onclick = () => {
  downloadPdfBtn.style.display = "none";

  // CV'yi klonla
  const clone = cv.cloneNode(true);

  // PDF sarmalayıcı
  const pdfWrapper = document.createElement("div");
  pdfWrapper.style.width = "210mm";
  pdfWrapper.style.minHeight = "297mm";
  pdfWrapper.style.padding = "20mm";
  pdfWrapper.style.background = "#fff";
  pdfWrapper.style.boxSizing = "border-box";

  // Klon stil temizliği
  clone.style.margin = "0";
  clone.style.padding = "0";
  clone.style.boxShadow = "none";
  clone.style.borderRadius = "0";

  pdfWrapper.appendChild(clone);
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
      downloadPdfBtn.style.display = "block";
    });
};
toggleAbout.onchange = () => {
  const active = toggleAbout.checked;

  aboutSection.style.display = active ? "block" : "none";
  aboutInput.disabled = !active;
  aboutInfo.style.display = active ? "none" : "block";
};
toggleEducation.onchange = () => {
  const active = toggleEducation.checked;

  educationSection.style.display = active ? "block" : "none";
  educationInput.disabled = !active;
  educationInfo.style.display = active ? "none" : "block";
};
toggleReference.onchange = () => {
  const active = toggleReference.checked;

  referenceSection.style.display = active ? "block" : "none";
  referenceInput.disabled = !active;
  referenceInfo.style.display = active ? "none" : "block";
};
aboutSection.style.display = toggleAbout.checked ? "block" : "none";
educationSection.style.display = toggleEducation.checked ? "block" : "none";
referenceSection.style.display = toggleReference.checked ? "block" : "none";
toggleAbout.onchange();
toggleEducation.onchange();
toggleReference.onchange();
updateProgress();