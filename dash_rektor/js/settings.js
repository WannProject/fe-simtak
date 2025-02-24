// JavaScript
class PopupManager {
  constructor() {
    this.activePopup = null;
    this.overlay = document.getElementById("overlay");
    this.initializePopups();
  }

  initializePopups() {
    // Menambahkan event listener untuk overlay
    this.overlay.addEventListener("click", () => this.closeActivePopup());

    // Setup untuk setiap tombol yang memicu popup
    document.querySelectorAll("[data-popup-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const popupId = trigger.dataset.popupTrigger;
        this.showPopup(popupId);
      });
    });
  }

  showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (!popup) return;

    this.activePopup = popup;

    // Aktifkan popup dan overlay
    popup.classList.add("active");
    this.overlay.classList.add("active");

    // Setup tombol-tombol
    const confirmBtn = popup.querySelector(".confirm-btn");
    const cancelBtn = popup.querySelector(".cancel-btn");

    confirmBtn.onclick = () => {
      this.handleConfirm(popupId);
    };

    cancelBtn.onclick = () => {
      this.closeActivePopup();
    };
  }

  closeActivePopup() {
    if (this.activePopup) {
      this.activePopup.classList.remove("active");
      this.overlay.classList.remove("active");
      this.activePopup = null;
    }
  }

  handleConfirm(popupId) {
    switch (popupId) {
      case "popup-ubah-password":
        // Logika untuk mengubah password
        this.showSuccessMessage("Kata sandi berhasil diubah");
        break;
      case "popup-simpan-perubahan":
        // Logika untuk menyimpan perubahan
        this.showSuccessMessage("Perubahan berhasil disimpan");
        break;
      case "popup-simpan-pengaturan":
        // Logika untuk menyimpan pengaturan
        this.showSuccessMessage("Pengaturan berhasil disimpan");
        break;
    }
    this.closeActivePopup();
  }

  showSuccessMessage(message) {
    // Implementasi toast atau notifikasi sukses
    alert(message); // Ganti dengan toast yang lebih baik
  }
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  const popupManager = new PopupManager();
});
