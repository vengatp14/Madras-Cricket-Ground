//data count
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-big");

  counters.forEach(counter => {
    const target = +counter.dataset.count;
    let current = 0;
    const increment = Math.ceil(target / 100);

    const updateCount = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  });
});

//preloader
window.addEventListener("load", () => {
    const loader = document.getElementById("mcg-preloader");

    // minimum loader time (milliseconds)
    const MIN_LOADING_TIME = 4500; // 2.5 seconds

    setTimeout(() => {
      loader.classList.add("hide-loader");
    }, MIN_LOADING_TIME);
  });

    // Simple preloader hide
    window.addEventListener("load", function () {
      const preloader = document.getElementById("mcg-preloader");
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.10s ease";
        setTimeout(() => preloader.remove(), 1000);
      }
    });

    const gallery = document.querySelector('.gallery');

/* Pause on touch gallery */
gallery.addEventListener('touchstart', () => {
    gallery.classList.add('paused');
});

gallery.addEventListener('mousedown', () => {
    gallery.classList.add('paused');
});

/* Resume when released */
gallery.addEventListener('touchend', () => {
    gallery.classList.remove('paused');
});

gallery.addEventListener('mouseup', () => {
    gallery.classList.remove('paused');
});

gallery.addEventListener('mouseleave', () => {
    gallery.classList.remove('paused');
});

    // Active nav link on scroll
    // const sections = ["hero", "services", "about", "mission", "faq", "testimonials", "contact"];
    // const navLinks = document.querySelectorAll(".mcg-nav-link");

    // window.addEventListener("scroll", () => {
    //   let current = "hero";
    //   sections.forEach(id => {
    //     const el = document.getElementById(id);
    //     if (el && window.scrollY >= el.offsetTop - 140) {
    //       current = id;
    //     }
    //   });
    //   navLinks.forEach(link => {
    //     const href = link.getAttribute("href");
    //     const targetId = href ? href.replace("#", "") : "";
    //     link.classList.toggle("active", targetId === current);
    //   });
    // });


  const bookingForm = document.getElementById("mcgBookingForm");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidMobile(mobile) {
    // Basic India-style: optional +91 / 0, then 10 digits
    return /^(\+91[\-\s]?|0)?\d{10}$/.test(mobile);
  }

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("bk-name").value.trim();
    const email = document.getElementById("bk-email").value.trim();
    const mobile = document.getElementById("bk-mobile").value.trim();
    const date = document.getElementById("bk-date").value;
    const start = document.getElementById("bk-start").value;
    const end = document.getElementById("bk-end").value;
    const surface = document.getElementById("bk-surface").value;
    const notes = document.getElementById("bk-notes").value.trim();

    // Basic required validation
    if (!name || !email || !mobile || !date || !start || !end) {
      alert("Please fill all required fields (name, email, mobile, date, start & end time).");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidMobile(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Validate time: end must be after start
    const startMinutes = start.split(":")[0] * 60 + parseInt(start.split(":")[1], 10);
    const endMinutes = end.split(":")[0] * 60 + parseInt(end.split(":")[1], 10);
    if (endMinutes <= startMinutes) {
      alert("End time must be after start time.");
      return;
    }

    // Build common message
    const msgLines = [
      "New cricket slot booking enquiry - Madras Cricket Ground",
      "",
      "Name: " + name,
      "Email: " + email,
      "Mobile: " + mobile,
      "Date: " + date,
      "Time: " + start + " to " + end,
      "Surface: " + surface,
    ];
    if (notes) msgLines.push("Notes: " + notes);
    const message = msgLines.join("\n");

    // WhatsApp URL (replace with your booking number in international format)
    const waNumber = "919884015622"; // +91 98840 15622
    const waUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(message);

    // Email URL (mailto)
    const mailTo = "madrascricketground@gmail.com";
    const emailSubject = encodeURIComponent("New slot booking enquiry - " + name);
    const emailBody = encodeURIComponent(message);
    const mailUrl = "mailto:" + mailTo + "?subject=" + emailSubject + "&body=" + emailBody;

    // Open WhatsApp in new tab and email in same tab (or vice-versa)
    window.open(waUrl, "_blank");
    window.location.href = mailUrl;
  });

  // Counter animation for data-count elements
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const duration = 2000; // 2 seconds animation
      const start = Date.now();

      const update = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };

      update();
    });
  }

  // Trigger animation when CEO section comes into view
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.querySelector('[data-count]')) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe the CEO section for counter animation
  const ceoSection = document.querySelector('.ceo-spotlight-section');
  if (ceoSection) {
    observer.observe(ceoSection);
  }

  const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.add("active");
        document.querySelector(".gallery").classList.add("paused");
    });
});

/* Close when mouse moves out OR click outside */
modal.addEventListener("mousemove", () => {
    modal.classList.remove("active");
    document.querySelector(".gallery").classList.remove("paused");
});

modal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.querySelector(".gallery").classList.remove("paused");
});