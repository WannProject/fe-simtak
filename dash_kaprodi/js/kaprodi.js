// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>START DPA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// TODO NAVIGATION START================================================================
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});
// TODO NAVIGATION END======================================================================

// TODO NOTIFICATION START======================================================================
class NotificationManager {
  constructor() {
    this.notifications = [
      {
        id: 1,
        message: "Ada pembaruan sistem terbaru",
        time: "5 menit yang lalu",
      },
      {
        id: 2,
        message: "Pengaturan akun Anda telah diperbarui",
        time: "1 jam yang lalu",
      },
      {
        id: 3,
        message: "Pembayaran berhasil dikonfirmasi",
        time: "2 jam yang lalu",
      },
      // Tambahkan notifikasi lainnya di sini
    ];

    this.init();
  }

  init() {
    this.bellIcon = document.querySelector(".notification-bell");
    this.dropdown = document.querySelector(".notification-dropdown");
    this.notificationList = document.querySelector(".notification-list");
    this.numBadge = document.querySelector(".num");
    this.clearAllBtn = document.querySelector(".clear-all");

    this.setupEventListeners();
    this.renderNotifications();
    this.updateNotificationCount();
  }

  setupEventListeners() {
    // Toggle dropdown saat bell diklik
    this.bellIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleDropdown();
    });

    // Tutup dropdown saat klik di luar
    document.addEventListener("click", (e) => {
      if (!this.bellIcon.contains(e.target)) {
        this.dropdown.classList.remove("show");
      }
    });

    // Hapus semua notifikasi
    this.clearAllBtn.addEventListener("click", () => {
      this.clearAllNotifications();
    });
  }

  toggleDropdown() {
    this.dropdown.classList.toggle("show");
  }

  renderNotifications() {
    this.notificationList.innerHTML = this.notifications
      .map(
        (notif) => `
        <div class="notification-item" data-id="${notif.id}">
          <div class="notification-content">
            <div class="notification-message">${notif.message}</div>
            <div class="notification-time">${notif.time}</div>
          </div>
          <button class="delete-notification" onclick="notificationManager.deleteNotification(${notif.id})">
            <i class='bx bx-x'></i>
          </button>
        </div>
      `
      )
      .join("");
  }

  deleteNotification(id) {
    this.notifications = this.notifications.filter((notif) => notif.id !== id);
    this.renderNotifications();
    this.updateNotificationCount();
  }

  clearAllNotifications() {
    this.notifications = [];
    this.renderNotifications();
    this.updateNotificationCount();
  }

  updateNotificationCount() {
    const count = this.notifications.length;
    this.numBadge.textContent = count;

    if (count === 0) {
      this.numBadge.style.display = "none";
      this.notificationList.innerHTML = `
        <div class="notification-item">
          <div class="notification-content">
            <div class="notification-message">Tidak ada notifikasi</div>
          </div>
        </div>
      `;
    } else {
      this.numBadge.style.display = "block";
    }
  }
}

// Inisialisasi
const notificationManager = new NotificationManager();
// TODO NOTIFICATION END======================================================================

// TODO BTN DATE START======================================================================
document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.getElementById("current-date");
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  currentDateElement.textContent = formattedDate;
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// TODO BTN DATE END======================================================================

// !mode gelap
const switchMode = document.getElementById("switch-mode");

// Saat halaman dimuat, cek preferensi dari localStorage
document.addEventListener("DOMContentLoaded", function () {
  const savedMode = localStorage.getItem("theme");
  const body = document.body;

  // Tambahkan transisi setelah halaman sepenuhnya dimuat
  setTimeout(() => {
    body.classList.add("transition-enabled");
  }, 100); // Delay 100ms agar transisi lebih natural

  // Terapkan preferensi mode
  if (savedMode === "dark") {
    body.classList.add("dark");
    switchMode.checked = true;
  } else {
    body.classList.remove("dark");
    switchMode.checked = false;
  }
});

// Event listener untuk toggle switch
switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark"); // Simpan preferensi ke localStorage
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light"); // Simpan preferensi ke localStorage
  }
});
// !end mode gelap

// TODO BATAS WAKTU PENGAJUAN START======================================================================
const overlayTime = document.getElementById("overlay");
const popupTime = document.getElementById("popup");
const aturButton = document.getElementById("atur-button");

aturButton.addEventListener("click", (e) => {
  e.preventDefault();
  popupTime.style.display = "block";
  overlayTime.style.display = "block";
});

function closePopup() {
  popupTime.style.display = "none";
  overlayTime.style.display = "none";
}
// TODO BATAS WAKTU PENGAJUAN END======================================================================

// TODO VIEW JUDUL DI DASHBOARD START=========================================================
// Fungsi untuk membuka modal
function openJudul() {
  document.getElementById("viewJudul").style.display = "block";
}

// Fungsi untuk menutup modal
function closeJudul() {
  document.getElementById("viewJudul").style.display = "none";
}

// Tutup modal jika pengguna mengklik di luar modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});
// TODO VIEW JUDUL DI DASHBOARD END======================================================================

// ?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ?DAFTAR MAHASISWA HTML START

// TODO START dropdown script
const filterIcon = document.getElementById("filter-icon");
const dropdownMenu = document.getElementById("dropdown-menu");

filterIcon.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!filterIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});
// TODO END DROPDOWN SCRIPT=================================================================

// TODO START FUNGSI PENCARIAN=================================================================
const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

// Tampilkan input pencarian saat ikon diklik
searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  } else {
    searchInput.value = "";
  }
});

// Fungsi pencarian
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".searchable-item"); // Tambahkan kelas ini ke elemen yang ingin dicari

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
// TODO END FUNGSI PENCARIAN=================================================================

// ?DAFTAR MAHASISWA HTML END
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END DPA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>START DAFTAR JUDUL<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END DAFTAR JUDUL<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>START DAFTAR MAHASISWA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>START DAFTAR MAHASISWA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END DASHBOARD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END DASHBOARD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END DASHBOARD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
