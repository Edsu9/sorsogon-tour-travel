document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
    const staggerItems = document.querySelectorAll(".stagger-item")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("active")
      }
    })

    // Handle staggered animations
    const staggerContainers = document.querySelectorAll(".stagger-container")
    staggerContainers.forEach((container) => {
      const containerPosition = container.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (containerPosition < windowHeight - 100) {
        const items = container.querySelectorAll(".stagger-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("active")
          }, 150 * index)
        })
      }
    })
  }

  // Run on page load
  animateOnScroll()

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Header Scroll Effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      // Toggle icon between bars and X
      const icon = this.querySelector("i")
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-menu") && !event.target.closest(".menu-toggle")) {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        const icon = menuToggle.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  })

  // Destination Slider
  const slides = document.querySelectorAll(".destination-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (slides.length > 0) {
    let currentSlide = 0
    let slideInterval

    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Show the current slide and activate the corresponding dot
      slides[index].classList.add("active")
      dots[index].classList.add("active")
    }

    // Function to go to the next slide
    function nextSlide() {
      currentSlide++
      if (currentSlide >= slides.length) {
        currentSlide = 0
      }
      showSlide(currentSlide)
    }

    // Function to go to the previous slide
    function prevSlide() {
      currentSlide--
      if (currentSlide < 0) {
        currentSlide = slides.length - 1
      }
      showSlide(currentSlide)
    }

    // Start automatic slideshow
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 5000)
    }

    // Stop automatic slideshow
    function stopSlideshow() {
      clearInterval(slideInterval)
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
        stopSlideshow()
        startSlideshow()
      })
    })

    // Event listener for previous button
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide()
        stopSlideshow()
        startSlideshow()
      })
    }

    // Event listener for next button
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide()
        stopSlideshow()
        startSlideshow()
      })
    }

    // Pause slideshow on hover
    const sliderContainer = document.querySelector(".destination-slider")
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopSlideshow)
      sliderContainer.addEventListener("mouseleave", startSlideshow)
    }

    // Start the slideshow
    startSlideshow()
  }

  // Testimonials Page - Star Rating
  const ratingStars = document.querySelectorAll(".rating-select i")
  const ratingInput = document.getElementById("rating")

  if (ratingStars.length > 0 && ratingInput) {
    ratingStars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = star.getAttribute("data-rating")
        ratingInput.value = rating

        // Update star display
        ratingStars.forEach((s) => {
          const starRating = s.getAttribute("data-rating")
          if (starRating <= rating) {
            s.classList.remove("far")
            s.classList.add("fas")
            s.classList.add("active")
          } else {
            s.classList.remove("fas")
            s.classList.add("far")
            s.classList.remove("active")
          }
        })
      })

      star.addEventListener("mouseover", () => {
        const rating = star.getAttribute("data-rating")

        // Update star display on hover
        ratingStars.forEach((s) => {
          const starRating = s.getAttribute("data-rating")
          if (starRating <= rating) {
            s.classList.remove("far")
            s.classList.add("fas")
          } else {
            s.classList.remove("fas")
            s.classList.add("far")
          }
        })
      })

      star.addEventListener("mouseout", () => {
        // Reset to selected rating
        const selectedRating = ratingInput.value

        ratingStars.forEach((s) => {
          const starRating = s.getAttribute("data-rating")
          if (starRating <= selectedRating) {
            s.classList.remove("far")
            s.classList.add("fas")
            s.classList.add("active")
          } else {
            s.classList.remove("fas")
            s.classList.add("far")
            s.classList.remove("active")
          }
        })
      })
    })
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
            const icon = otherItem.querySelector(".toggle-icon i")
            icon.className = "fas fa-plus"
          }
        })

        // Toggle current item
        item.classList.toggle("active")
        const icon = item.querySelector(".toggle-icon i")

        if (item.classList.contains("active")) {
          icon.className = "fas fa-minus"
        } else {
          icon.className = "fas fa-plus"
        }
      })
    })
  }

  // Fixed: Destination Gallery - Thumbnail Click
  // Completely rewritten to fix the overlapping issue
  const initializeGalleries = () => {
    const galleries = document.querySelectorAll(".destination-gallery")

    if (galleries.length > 0) {
      galleries.forEach((gallery) => {
        const mainImage = gallery.querySelector(".main-image img")
        const thumbnails = gallery.querySelectorAll(".thumbnail")

        // Track if a transition is in progress
        let isTransitioning = false

        thumbnails.forEach((thumbnail) => {
          thumbnail.addEventListener("click", function (e) {
            e.preventDefault()

            // Prevent rapid clicking that causes glitches
            if (isTransitioning || !mainImage) return

            // Mark as transitioning to prevent multiple clicks
            isTransitioning = true

            // Get the image source and alt text
            const thumbnailSrc = this.getAttribute("src")
            const thumbnailAlt = this.getAttribute("alt")

            // Set a fixed height on the main image container to prevent layout shift
            const mainImageContainer = mainImage.parentElement
            mainImageContainer.style.height = mainImageContainer.offsetHeight + "px"

            // Smoothly fade out
            mainImage.style.transition = "opacity 0.3s ease"
            mainImage.style.opacity = "0"

            // After fade out completes, swap images and fade back in
            setTimeout(() => {
              // Update main image
              mainImage.setAttribute("src", thumbnailSrc)
              mainImage.setAttribute("alt", thumbnailAlt)

              // Highlight the clicked thumbnail
              thumbnails.forEach((thumb) => (thumb.style.border = "2px solid transparent"))
              this.style.border = "2px solid var(--primary-color)"

              // Fade back in
              mainImage.style.opacity = "1"

              // Reset transition flag after animation completes
              setTimeout(() => {
                isTransitioning = false
                // Remove the fixed height after transition completes
                mainImageContainer.style.height = ""
              }, 300)
            }, 300)
          })
        })
      })
    }
  }

  // Initialize all galleries
  initializeGalleries()

  // Form Submission with Animation
  const contactForm = document.getElementById("contactForm")
  const storyForm = document.querySelector(".story-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      // Simulate form submission (would be replaced with actual AJAX in production)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
        submitBtn.classList.add("success")

        // Show success message
        const formContainer = contactForm.closest(".form-container")
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for your message! This is a demo form, so no data has been sent. In a real website, your message would be sent to our team.'
        formContainer.appendChild(successMessage)

        // Reset form after delay
        setTimeout(() => {
          contactForm.reset()
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.classList.remove("success")

          // Fade out and remove success message
          successMessage.style.opacity = "0"
          setTimeout(() => {
            successMessage.remove()
          }, 500)
        }, 3000)
      }, 1500)
    })
  }

  if (storyForm) {
    storyForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!'
        submitBtn.classList.add("success")

        // Show success message
        const formContainer = storyForm.closest(".story-form-container")
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for sharing your story! This is a demo form, so no data has been sent. In a real website, your testimonial would be submitted for review.'
        formContainer.appendChild(successMessage)

        // Reset form after delay
        setTimeout(() => {
          storyForm.reset()
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.classList.remove("success")

          // Reset rating stars
          const ratingStars = document.querySelectorAll(".rating-select i")
          if (ratingStars.length > 0) {
            ratingStars.forEach((star) => {
              star.classList.remove("fas", "active")
              star.classList.add("far")
            })
          }

          // Reset rating input
          const ratingInput = document.getElementById("rating")
          if (ratingInput) {
            ratingInput.value = 0
          }

          // Fade out and remove success message
          successMessage.style.opacity = "0"
          setTimeout(() => {
            successMessage.remove()
          }, 500)
        }, 3000)
      }, 1500)
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          // Calculate header height for offset
          const headerHeight = document.querySelector("header").offsetHeight

          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
            const icon = menuToggle.querySelector("i")
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      }
    })
  })

  // Video placeholder click with animation
  const videoPlaceholders = document.querySelectorAll(".video-placeholder")

  if (videoPlaceholders.length > 0) {
    videoPlaceholders.forEach((placeholder) => {
      placeholder.addEventListener("click", function () {
        const playButton = this.querySelector(".play-button")

        // Animate play button
        playButton.style.transform = "translate(-50%, -50%) scale(1.2)"
        playButton.style.backgroundColor = "var(--primary-color)"
        playButton.querySelector("i").style.color = "white"

        setTimeout(() => {
          alert("This is a placeholder for video content. In a real website, this would play a video testimonial.")

          // Reset play button
          playButton.style.transform = "translate(-50%, -50%)"
          playButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
          playButton.querySelector("i").style.color = "var(--primary-color)"
        }, 300)
      })
    })
  }

  // Add success message styling
  const style = document.createElement("style")
  style.textContent = `
        .success-message {
            background-color: rgba(40, 167, 69, 0.1);
            color: #28a745;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            transition: opacity 0.5s ease;
        }
        
        .success-message i {
            font-size: 1.5rem;
            margin-right: 10px;
        }
        
        button.success {
            background-color: #28a745 !important;
        }
    `
  document.head.appendChild(style)

  // Add scroll down arrow animation
  const scrollDownArrow = document.querySelector(".scroll-down a")
  if (scrollDownArrow) {
    scrollDownArrow.addEventListener("click", (e) => {
      e.preventDefault()
      const nextSection = document.querySelector(".about-preview, .services-preview")
      if (nextSection) {
        const headerHeight = document.querySelector("header").offsetHeight
        window.scrollTo({
          top: nextSection.offsetTop - headerHeight,
          behavior: "smooth",
        })
      }
    })
  }

  // Add animation classes to elements
  const addAnimationClasses = () => {
    // Section headers
    document.querySelectorAll(".section-header").forEach((header) => {
      header.classList.add("fade-in")
    })

    // About section
    const aboutText = document.querySelector(".about-text")
    const aboutImage = document.querySelector(".about-image")
    if (aboutText && aboutImage) {
      aboutText.classList.add("slide-in-left")
      aboutImage.classList.add("slide-in-right")
    }

    // Services grid
    const serviceCards = document.querySelectorAll(".service-card")
    if (serviceCards.length > 0) {
      const servicesGrid = document.querySelector(".services-grid")
      servicesGrid.classList.add("stagger-container")
      serviceCards.forEach((card) => {
        card.classList.add("stagger-item")
      })
    }

    // Testimonial cards
    const testimonialCard = document.querySelector(".testimonial-card")
    if (testimonialCard) {
      testimonialCard.classList.add("scale-in")
    }

    // CTA section
    const ctaSection = document.querySelector(".cta-section .container")
    if (ctaSection) {
      ctaSection.classList.add("fade-in")
    }

    // Team members
    const teamMembers = document.querySelectorAll(".team-member")
    if (teamMembers.length > 0) {
      const teamGrid = document.querySelector(".team-grid")
      teamGrid.classList.add("stagger-container")
      teamMembers.forEach((member) => {
        member.classList.add("stagger-item")
      })
    }

    // Value cards
    const valueCards = document.querySelectorAll(".value-card")
    if (valueCards.length > 0) {
      const valuesGrid = document.querySelector(".values-grid")
      valuesGrid.classList.add("stagger-container")
      valueCards.forEach((card) => {
        card.classList.add("stagger-item")
      })
    }

    // Info cards
    const infoCards = document.querySelectorAll(".info-card")
    if (infoCards.length > 0) {
      const infoCardsContainer = document.querySelector(".info-cards")
      infoCardsContainer.classList.add("stagger-container")
      infoCards.forEach((card) => {
        card.classList.add("stagger-item")
      })
    }

    // FAQ items
    const faqItems = document.querySelectorAll(".faq-item")
    if (faqItems.length > 0) {
      const faqContainer = document.querySelector(".faq-container")
      faqContainer.classList.add("stagger-container")
      faqItems.forEach((item) => {
        item.classList.add("stagger-item")
      })
    }
  }

  // Run animation class assignment
  addAnimationClasses()
})

