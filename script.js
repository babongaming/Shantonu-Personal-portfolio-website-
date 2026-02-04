document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const IMPORTANT_LINKS = {
    linkedin: "https://www.linkedin.com/in/shantonu-deb-babon-82aba2289",
    fiverr: "https://www.fiverr.com/s/DBAogrA",
    upwork: "https://www.upwork.com/freelancers/~01307f2c06a365efd7?mp_source=share",
    youtube: {
      hero_video: "",
      video_1: "https://youtu.be/ifdHinW_EXk"
    }
  };

  // Portfolio video links from All_portfolio_video_link.txt (one per line, order 1–8)
  const PORTFOLIO_VIDEO_LINKS = [
    "https://drive.google.com/file/d/1sSXOGMBCh-YBXl3a1XfV-Rz3WrPaLweL/view?usp=sharing",
    "https://drive.google.com/file/d/1E9Mct2nkVZDtintSETLFwMTBxvOCXqwH/view?usp=sharing",
    "https://drive.google.com/file/d/1YdtFZdxO3DdrLukekhNptuXu1rLiTHkz/view?usp=sharing",
    "https://drive.google.com/file/d/1OCDcKyZdBiARpbt_KPlXE2eEjpthJBjj/view?usp=sharing",
    "https://drive.google.com/file/d/1k1cyzV0xihhTWfxHS3F2IFAP6yR7VLW4/view?usp=sharing",
    "https://drive.google.com/file/d/15LfvVwsY8bIB-PexdEfNUWQGTks-lomR/view?usp=sharing",
    "https://drive.google.com/file/d/1JX0UAq-1Cd_TNxJ7_hdYFlPUqeyM7Q4M/view?usp=sharing",
    "https://drive.google.com/file/d/1Wsw3ZZatYBF_tj7VwA4Mi38Vc7Iy-MEO/view?usp=sharing"
  ];

  function driveShareToEmbed(url) {
    try {
      const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      return m ? `https://drive.google.com/file/d/${m[1]}/preview` : "";
    } catch {
      return "";
    }
  }

  // Assign social links from central map
  document.querySelectorAll("[data-link-key]").forEach((el) => {
    const key = el.getAttribute("data-link-key");
    if (!key) return;
    const url = IMPORTANT_LINKS[key];
    if (typeof url === "string" && url.length > 0) {
      el.setAttribute("href", url);
    }
  });

  // Assign YouTube embeds (use youtube-nocookie for privacy)
  function toYoutubeEmbed(url) {
    try {
      const u = new URL(url);
      let id = "";

      if (u.hostname.includes("youtu.be")) {
        id = u.pathname.replace("/", "");
      } else if (u.hostname.includes("youtube.com")) {
        id = u.searchParams.get("v") || "";
      }

      if (!id) return "";
      return `https://www.youtube-nocookie.com/embed/${id}`;
    } catch {
      return "";
    }
  }

  document.querySelectorAll("iframe[data-youtube-key]").forEach((iframe) => {
    const key = iframe.getAttribute("data-youtube-key");
    if (!key) return;
    const url = IMPORTANT_LINKS.youtube?.[key];
    if (!url) return;
    const embed = toYoutubeEmbed(url);
    if (!embed) return;
    iframe.setAttribute("src", embed);
  });

  document.querySelectorAll("[data-scroll-to]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!(target instanceof HTMLElement)) return;
      const selector = target.getAttribute("data-scroll-to");
      if (!selector) return;
      const section = document.querySelector(selector);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Glass glow follows cursor
  const root = document.documentElement;
  window.addEventListener(
    "pointermove",
    (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty("--mx", `${x}%`);
      root.style.setProperty("--my", `${y}%`);
    },
    { passive: true }
  );

  // Corner portrait: click → expand to 3384×2350 (capped), 2s, cursor-following glow, then return
  const miniPortrait = document.querySelector("[data-mini-portrait]");
  if (miniPortrait instanceof HTMLElement) {
    let portraitTimer = 0;
    let portraitMove = null;

    function setPortraitGlow(e) {
      const r = miniPortrait.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      miniPortrait.style.setProperty("--portrait-mx", `${x}%`);
      miniPortrait.style.setProperty("--portrait-my", `${y}%`);
    }

    miniPortrait.addEventListener("click", () => {
      window.clearTimeout(portraitTimer);
      miniPortrait.classList.remove("is-popped", "is-fullscreen");
      miniPortrait.classList.add("is-expanded");
      portraitMove = (e) => setPortraitGlow(e);
      window.addEventListener("pointermove", portraitMove, { passive: true });
      portraitTimer = window.setTimeout(() => {
        miniPortrait.classList.remove("is-expanded");
        if (portraitMove) window.removeEventListener("pointermove", portraitMove);
      }, 2000);
    });
  }

  // Video modal: portfolio thumbnails + featured video (static frame → click → modal 1920×1080)
  const FEATURED_VIDEO_EMBED = "https://drive.google.com/file/d/1udvDSgEZ7ARi4zXKTx1uXB3HbK7LZsfX/preview";
  const videoModal = document.getElementById("video-modal");
  const videoModalIframe = document.getElementById("video-modal-iframe");

  // Featured video: no autoplay on load; iframe stays empty until user clicks play
  const featuredVideoIframe = document.querySelector("[data-featured-video-iframe]");

  function openVideoModal(embedUrl, isFeatured = false) {
    if (!videoModal || !videoModalIframe) return;
    videoModalIframe.src = embedUrl + (isFeatured ? "?autoplay=1" : "");
    if (isFeatured) videoModal.classList.add("video-modal--featured");
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    if (!videoModal || !videoModalIframe) return;
    videoModal.classList.remove("is-open", "video-modal--featured");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    videoModalIframe.src = "";
  }

  document.querySelectorAll("[data-featured-video]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openVideoModal(FEATURED_VIDEO_EMBED, true);
    });
  });

  document.querySelectorAll(".portfolio-video__thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const article = btn.closest("[data-portfolio-index]");
      const index = article ? parseInt(article.getAttribute("data-portfolio-index"), 10) : 0;
      const link = PORTFOLIO_VIDEO_LINKS[index - 1];
      if (!link) return;
      const embed = driveShareToEmbed(link);
      if (embed) openVideoModal(embed, false);
    });
  });

  videoModal?.querySelectorAll("[data-video-modal-close]").forEach((el) => {
    el.addEventListener("click", closeVideoModal);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideoModal();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  document
    .querySelectorAll(
      ".section--padded, .glass, .contact-card, .impact-stats-card, .portfolio-video-grid"
    )
    .forEach((el) => {
      el.classList.add("animate-in");
      observer.observe(el);
    });

  // Impact stats: count up from 0 when scrolled into view
  function animateCount(el, target, suffix = "", duration = 1600) {
    const start = 0;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const impactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const stat = entry.target;
        impactObserver.unobserve(stat);
        const valueEl = stat.querySelector("[data-count-to]");
        if (!valueEl) return;
        const target = parseInt(valueEl.getAttribute("data-count-to"), 10);
        const suffix = valueEl.getAttribute("data-count-suffix") || "";
        if (Number.isNaN(target)) return;
        animateCount(valueEl, target, suffix);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("[data-impact-stat]").forEach((el) => {
    impactObserver.observe(el);
  });

  // 4-Step Process: auto-cycle active step and progress line
  const processSection = document.querySelector("[data-process-section]");
  if (processSection) {
    const progressEl = processSection.querySelector("[data-process-progress]");
    const circles = [1, 2, 3, 4].map((n) =>
      processSection.querySelector(`[data-process-circle="${n}"]`)
    ).filter(Boolean);
    const cards = [1, 2, 3, 4].map((n) =>
      processSection.querySelector(`[data-process-card="${n}"]`)
    ).filter(Boolean);

    let activeStep = 1;
    const totalSteps = 4;
    const stepDuration = 4000;

    function setActiveStep(step) {
      activeStep = step;
      circles.forEach((el, i) => {
        el.classList.toggle("is-active", i + 1 === step);
      });
      cards.forEach((el, i) => {
        el.classList.toggle("is-active", i + 1 === step);
      });
      if (progressEl) {
        const pct = step === 1 ? 0 : ((step - 1) / (totalSteps - 1)) * 100;
        progressEl.style.width = `${pct}%`;
      }
    }

    setActiveStep(1);
    setInterval(() => {
      const next = (activeStep % totalSteps) + 1;
      setActiveStep(next);
    }, stepDuration);
  }
});

