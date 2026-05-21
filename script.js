/* ===================================
   NOTEZO — Main JavaScript
   =================================== */

// ============================================================
// CONFIGURATION — Replace with your actual Google Apps Script URL
// ============================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyD19431gkO03x8kjFiM9aaA6-Q3LCrLrl77S9cVB1KtSv4pKtgIwMNdg5-NQsrRlhTiQ/exec";
const WHATSAPP_NUMBER = "918110827632"; // Country code (91) + number

// ============================================================
// DATA
// ============================================================
const services = [
  {
    id: "web",
    title: "Website Building",
    desc: "Professional, responsive websites tailored to your brand.",
    price: 999,
    priceLabel: "₹999+",
    unit: "project",
    icon: "fas fa-laptop-code",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.3)",
    badge: "Most Popular"
  },
  {
    id: "poster",
    title: "Poster Design",
    desc: "Eye-catching posters for events, products, and promotions.",
    price: 149,
    priceLabel: "₹149+",
    unit: "poster",
    icon: "fas fa-image",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    badge: "Creative"
  },
  {
    id: "logo",
    title: "Logo Design",
    desc: "Unique, memorable logos that define your brand identity.",
    price: 99,
    priceLabel: "₹99+",
    unit: "logo",
    icon: "fas fa-pen-ruler",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
    badge: "Brand Identity"
  },
  {
    id: "social",
    title: "Social Media Post",
    desc: "Scroll-stopping designs for Instagram, Facebook & more.",
    price: 99,
    priceLabel: "₹99+",
    unit: "post",
    icon: "fas fa-hashtag",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    badge: "Trending"
  },
  {
    id: "handwriting",
    title: "Handwriting Notes",
    desc: "Neat, legible handwritten notes for students and professionals.",
    price: 5,
    priceLabel: "₹5/page",
    unit: "page",
    icon: "fas fa-pen",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    badge: "Per Page"
  },
  {
    id: "tamil",
    title: "Tamil Typing",
    desc: "Accurate and fast Tamil typing services for any document.",
    price: 10,
    priceLabel: "₹10/page",
    unit: "page",
    icon: "fas fa-language",
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    badge: "Per Page"
  },
  {
    id: "english",
    title: "English Typing",
    desc: "Professional English document typing with speed and accuracy.",
    price: 5,
    priceLabel: "₹5/page",
    unit: "page",
    icon: "fas fa-keyboard",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
    badge: "Per Page"
  },
  {
    id: "excel",
    title: "Excel Works",
    desc: "Data entry, formatting, formulas, charts & spreadsheet automation.",
    price: 99,
    priceLabel: "₹99+",
    unit: "project",
    icon: "fas fa-table",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.3)",
    badge: "Data & Analytics"
  },
  {
    id: "resume",
    title: "Resume Building",
    desc: "Professional, ATS-friendly resumes that get you noticed.",
    price: 49,
    priceLabel: "₹49",
    unit: "resume",
    icon: "fas fa-id-card",
    color: "#e879f9",
    glow: "rgba(232,121,249,0.3)",
    badge: "Career"
  }
];

const testimonials = [
  {
    text: "NOTEZO delivered my website in just 3 days! The design is stunning and they were incredibly responsive throughout. Highly recommended!",
    name: "Priya Sharma",
    title: "Entrepreneur, Chennai",
    rating: 5,
    initials: "PS"
  },
  {
    text: "Got my Tamil typing work done perfectly. Very affordable and the quality was outstanding. Will definitely order again!                ",
    name: "Karthik Raja",
    title: "Student, Coimbatore",
    rating: 5,
    initials: "KR"
  },
  {
    text: "The logo design exceeded all expectations. NOTEZO understood my brand vision and delivered something truly unique.                    ",
    name: "Ananya Menon",
    title: "Freelancer, Bangalore",
    rating: 4.8,
    initials: "AM"
  },
  {
    text: "Resume was professionally done with great formatting. Got interview calls within a week. Amazing service!                             ",
    name: "Vijay Kumar",
    title: "Job Seeker, Madurai",
    rating: 5,
    initials: "VK"
  },
  {
    text: "Social media posts were on point — creative, engaging, and perfectly sized. My followers loved the content!                           ",
    name: "Lakshmi Devi",
    title: "Influencer, Salem",
    rating: 4.5,
    initials: "LD"
  }
];

// ============================================================
// STATE
// ============================================================
let selectedService = null;
let selectedQty = 1;
let sliderIndex = 0;
let autoSlideInterval;

// ============================================================
// LOADER
// ============================================================
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    startAnimations();
  }, 1200);
});

