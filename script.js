// Fungsi toggle navbar untuk mobile
function toggleNavbar() {
  const sideNav = document.getElementById("sideNav");
  const hamburgerIcon = document.querySelector(".hamburger");

  // Toggle kelas 'open' pada side nav
  sideNav.classList.toggle("open");

  // Toggle icon hamburger
  hamburgerIcon.classList.toggle("active");
}

// Fungsi smooth scrolling
document.addEventListener("DOMContentLoaded", function () {
  // Pilih semua link dengan href yang dimulai dengan '#'
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Mencegah perilaku default link
      e.preventDefault();

      // Ambil ID target dari atribut href
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      // Tutup sidebar setelah klik link (untuk mode mobile)
      const sideNav = document.getElementById("sideNav");
      if (sideNav.classList.contains("open")) {
        toggleNavbar();
      }

      // Scroll ke elemen target
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add this JavaScript to set active link
document.addEventListener("DOMContentLoaded", function () {
  // Get current page URL
  const currentLocation = location.href;

  // Select all nav links
  const navLinks = document.querySelectorAll(".navbar .nav-links a");

  navLinks.forEach((link) => {
    // Remove active class from all links first
    link.classList.remove("active");

    // Check if link's href matches current page's section
    if (currentLocation.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
});

// todo popup

// Fungsi untuk menampilkan popup
function showPopup(popupId) {
  document.getElementById(popupId).classList.remove("hidden");
}

// Fungsi untuk menyembunyikan popup
function hidePopup(popupId) {
  document.getElementById(popupId).classList.add("hidden");
}

// Menangani klik pada tombol DAFTAR
document.getElementById("register-btn").addEventListener("click", () => {
  showPopup("register-popup");
});

// Menangani klik pada tombol MASUK
document.getElementById("login-btn").addEventListener("click", () => {
  showPopup("login-popup");
});

// Menangani pilihan dalam popup register
document
  .querySelectorAll("#register-popup button[data-role]")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      const role = e.target.getAttribute("data-role");
      const targetUrl = `form/${role}/register.html`;
      console.log(`Redirecting to: ${targetUrl}`); // Debugging
      window.location.href = targetUrl;
    });
  });

// Menangani pilihan dalam popup login
document
  .querySelectorAll("#login-popup button[data-role]")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      const role = e.target.getAttribute("data-role");
      const targetUrl = `form/${role}/login.html`;
      console.log(`Redirecting to: ${targetUrl}`); // Debugging
      window.location.href = targetUrl;
    });
  });

// Menangani klik pada tombol Tutup
document.addEventListener("DOMContentLoaded", () => {
  // Select all close buttons
  const closeButtons = document.querySelectorAll(".close-btn");

  // Select both popups
  const registerPopup = document.getElementById("register-popup");
  const loginPopup = document.getElementById("login-popup");

  // Add click event to each close button
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Find the parent popup of the clicked close button
      const popup = button.closest(".popup");
      if (popup) {
        popup.classList.add("hidden");
      }
    });
  });
});

// !END INDEX LANDING PAGE///////////////////////////////////////////////////////
