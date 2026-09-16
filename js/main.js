(() => {
  "use strict";

  /* ============================================================
     Case study data — one source of truth for the case grid,
     the results section, the case modal, and the process-map
     gallery modal.
     ============================================================ */
  const caseStudies = [
    {
      slug: "barbershop",
      tag: "Barbershop & Grooming",
      title: "Automated Booking System",
      teaser: "First click to loyal repeat customer, with zero manual follow-up in between.",
      headline: "Barbershop & Grooming — Automated Booking System",
      subhead: "A GoHighLevel pipeline that takes a walk-in booking request from first click to loyal repeat customer without a single manual follow-up.",
      problem: "Bookings were coming in through DMs, phone calls, and a booking widget with no shared pipeline — appointments were double-booked, confirmations were sent manually, and no-shows were never followed up.",
      solution: "Built a single pipeline covering New Appointment Request → Booking Confirmation → Service In Progress → Service Completed, with automated SMS/email confirmations and stage-based triggers at every step.",
      cardImage: "site-desktop.jpg",
      images: ["site-desktop.jpg", "site-content.jpg", "site-mobile.jpg", "site-desktop-dark.jpg", "site-mobile-dark.jpg", "process-map.jpg", "step-1.jpg", "step-2.jpg", "step-3.jpg", "step-4.jpg"],
      challenge: "Bookings scattered across DMs, calls, and a widget led to double-bookings and silent no-shows.",
      solution_short: "One pipeline, automated confirmations, and a completed-service follow-up that brings clients back."
    },
    {
      slug: "hvac",
      tag: "HVAC & Home Services",
      title: "End-to-End Job Pipeline",
      teaser: "From form submission to a completed job and a membership upsell — automatically.",
      headline: "HVAC & Home Services — End-to-End Job Pipeline",
      subhead: "From the first form submission to a completed job and a membership upsell, every stage of the service call moves itself forward.",
      problem: "Dispatch and follow-up lived in a technician's head and a paper board — jobs slipped through the cracks and repeat-service reminders never went out.",
      solution: "Mapped and automated Form Submitted → Appointment Scheduled → Work In Progress → Job Completed → Follow-Up & Membership Promo, so every job has a visible stage and a scheduled next touch.",
      cardImage: "site-desktop.jpg",
      images: ["site-desktop.jpg", "site-content.jpg", "site-mobile.jpg", "process-map.jpg", "step-1.jpg", "step-2.jpg", "step-3.jpg", "step-4.jpg", "step-5.jpg"],
      challenge: "Jobs tracked in someone's head meant missed follow-ups and no repeat-service reminders.",
      solution_short: "A five-stage pipeline that self-advances and automatically pitches membership renewals."
    },
    {
      slug: "landscaping",
      tag: "Landscaping & Outdoor Services",
      title: "Quote-to-Cash Automation",
      teaser: "Warm leads stay warm, and cancellations get rebooked instead of lost.",
      headline: "Landscaping — Quote-to-Cash Automation",
      subhead: "A quoting and scheduling flow that keeps leads warm, chases stale opportunities automatically, and recovers cancellations instead of losing the job.",
      problem: "Quotes went cold because no one followed up, and cancelled jobs simply disappeared from the pipeline instead of being rebooked.",
      solution: "Built New Inquiry → Quote Sent → Trigger Link Clicked → Service Scheduled → Cancellation Handling → Completed & Follow-Up, plus global automations for stale-opportunity nurture and do-not-disturb compliance.",
      cardImage: "site-desktop.jpg",
      images: ["site-desktop.jpg", "site-content.jpg", "site-mobile.jpg", "site-desktop-dark.jpg", "site-mobile-dark.jpg", "process-map.jpg", "step-1.jpg", "step-2.jpg", "step-3.jpg", "step-4.jpg", "step-5.jpg", "step-6.jpg"],
      challenge: "Cold quotes and disappearing cancellations meant paid-for leads went to waste.",
      solution_short: "Automatic stale-opportunity nurture recovers quotes and cancellations before they're lost for good."
    },
    {
      slug: "psych-clinic",
      tag: "Mental Health & Therapy",
      title: "Intake & Care Pipeline",
      teaser: "A sensitive, multi-branch intake flow that never feels automated.",
      headline: "Psych Clinic — Intake & Care Pipeline",
      subhead: "A sensitive, multi-branch intake flow that routes warm leads to assessment, tracks show/no-show outcomes, and nurtures ongoing care without feeling automated.",
      problem: "Intake coordinators were manually tracking who showed up for assessments, who needed a warm follow-up, and who was ready for discharge — a process too easy to lose in a spreadsheet.",
      solution: "Built New Intake → Warm Lead Trigger → Scheduled → Assessment (Show / No-Show branch) → Ongoing Therapy → Discharge, with nurture emails and reply-triggered support routing.",
      cardImage: "site-desktop.jpg",
      images: ["site-desktop.jpg", "site-content.jpg", "site-mobile.jpg", "site-desktop-dark.jpg", "site-mobile-dark.jpg", "process-map.jpg", "step-1.jpg", "step-2.jpg", "step-3.jpg", "step-4.jpg", "step-5.jpg", "step-6.jpg"],
      challenge: "Show/no-show tracking and discharge status lived in a spreadsheet that was easy to lose track of.",
      solution_short: "A branching pipeline that tracks every client's status automatically, without losing the human touch."
    },
    {
      slug: "med-spa",
      tag: "Med Spa & Aesthetics",
      title: "Consultation-to-Loyalty Pipeline",
      teaser: "Filters serious consultations from tire-kickers and nurtures clients long-term.",
      headline: "Med Spa & Aesthetics — Consultation-to-Loyalty Pipeline",
      subhead: "A pre-qualification and treatment pipeline that filters serious consultations from tire-kickers and keeps clients coming back long after treatment.",
      problem: "Every lead was treated the same regardless of budget or intent, and there was no system for post-treatment nurture or long-term membership follow-up.",
      solution: "Built New Lead → Pre-Qualification Review → Consultation Scheduled → Confirmation & Reminder → Treatment In Progress → Post-Care & Nurture → Long-Term Membership Follow-Up.",
      cardImage: "site-desktop.jpg",
      images: ["site-desktop.jpg", "site-content.jpg", "site-mobile.jpg", "process-map.jpg", "step-1.jpg", "step-2.jpg", "step-3.jpg", "step-4.jpg", "step-5.jpg", "step-6.jpg"],
      challenge: "No pre-qualification meant time spent on unqualified leads, and no system for post-treatment nurture.",
      solution_short: "A qualify-first pipeline with automated post-care nurture that turns one treatment into a member."
    }
  ];

  const imgPath = (slug, file) => `assets/img/case-studies/${slug}/${file}`;

  // Human-readable labels for each gallery image, keyed by filename — used for
  // alt text and captions so the site-preview shots and automation screenshots
  // both read clearly regardless of where they fall in the images array.
  const imageLabels = {
    "site-desktop.jpg": "Live site — desktop",
    "site-desktop-dark.jpg": "Live site — desktop, dark mode",
    "site-content.jpg": "Live site — page content",
    "site-mobile.jpg": "Live site — mobile",
    "site-mobile-dark.jpg": "Live site — mobile, dark mode",
    "process-map.jpg": "Automation process map"
  };
  function labelForImage(file) {
    if (imageLabels[file]) return imageLabels[file];
    const stepMatch = file.match(/^step-(\d+)\.jpg$/);
    if (stepMatch) return `Automation step ${stepMatch[1]}`;
    return file;
  }

  /* ============================================================
     Smaller automation builds — pulled from mikey.markets, mapped
     to the work-sample screenshots already in assets/img/work/.
     ============================================================ */
  const automations = [
    { file: "funnel-dental-clinic.webp", tag: "GHL Funnel", title: "Dental Clinic Booking Funnel", desc: "No-pressure consultation funnel with trust badges and automatic calendar booking." },
    { file: "funnel-fitness-coaching.webp", tag: "GHL Funnel", title: "Fitness Coaching Lead-Gen", desc: "7-Day Meal Plan opt-in funnel with automatic email delivery." },
    { file: "funnel-financial-coaching-v2.webp", tag: "GHL Funnel", title: "Financial Coaching Lead-Gen", desc: "18-page guide opt-in funnel built for MoneyReset Coaching." },
    { file: "ghl-lead-capturing.webp", tag: "GHL Workflow", title: "Lead Capturing Workflow", desc: "Form submissions flow into tagging, SMS sequences, calls, and contract delivery automatically." },
    { file: "ghl-customer-not-interested.webp", tag: "GHL Workflow", title: "Customer Not Interested Branch", desc: "Smart re-tagging on negative replies with a graceful, automatic opt-out SMS." },
    { file: "n8n-ai-appointment-setter.webp", tag: "n8n + VAPI", title: "AI Appointment Setter", desc: "Voice AI system for slot retrieval, booking, and cancellation, synced to calendar and Airtable." },
    { file: "n8n-job-scraping.webp", tag: "n8n", title: "Job Scraping & Resume Strategist", desc: "Slack-triggered agent that scrapes job boards and drafts tailored Gmail outreach." },
    { file: "n8n-ai-fb-agent.webp", tag: "n8n", title: "AI Facebook Agent", desc: "Webhook-driven agent that reads documents and posts structured responses automatically." },
    { file: "n8n-asmr-video.webp", tag: "n8n", title: "ASMR Video Creator", desc: "Scheduled pipeline: Gemini prompt to Google Vertex video generation to YouTube publish." },
    { file: "zapier-lead-enrichment.webp", tag: "Zapier", title: "Automated Lead Enrichment", desc: "Form submissions enriched via Apollo, scored, and routed to Sheets, Slack, and Gmail." },
    { file: "zapier-asana-crm.webp", tag: "Zapier", title: "Asana CRM Lead Engagement", desc: "A 30-step engagement engine covering every stage from Ready to Start to Paid and Closed." },
    { file: "zapier-video-transcription.webp", tag: "Zapier", title: "Video to Blog & Social Posts", desc: "Drive-triggered transcription that generates a blog post and Facebook/LinkedIn posts." },
    { file: "make-asana-xero-excel.webp", tag: "Make", title: "Asana to Xero to Sheets", desc: "Completed tasks automatically generate Xero invoices and roll up into Google Sheets." },
    { file: "make-gmail-gemini-drive.webp", tag: "Make", title: "Gmail Triage with Gemini", desc: "Incoming Gmail messages are read and classified by Gemini, then filed into the right Drive folder." }
  ];

  const automationsGrid = document.getElementById("automationsGrid");
  if (automationsGrid) {
    automationsGrid.innerHTML = automations.map(a => `
      <div class="auto-card reveal">
        <div class="auto-thumb"><img src="assets/img/work/${a.file}" alt="${a.title}" loading="lazy"></div>
        <div class="auto-body">
          <span class="case-tag">${a.tag}</span>
          <h3>${a.title}</h3>
          <p>${a.desc}</p>
        </div>
      </div>
    `).join("");
  }

  /* ============================================================
     Testimonials — real client quotes from mikey.markets
     ============================================================ */
  const testimonials = [
    { quote: "As a QuickBooks Online Certified ProAdvisor, he demonstrated exceptional proficiency in managing financial reports and cash flows.", name: "Fhey (Mariefe) Raya-Dohrenwendt", role: "Accountant / Executive Assistant", photo: "assets/img/testimonials/fhey-raya-dohrenwendt.jpg" },
    { quote: "He consistently sets clear expectations and goals for team members while providing necessary support and guidance to succeed.", name: "Khrizza Mae Briton", role: "Full-Cycle Bookkeeping · Process Optimization", photo: "assets/img/testimonials/khrizza-mae-briton.jpg" },
    { quote: "His dedication and expertise in bookkeeping and VA services make him an excellent choice for any organization seeking a skilled professional.", name: "Lloyd Angelo Castillejos, CPA", role: "Remote Bookkeeper · QBO/Xero Certified", photo: "assets/img/testimonials/lloyd-castillejos.jpg" }
  ];

  const testimonialsGrid = document.getElementById("testimonialsGrid");
  if (testimonialsGrid) {
    testimonialsGrid.innerHTML = testimonials.map(t => `
      <figure class="testimonial-card reveal">
        <svg class="quote-mark" width="30" height="24" viewBox="0 0 30 24" fill="none"><path d="M12.6 0C6.6 3.2 3.4 8 3.4 13.6c0 5.2 3 8.8 7.4 9.8l1.6-3.4c-2.8-.8-4.4-2.6-4.4-5.4 0-.6.2-1 .4-1.4h4.2V0h-.02zm16.6 0c-6 3.2-9.2 8-9.2 13.6 0 5.2 3 8.8 7.4 9.8l1.6-3.4c-2.8-.8-4.4-2.6-4.4-5.4 0-.6.2-1 .4-1.4h4.2V0h-.02z" fill="#E2753D"/></svg>
        <blockquote>${t.quote}</blockquote>
        <figcaption>
          <img class="testimonial-avatar" src="${t.photo}" alt="${t.name}" loading="lazy">
          <span class="testimonial-figcaption-text"><strong>${t.name}</strong><span>${t.role}</span></span>
        </figcaption>
      </figure>
    `).join("");
  }

  /* ============================================================
     Video reviews — client video testimonials, lazy-loaded and
     autoplayed (muted) once each card scrolls into view.
     ============================================================ */
  const videoReviews = [
    { file: "vatrice-chestnut.mp4", name: "Vatrice Chestnut", role: "CEO, 10x Consulting & 10x Navigator · Washington, DC" }
  ];

  const VIDEO_REVIEW_DEFAULT_VOLUME = 0.25; // low starting volume once a visitor unmutes

  const videoReviewGrid = document.getElementById("videoReviewGrid");
  if (videoReviewGrid) {
    videoReviewGrid.innerHTML = videoReviews.map((v, i) => `
      <div class="video-review-card reveal" id="videoReview${i}">
        <video muted playsinline preload="none" data-src="assets/video/reviews/${v.file}" aria-label="Video review from ${v.name}"></video>
        <button class="video-review-mute" type="button" aria-pressed="false" aria-label="Unmute video review from ${v.name}">
          <svg class="icon-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>
          <svg class="icon-unmuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>
        </button>
        <div class="video-review-volume-wrap">
          <input type="range" class="video-review-volume" min="0" max="1" step="0.05" value="${VIDEO_REVIEW_DEFAULT_VOLUME}" aria-label="Volume for video review from ${v.name}">
        </div>
        <div class="video-review-caption">
          <strong>${v.name}</strong>
          <span>${v.role}</span>
        </div>
        <div class="video-review-controls">
          <button class="video-review-playpause" type="button" aria-pressed="true" aria-label="Pause video review from ${v.name}">
            <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
            <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <span class="video-review-time" data-role="current">0:00</span>
          <input type="range" class="video-review-seek" min="0" max="0" step="0.1" value="0" aria-label="Seek video review from ${v.name}">
          <span class="video-review-time" data-role="duration">0:00</span>
        </div>
      </div>
    `).join("");

    const videoCards = videoReviewGrid.querySelectorAll(".video-review-card");

    function reviewName(card) {
      return videoReviews[[...videoCards].indexOf(card)].name;
    }

    function setUnmutedState(card, vid, isUnmuted) {
      const btn = card.querySelector(".video-review-mute");
      vid.muted = !isUnmuted;
      card.classList.toggle("is-unmuted", isUnmuted);
      btn.setAttribute("aria-pressed", String(isUnmuted));
      btn.setAttribute("aria-label", `${isUnmuted ? "Mute" : "Unmute"} video review from ${reviewName(card)}`);
    }

    // Keeps the play/pause button in sync no matter what paused the video —
    // a manual click, scrolling off-screen, or simply reaching the end.
    function syncPlayButton(card, vid) {
      const btn = card.querySelector(".video-review-playpause");
      const isPlaying = !vid.paused && !vid.ended;
      card.classList.toggle("is-playing", isPlaying);
      btn.setAttribute("aria-pressed", String(isPlaying));
      btn.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} video review from ${reviewName(card)}`);
    }

    function toggleUserPlayback(vid) {
      if (vid.paused) {
        vid.dataset.userPaused = "";
        if (vid.ended) vid.currentTime = 0; // clicking play after it finishes replays from the start
        vid.play().catch(() => {});
      } else {
        vid.dataset.userPaused = "true";
        vid.pause();
      }
    }

    function formatTime(seconds) {
      if (!isFinite(seconds) || seconds < 0) return "0:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${String(s).padStart(2, "0")}`;
    }

    // Fills the seek bar's track up to the current position — native
    // range inputs don't show progress on their own, so this paints it
    // with a background gradient split at the current percentage.
    function paintSeekFill(seek, pct) {
      seek.style.background = `linear-gradient(to right, #fff ${pct}%, rgba(255,255,255,0.3) ${pct}%)`;
    }

    videoCards.forEach(card => {
      const vid = card.querySelector("video");
      if (!vid) return;
      const seek = card.querySelector(".video-review-seek");
      const currentTimeEl = card.querySelector('[data-role="current"]');
      const durationEl = card.querySelector('[data-role="duration"]');

      vid.volume = VIDEO_REVIEW_DEFAULT_VOLUME;
      vid.addEventListener("play", () => syncPlayButton(card, vid));
      vid.addEventListener("pause", () => syncPlayButton(card, vid));
      vid.addEventListener("ended", () => syncPlayButton(card, vid)); // no loop: it just stops here
      vid.addEventListener("click", () => toggleUserPlayback(vid));

      vid.addEventListener("loadedmetadata", () => {
        seek.max = vid.duration;
        durationEl.textContent = formatTime(vid.duration);
      });
      vid.addEventListener("timeupdate", () => {
        if (vid.dataset.scrubbing) return; // don't fight the user's drag
        seek.value = vid.currentTime;
        currentTimeEl.textContent = formatTime(vid.currentTime);
        paintSeekFill(seek, vid.duration ? (vid.currentTime / vid.duration) * 100 : 0);
      });

      seek.addEventListener("pointerdown", () => { vid.dataset.scrubbing = "true"; });
      seek.addEventListener("pointerup", () => { vid.dataset.scrubbing = ""; });
      seek.addEventListener("input", () => {
        const value = Number(seek.value);
        vid.currentTime = value;
        currentTimeEl.textContent = formatTime(value);
        paintSeekFill(seek, vid.duration ? (value / vid.duration) * 100 : 0);
      });
    });

    // Lazy-load: the real video src loads only once a card nears the
    // viewport, so off-screen reviews never cost bandwidth up front.
    // Once a visitor has manually paused a video (or it's played through
    // to the end), scrolling it back into view should not force it to
    // resume — only the very first entrance autoplays.
    if ("IntersectionObserver" in window) {
      const videoIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const vid = entry.target.querySelector("video");
          if (!vid) return;
          if (entry.isIntersecting) {
            const isFirstEntrance = !vid.src;
            if (isFirstEntrance) vid.src = vid.dataset.src;
            if ((isFirstEntrance || !vid.dataset.userPaused) && !vid.ended) {
              vid.play().catch(() => {}); // autoplay can still be blocked by browser policy; fails silently
            }
          } else if (!vid.paused) {
            vid.pause(); // an automatic pause, not a user one — resumes on scroll back in
          }
        });
      }, { threshold: 0.5 });
      videoCards.forEach(card => videoIO.observe(card));
    } else {
      videoCards.forEach(card => {
        const vid = card.querySelector("video");
        if (vid) { vid.src = vid.dataset.src; vid.play().catch(() => {}); }
      });
    }

    videoReviewGrid.addEventListener("click", (e) => {
      const playBtn = e.target.closest(".video-review-playpause");
      if (playBtn) {
        const card = playBtn.closest(".video-review-card");
        toggleUserPlayback(card.querySelector("video"));
        return;
      }

      const muteBtn = e.target.closest(".video-review-mute");
      if (muteBtn) {
        const card = muteBtn.closest(".video-review-card");
        const vid = card.querySelector("video");
        const slider = card.querySelector(".video-review-volume");
        const willUnmute = vid.muted;
        if (willUnmute && vid.volume === 0) vid.volume = VIDEO_REVIEW_DEFAULT_VOLUME;
        if (slider) slider.value = vid.volume;
        setUnmutedState(card, vid, willUnmute);
      }
    });

    videoReviewGrid.addEventListener("input", (e) => {
      const slider = e.target.closest(".video-review-volume");
      if (!slider) return;
      const card = slider.closest(".video-review-card");
      const vid = card.querySelector("video");
      const value = Number(slider.value);
      vid.volume = value;
      setUnmutedState(card, vid, value > 0);
    });
  }

  /* ============================================================
     Render: Case study cards
     ============================================================ */
  const caseGrid = document.getElementById("caseGrid");
  if (caseGrid) {
    caseGrid.innerHTML = caseStudies.map(cs => `
      <button class="case-card reveal" type="button" data-case="${cs.slug}" aria-haspopup="dialog">
        <div class="case-thumb">
          <img src="${imgPath(cs.slug, cs.cardImage)}" alt="${cs.tag} website preview" loading="lazy">
        </div>
        <div class="case-body">
          <span class="case-tag">${cs.tag}</span>
          <h3>${cs.title}</h3>
          <p>${cs.teaser}</p>
          <span class="case-link">View Case Study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </button>
    `).join("") + `
      <a href="#book-final" class="case-card case-cta-card reveal">
        <div class="case-cta-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <h3>Got a project like these?</h3>
        <p>Let's map your process and see what could run on its own.</p>
        <span class="case-link">Book a Discovery Call
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </a>
    `;
  }

  /* ============================================================
     Render: Results (Challenge / Solution)
     ============================================================ */
  const resultsGrid = document.getElementById("resultsGrid");
  if (resultsGrid) {
    resultsGrid.innerHTML = caseStudies.slice(0, 3).map(cs => `
      <div class="result-card reveal">
        <span class="case-tag">${cs.tag}</span>
        <div class="result-block">
          <p class="result-label challenge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
            Challenge
          </p>
          <p>${cs.challenge}</p>
        </div>
        <div class="result-block">
          <p class="result-label solution">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
            Solution
          </p>
          <p>${cs.solution_short}</p>
        </div>
        <p class="metric-placeholder">Real performance metric goes here once tracked (e.g. response time, no-show rate, repeat-booking rate).</p>
      </div>
    `).join("");
  }

  /* ============================================================
     Case study modal
     ============================================================ */
  const caseModal = document.getElementById("caseModal");
  const caseModalTag = document.getElementById("caseModalTag");
  const caseModalTitle = document.getElementById("caseModalTitle");
  const caseModalSubhead = document.getElementById("caseModalSubhead");
  const caseModalProblem = document.getElementById("caseModalProblem");
  const caseModalSolution = document.getElementById("caseModalSolution");
  const caseModalMainImg = document.getElementById("caseModalMainImg");
  const caseModalThumbs = document.getElementById("caseModalThumbs");
  const caseModalClose = document.getElementById("caseModalClose");
  const caseModalPrev = document.getElementById("caseModalPrev");
  const caseModalNext = document.getElementById("caseModalNext");

  let lastFocused = null;
  let activeCase = null;
  let activeImageIndex = 0;
  let openModalCount = 0;

  // Elements that sit behind every modal — hidden from keyboard/screen-reader
  // navigation while a modal is open, so Tab can't escape into the page body.
  const backgroundLandmarks = () => [
    document.querySelector(".site-header"),
    document.querySelector("main"),
    document.querySelector(".site-footer"),
    document.getElementById("floatingTab"),
    document.getElementById("backToTop")
  ].filter(Boolean);

  function setBackgroundInert(isInert) {
    backgroundLandmarks().forEach(el => {
      if (isInert) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null || el === document.activeElement);
  }

  function trapFocus(e, overlay) {
    if (e.key !== "Tab") return;
    const box = overlay.querySelector(".modal-box");
    const focusable = getFocusable(box);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openModal(overlay) {
    lastFocused = document.activeElement;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    openModalCount++;
    setBackgroundInert(true);
    const closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  // Focus-trap listener registered once per modal (not re-added on every open).
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("keydown", (e) => {
      if (overlay.classList.contains("open")) trapFocus(e, overlay);
    });
  });

  function closeModal(overlay) {
    overlay.classList.remove("open");
    openModalCount = Math.max(0, openModalCount - 1);
    if (openModalCount === 0) {
      document.body.style.overflow = "";
      setBackgroundInert(false);
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function showCaseImage(index) {
    if (!activeCase) return;
    const total = activeCase.images.length;
    activeImageIndex = (index + total) % total; // wrap around both directions

    const img = activeCase.images[activeImageIndex];
    caseModalMainImg.src = imgPath(activeCase.slug, img);
    caseModalMainImg.alt = `${activeCase.tag} — ${labelForImage(img)} (image ${activeImageIndex + 1} of ${total})`;

    caseModalThumbs.querySelectorAll("img").forEach((t, i) => {
      t.classList.toggle("active", i === activeImageIndex);
    });

    const multiple = total > 1;
    caseModalPrev.hidden = !multiple;
    caseModalNext.hidden = !multiple;
  }

  function openCaseStudy(slug) {
    const cs = caseStudies.find(c => c.slug === slug);
    if (!cs) return;
    activeCase = cs;

    caseModalTag.textContent = cs.tag;
    caseModalTitle.textContent = cs.headline;
    caseModalSubhead.textContent = cs.subhead;
    caseModalProblem.textContent = cs.problem;
    caseModalSolution.textContent = cs.solution;

    caseModalThumbs.innerHTML = cs.images.map((img) => `
      <img src="${imgPath(cs.slug, img)}" alt="${cs.tag} — ${labelForImage(img)}" data-src="${imgPath(cs.slug, img)}">
    `).join("");

    caseModalThumbs.querySelectorAll("img").forEach((thumb, i) => {
      thumb.addEventListener("click", () => showCaseImage(i));
    });

    showCaseImage(0);
    openModal(caseModal);
  }

  if (caseModalNext) caseModalNext.addEventListener("click", () => showCaseImage(activeImageIndex + 1));
  if (caseModalPrev) caseModalPrev.addEventListener("click", () => showCaseImage(activeImageIndex - 1));

  if (caseGrid) {
    caseGrid.addEventListener("click", (e) => {
      const card = e.target.closest("[data-case]");
      if (card) openCaseStudy(card.dataset.case);
    });
  }

  if (caseModalClose) caseModalClose.addEventListener("click", () => closeModal(caseModal));
  if (caseModal) {
    caseModal.addEventListener("click", (e) => {
      if (e.target === caseModal) closeModal(caseModal);
    });
  }

  /* ============================================================
     Process map gallery modal
     ============================================================ */
  const galleryModal = document.getElementById("galleryModal");
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryModalClose = document.getElementById("galleryModalClose");
  const openProcessGallery = document.getElementById("openProcessGallery");

  if (galleryGrid) {
    galleryGrid.innerHTML = caseStudies.map(cs => `
      <button class="gallery-grid-item" type="button" data-case="${cs.slug}">
        <img src="${imgPath(cs.slug, "process-map.jpg")}" alt="Process map — ${cs.tag}" loading="lazy">
        <span>${cs.tag}</span>
      </button>
    `).join("");

    galleryGrid.addEventListener("click", (e) => {
      const item = e.target.closest("[data-case]");
      if (!item) return;
      closeModal(galleryModal);
      openCaseStudy(item.dataset.case);
    });
  }

  if (openProcessGallery) openProcessGallery.addEventListener("click", () => openModal(galleryModal));
  if (galleryModalClose) galleryModalClose.addEventListener("click", () => closeModal(galleryModal));
  if (galleryModal) {
    galleryModal.addEventListener("click", (e) => {
      if (e.target === galleryModal) closeModal(galleryModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (caseModal.classList.contains("open")) closeModal(caseModal);
      if (galleryModal.classList.contains("open")) closeModal(galleryModal);
      return;
    }
    if (!caseModal.classList.contains("open")) return;
    if (e.key === "ArrowRight") showCaseImage(activeImageIndex + 1);
    if (e.key === "ArrowLeft") showCaseImage(activeImageIndex - 1);
  });

  /* ============================================================
     Tools marquee
     ============================================================ */
  const tools = ["GoHighLevel", "n8n", "Zapier", "Make", "Claude", "OpenAI", "QuickBooks Online", "Xero", "Airtable", "Asana", "Stripe", "VAPI", "Google Workspace", "Slack"];
  const marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    const chip = (name) => `<span class="tool-chip"><span class="dot"></span>${name}</span>`;
    marqueeTrack.innerHTML = tools.map(chip).join("") + tools.map(chip).join("");
  }

  /* ============================================================
     Mobile nav toggle
     ============================================================ */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ============================================================
     ROI calculator
     ============================================================ */
  const roiLeads = document.getElementById("roiLeads");
  const roiValue = document.getElementById("roiValue");
  const roiSlow = document.getElementById("roiSlow");
  const roiFast = document.getElementById("roiFast");
  const roiLeadsOut = document.getElementById("roiLeadsOut");
  const roiSlowOut = document.getElementById("roiSlowOut");
  const roiFastOut = document.getElementById("roiFastOut");
  const roiDeals = document.getElementById("roiDeals");
  const roiRevenue = document.getElementById("roiRevenue");
  const roiYear = document.getElementById("roiYear");

  function formatCurrency(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function calcRoi() {
    if (!roiLeads) return;
    const leads = Number(roiLeads.value);
    const value = Number(roiValue.value) || 0;
    let slow = Number(roiSlow.value);
    let fast = Number(roiFast.value);

    // Keep the "fast" rate meaningfully at or above the "slow" rate for a sane estimate.
    if (fast < slow) fast = slow;

    const extraDeals = leads * ((fast - slow) / 100);
    const extraRevenue = extraDeals * value;

    roiLeadsOut.textContent = leads;
    roiSlowOut.textContent = slow + "%";
    roiFastOut.textContent = fast + "%";
    roiDeals.textContent = `+${extraDeals.toFixed(1)} deals`;
    roiRevenue.textContent = `+${formatCurrency(extraRevenue)}`;
    roiYear.textContent = formatCurrency(extraRevenue * 12);
  }

  [roiLeads, roiValue, roiSlow, roiFast].forEach(el => {
    if (el) el.addEventListener("input", calcRoi);
  });
  calcRoi();

  /* ============================================================
     Contact form (local-only success state — wire up a real
     endpoint before going live)
     ============================================================ */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const CONTACT_EMAIL = "contact.mikey.markets@gmail.com";
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;

      const name = document.getElementById("cf-name").value;
      const email = document.getElementById("cf-email").value;
      const message = document.getElementById("cf-message").value;
      const marketingOptIn = document.getElementById("cf-marketing").checked;

      // TODO: swap this mailto fallback for a real backend (Formspree / GHL webhook) when ready.
      // Consent state is included below so there's a record of what the visitor agreed to.
      const subject = encodeURIComponent(`New message from ${name} via mikey.markets`);
      const body = encodeURIComponent(
        `${message}\n\n— ${name} (${email})\n\n` +
        `[Consent] Privacy policy: agreed. Marketing emails: ${marketingOptIn ? "opted in" : "not opted in"}.`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      formSuccess.classList.add("show");
      contactForm.reset();
    });
  }

  /* ============================================================
     Loom "coming soon" video placeholder
     ============================================================ */
  const playLoom = document.getElementById("playLoom");
  if (playLoom) {
    playLoom.addEventListener("click", () => {
      const badge = playLoom.querySelector(".coming-soon-badge");
      if (!badge) return;
      const original = badge.textContent;
      badge.textContent = "Recording in progress — check back soon";
      setTimeout(() => { badge.textContent = original; }, 2600);
    });
  }

  /* ============================================================
     Floating "Got a Question?" tab
     ============================================================ */
  const floatingTab = document.getElementById("floatingTab");
  if (floatingTab) {
    floatingTab.addEventListener("click", () => {
      const target = document.getElementById("contact-form");
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const nameField = document.getElementById("cf-name");
      if (nameField) setTimeout(() => nameField.focus(), 500);
    });
  }

  /* ============================================================
     Lazy-load the GHL booking widgets
     The iframe src (and GoHighLevel's helper script) only load once
     a visitor actually scrolls near a calendar — not on every page
     view — which limits third-party code execution to people who
     need it and keeps first-load performance lighter.
     ============================================================ */
  let ghlScriptLoaded = false;
  function loadGhlEmbedScriptOnce() {
    if (ghlScriptLoaded) return;
    ghlScriptLoaded = true;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    document.body.appendChild(s);
  }

  const lazyIframes = document.querySelectorAll(".calendar-embed iframe[data-src]");
  if (lazyIframes.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          loadGhlEmbedScriptOnce();
          entry.target.src = entry.target.dataset.src;
          io.unobserve(entry.target);
        });
      }, { rootMargin: "300px" });
      lazyIframes.forEach(f => io.observe(f));
    } else {
      // Fallback for browsers without IntersectionObserver support.
      loadGhlEmbedScriptOnce();
      lazyIframes.forEach(f => { f.src = f.dataset.src; });
    }
  }

  /* ============================================================
     Cookie consent
     - "Necessary" cookies (the embedded GHL calendar, Google Fonts
       requests) load unconditionally — there's no way to make a
       third-party iframe conditional, and fonts have no cookie.
     - "Analytics" is OFF by default. Nothing analytics-related is
       loaded on this site today. loadAnalyticsIfConsented() below
       is a ready-made gate: drop your GA4 / Meta Pixel snippet
       inside it, and it will only ever run after explicit opt-in.
     ============================================================ */
  const CONSENT_KEY = "mm_cookie_consent";

  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    } catch {
      return null;
    }
  }

  function setConsent(analytics) {
    const record = { necessary: true, analytics, decidedAt: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(record)); } catch {}
    return record;
  }

  // TODO: when you actually add Google Analytics / Meta Pixel / etc.,
  // load the script tag(s) inside this function — never at the top
  // of the page — so they only run after the visitor opts in.
  function loadAnalyticsIfConsented() {
    const consent = getConsent();
    if (!consent || !consent.analytics) return;
    // Example (uncomment and fill in when ready):
    // const ga = document.createElement("script");
    // ga.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
    // ga.async = true;
    // document.head.appendChild(ga);
  }

  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAcceptAll = document.getElementById("cookieAcceptAll");
  const cookieNecessaryOnly = document.getElementById("cookieNecessaryOnly");

  function showCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    document.body.classList.add("cookie-banner-open");
  }

  function hideCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.hidden = true;
    document.body.classList.remove("cookie-banner-open");
  }

  const existingConsent = getConsent();
  if (!existingConsent) {
    showCookieBanner();
  } else {
    loadAnalyticsIfConsented();
  }

  if (cookieAcceptAll) {
    cookieAcceptAll.addEventListener("click", () => {
      setConsent(true);
      hideCookieBanner();
      loadAnalyticsIfConsented();
    });
  }
  if (cookieNecessaryOnly) {
    cookieNecessaryOnly.addEventListener("click", () => {
      setConsent(false);
      hideCookieBanner();
    });
  }

  /* ============================================================
     Back to top
     ============================================================ */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle("show", window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     Scroll reveal
     ============================================================ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ============================================================
     Footer year
     ============================================================ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const legalDateEl = document.getElementById("legalDate");
  if (legalDateEl) {
    legalDateEl.textContent = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

})();