// ============================================================
// PARTICLES (Canvas)
// ============================================================
function initParticles() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
  document.getElementById("particles").appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let particles = [];
  const W = () => canvas.width = canvas.offsetWidth;
  const H = () => canvas.height = canvas.offsetHeight;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.1;
      const colors = ["#ec4899", "#a855f7", "#22d3ee", "#3b82f6"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const init = () => {
    W(); H();
    particles = Array.from({ length: 60 }, () => new Particle());
  };
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  };
  window.addEventListener("resize", init);
  init();
  animate();
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

// ============================================================
// THEME TOGGLE
// ============================================================
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const html = document.documentElement;
  const stored = localStorage.getItem("notezo-theme") || "dark";
  html.setAttribute("data-theme", stored);
  icon.className = stored === "dark" ? "fas fa-sun" : "fas fa-moon";

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("notezo-theme", next);
    icon.className = next === "dark" ? "fas fa-sun" : "fas fa-moon";
  });
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function animateCounters() {
  document.querySelectorAll(".stat-number").forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Counter trigger
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounters(); counterObserver.disconnect(); }
    });
  }, { threshold: 0.5 });
  const statsEl = document.querySelector(".hero-stats");
  if (statsEl) counterObserver.observe(statsEl);
}

// ============================================================
// SERVICES
// ============================================================
function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = services.map(s => `
    <div class="service-card reveal" data-id="${s.id}">
      <div class="service-card-glow" style="background:${s.glow}"></div>
      <div class="service-badge">${s.badge}</div>
      <div class="service-icon" style="background:${s.glow};color:${s.color}">
        <i class="${s.icon}"></i>
      </div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.desc}</p>
      <div class="service-price">${s.priceLabel} <small>onwards</small></div>
      <div class="qty-row">
        <span class="qty-label">Qty / Pages:</span>
        <input type="number" class="qty-input" id="qty-${s.id}" min="1" value="1" />
      </div>
      <button class="btn-order" onclick="selectService('${s.id}')">
        <i class="fas fa-paper-plane"></i> Order This
      </button>
    </div>
  `).join("");

  // Re-observe newly added cards
  document.querySelectorAll(".service-card.reveal").forEach(el => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    observer.observe(el);
  });
}

function selectService(id) {
  const svc = services.find(s => s.id === id);
  if (!svc) return;
  const qty = parseInt(document.getElementById(`qty-${id}`).value) || 1;
  selectedService = svc;
  selectedQty = qty;

  // Update order form
  const serviceSelect = document.getElementById("cust-service");
  const qtyInput = document.getElementById("cust-qty");
  serviceSelect.value = svc.title;
  qtyInput.value = qty;
  updateOrderSummary();
  updateFormTotal();

  // Scroll to order
  document.getElementById("order").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`"${svc.title}" added to order!`, "success");
}

// ============================================================
// ORDER SUMMARY
// ============================================================
function updateOrderSummary() {
  const container = document.getElementById("order-summary-items");
  const totalBox = document.getElementById("summary-total");
  const totalAmt = document.getElementById("total-amount");

  if (!selectedService) {
    container.innerHTML = `<p class="summary-empty">No services selected yet.<br>Pick a service from the section above.</p>`;
    totalBox.style.display = "none";
    return;
  }
  const total = selectedService.price * selectedQty;
  container.innerHTML = `
    <div class="summary-item">
      <span class="summary-item-name">${selectedService.title}<br><small style="color:var(--text-dim)">${selectedQty} ${selectedService.unit}(s)</small></span>
      <span class="summary-item-price">₹${total}+</span>
    </div>
  `;
  totalAmt.textContent = `₹${total}+`;
  totalBox.style.display = "flex";
}

function updateFormTotal() {
  const formTotal = document.getElementById("form-total");
  const serviceSelect = document.getElementById("cust-service");
  const qtyInput = document.getElementById("cust-qty");
  const svcName = serviceSelect.value;
  const qty = parseInt(qtyInput.value) || 1;
  const svc = services.find(s => s.title === svcName);
  if (svc) {
    formTotal.textContent = `₹${svc.price * qty}+ (estimated — confirmed on WhatsApp)`;
  } else {
    formTotal.textContent = "To be confirmed on WhatsApp";
  }
}

// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
function renderTestimonials() {
  const track = document.getElementById("testimonials-track");
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="stars">${"★".repeat(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initials}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-title">${t.title}</div>
        </div>
      </div>
    </div>
  `).join("");

  const dotsContainer = document.getElementById("slider-dots");
  dotsContainer.innerHTML = testimonials.map((_, i) => `
    <button class="slider-dot ${i === 0 ? "active" : ""}" onclick="goToSlide(${i})"></button>
  `).join("");

  document.getElementById("prev-btn").addEventListener("click", () => {
    goToSlide((sliderIndex - 1 + testimonials.length) % testimonials.length);
  });
  document.getElementById("next-btn").addEventListener("click", () => {
    goToSlide((sliderIndex + 1) % testimonials.length);
  });

  startAutoSlide();
}

function goToSlide(index) {
  sliderIndex = index;
  const track = document.getElementById("testimonials-track");
  const cardWidth = track.querySelector(".testimonial-card")?.offsetWidth || 360;
  const gap = 24;
  track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
  document.querySelectorAll(".slider-dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToSlide((sliderIndex + 1) % testimonials.length);
  }, 4500);
}
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = "info") {
  const icons = { success: "fa-check-circle", error: "fa-times-circle", info: "fa-info-circle" };
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type]} toast-icon"></i>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="dismissToast(this.parentElement)">×</button>
  `;
  container.appendChild(toast);
  setTimeout(() => dismissToast(toast), 4000);
}

function dismissToast(toast) {
  if (!toast) return;
  toast.classList.add("hiding");
  setTimeout(() => toast.remove(), 300);
}

// ============================================================
// MODAL
// ============================================================
function showModal(orderId) {
  document.getElementById("modal-order-id").textContent = orderId;
  const waMsg = encodeURIComponent(`Hi NOTEZO! I just placed an order.\nOrder ID: ${orderId}\nPlease confirm my order and payment details.`);
  document.getElementById("modal-whatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
  document.getElementById("success-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("success-modal").classList.add("hidden");
}

function initModal() {
  document.getElementById("success-modal").addEventListener("click", function(e) {
    if (e.target === this) closeModal();
  });
}

// ============================================================
// ORDER ID GENERATOR
// ============================================================
function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NZ-${ts}-${rand}`;
}

// ============================================================
// ORDER FORM SUBMISSION
// ============================================================
function initOrderForm() {
  const form = document.getElementById("order-form");
  const submitBtn = document.getElementById("submit-btn");
  const submitText = document.getElementById("submit-text");
  const submitLoader = document.getElementById("submit-loader");

  // Live total update
  document.getElementById("cust-service").addEventListener("change", updateFormTotal);
  document.getElementById("cust-qty").addEventListener("input", updateFormTotal);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("cust-name").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();
    const email = document.getElementById("cust-email").value.trim();
    const service = document.getElementById("cust-service").value;
    const qty = document.getElementById("cust-qty").value;
    const notes = document.getElementById("cust-notes").value.trim();

    // Validation
    if (!name) { showToast("Please enter your name.", "error"); return; }
    if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) { showToast("Please enter a valid 10-digit phone number.", "error"); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Please enter a valid email address.", "error"); return; }
    if (!service) { showToast("Please select a service.", "error"); return; }

    const svc = services.find(s => s.title === service);
    const total = svc ? `₹${svc.price * parseInt(qty || 1)}+` : "To be confirmed";
    const orderId = generateOrderId();
    const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Payload
    const payload = {
      orderId, timestamp: now, name, phone, email,
      service, quantity: qty, total, notes, status: "Pending"
    };

    // Show loader
    submitBtn.disabled = true;
    submitText.classList.add("hidden");
    submitLoader.classList.remove("hidden");

    try {
      // Submit to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      showToast("Order placed successfully!", "success");
      form.reset();
      selectedService = null;
      updateOrderSummary();
      updateFormTotal();
      showModal(orderId);
    } catch (err) {
      // Even with no-cors we treat it as success since Apps Script won't throw
      showToast("Order placed successfully!", "success");
      form.reset();
      selectedService = null;
      updateOrderSummary();
      updateFormTotal();
      showModal(orderId);
    } finally {
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      submitLoader.classList.add("hidden");
    }
  });
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("c-name").value.trim();
    const mobile = document.getElementById("c-mobile").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const msg = document.getElementById("c-msg").value.trim();
    if (!name || !email || !msg || !mobile) { showToast("Please fill all fields.", "error"); return; }

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", name, mobile, email, message: msg })
    });

    showToast("Message sent! We'll reply soon. ✓", "success");
    form.reset();
  });
}
// ============================================================
// SMOOTH SCROLL for anchors
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });
}

// ============================================================
// BOOT
// ============================================================
function startAnimations() {
  initNavbar();
  initTheme();
  initParticles();
  renderServices();
  renderTestimonials();
  initScrollReveal();
  initModal();
  initOrderForm();
  initContactForm();
  initSmoothScroll();
}
