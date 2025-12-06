// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Navbar background on scroll
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(12, 10, 15, 0.98)"
  } else {
    navbar.style.backgroundColor = "rgba(12, 10, 15, 0.9)"
  }
})

// Active navigation link on scroll
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.style.color = ""
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "#a855f7"
    }
  })
})

// Copy to clipboard functionality
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const textToCopy = btn.dataset.copy

    try {
      await navigator.clipboard.writeText(textToCopy)
      btn.classList.add("copied")

      // Change icon to checkmark
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`

      setTimeout(() => {
        btn.classList.remove("copied")
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
      }, 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  })
})

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Animate elements on scroll
document
  .querySelectorAll(".service-card, .gallery-item, .about-image, .about-content, .contact-card, .experience-card")
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

// Gallery lightbox
const galleryItems = document.querySelectorAll(".gallery-item")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    const overlay = document.createElement("div")
    overlay.className = "lightbox"
    overlay.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            </div>
        `

    overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(12, 10, 15, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 24px;
            cursor: pointer;
            backdrop-filter: blur(8px);
        `

    const lightboxContent = overlay.querySelector(".lightbox-content")
    lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `

    const lightboxImg = overlay.querySelector("img")
    lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 85vh;
            border-radius: 12px;
            object-fit: contain;
            box-shadow: 0 0 60px rgba(168, 85, 247, 0.2);
        `

    const closeBtn = overlay.querySelector(".lightbox-close")
    closeBtn.style.cssText = `
            position: absolute;
            top: -48px;
            right: 0;
            background: none;
            border: none;
            color: #a855f7;
            font-size: 32px;
            cursor: pointer;
            line-height: 1;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `

    document.body.appendChild(overlay)
    document.body.style.overflow = "hidden"

    // Animate in
    overlay.style.opacity = "0"
    requestAnimationFrame(() => {
      overlay.style.transition = "opacity 0.3s ease"
      overlay.style.opacity = "1"
    })

    // Close handlers
    const closeLightbox = () => {
      overlay.style.opacity = "0"
      setTimeout(() => {
        overlay.remove()
        document.body.style.overflow = ""
      }, 300)
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target === closeBtn) {
        closeLightbox()
      }
    })

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeLightbox()
        document.removeEventListener("keydown", handleEscape)
      }
    }
    document.addEventListener("keydown", handleEscape)
  })
})
