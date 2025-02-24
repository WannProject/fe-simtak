// TODO POPUP KONFIRMASI START==============================================================
const actionButtons = document.querySelectorAll(".action-button");
const popup = document.getElementById("confirmation-popup");
const confirmButton = document.getElementById("confirm-button");
const cancelButton = document.getElementById("cancel-button");
const commentField = document.getElementById("comment");
const overlay = document.getElementById("overlay");

let selectedAction = "";

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("setuju")) {
      selectedAction = "Setujui";
    } else if (button.classList.contains("tolak")) {
      selectedAction = "Tolak";
    } else if (button.classList.contains("revisi")) {
      selectedAction = "Revisi";
    }
    popup.style.display = "block";
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Tampilkan overlay dan popup
    overlay.style.display = "block";
    popup.style.display = "block";
  });
});

confirmButton.addEventListener("click", () => {
  const comment = commentField.value;
  alert(
    `Tindakan: ${selectedAction}\nKomentar: ${comment || "Tidak ada komentar."}`
  );
  overlay.style.display = "none";
  popup.style.display = "none";
  commentField.value = "";
});

cancelButton.addEventListener("click", () => {
  overlay.style.display = "none";
  popup.style.display = "none";
});

confirmButton.addEventListener("click", () => {
  const comment = commentField.value;
  alert(
    `Tindakan: ${selectedAction}\nKomentar: ${comment || "Tidak ada komentar."}`
  );
  popup.style.display = "none";
  commentField.value = ""; // Reset kolom komentar
});

cancelButton.addEventListener("click", () => {
  popup.style.display = "none";
});
// TODO END POPUP KONFIRMASI==============================================================
