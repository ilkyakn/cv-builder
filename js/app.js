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

/* ================= PDF ================= */
const downloadPdfBtn = get("downloadPdfBtn");

/* ================= CANLI METİN ================= */
nameInput.oninput = () => previewName.textContent = nameInput.value || "Ad Soyad";
jobInput.oninput = () => previewJob.textContent = jobInput.value || "Meslek";
phoneInput.oninput = () => previewPhone.textContent = phoneInput.value || "-";
addressInput.oninput = () => previewAddress.textContent = addressInput.value || "-";

aboutInput.oninput = () => previewAbout.textContent = aboutInput.value || "-";
educationInput.oninput = () => previewEducation.textContent = educationInput.value || "-";
referenceInput.oninput = () => previewReference.textContent = referenceInput.value || "-";

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

/* ================= BÖLÜM GÖSTER/GİZLE ================= */
function syncSection(toggle, section, input) {
  section.style.display = toggle.checked ? "block" : "none";
  input.disabled = !toggle.checked;
}

toggleAbout.onchange = () => syncSection(toggleAbout, aboutSection, aboutInput);
toggleEducation.onchange = () => syncSection(toggleEducation, educationSection, educationInput);
toggleReference.onchange = () => syncSection(toggleReference, referenceSection, referenceInput);

toggleAbout.onchange();
toggleEducation.onchange();
toggleReference.onchange();

/* ================= MOBİL ÖNİZLEME MODU ================= */
if (openPreviewBtn && closePreviewBtn) {

  openPreviewBtn.onclick = () => {
    document.body.classList.add("preview-open");
    window.scrollTo(0, 0);
  };

  closePreviewBtn.onclick = () => {
    document.body.classList.remove("preview-open");
    window.scrollTo(0, 0);
  };

}

/* ================= PDF EXPORT (STABİL) ================= */
downloadPdfBtn.onclick = () => {
  downloadPdfBtn.style.display = "none";

  const clone = cv.cloneNode(true);

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-9999px";
  wrapper.style.top = "0";
  wrapper.style.width = "210mm";
  wrapper.style.padding = "20mm";
  wrapper.style.background = "#fff";
  wrapper.style.boxSizing = "border-box";

  clone.style.margin = "0";
  clone.style.padding = "0";
  clone.style.boxShadow = "none";
  clone.style.borderRadius = "0";

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  html2pdf()
    .from(wrapper)
    .set({
      margin: 0,
      filename: "cv.pdf",
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .save()
    .then(() => {
      document.body.removeChild(wrapper);
      downloadPdfBtn.style.display = "block";
    });
};
