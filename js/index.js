const projectsWrapper = document.querySelector(".projects-wrapper");
const projectsTrack = document.querySelector(".projects-track");
const techWrapper = document.querySelector(".technologies");
const techTrack = techWrapper ? (techWrapper.querySelector(".tech-track") || techWrapper.querySelector("ul")) : null;

function setupLoopingCarousel(wrapper, track, speed = 0.4, cloneMultiplier = 2, pauseOnHover = true) {
  if (!wrapper || !track) return;

  const items = Array.from(track.children);
  if (items.length === 0) return;

  // Ensure the track is styled as a flexible horizontal strip.
  track.style.display = track.style.display || "flex";
  track.style.width = track.style.width || "max-content";

  // Duplicate the items so the track can loop continuously.
  const targetWidth = wrapper.clientWidth * cloneMultiplier;
  let clonePasses = 0;
  while (track.scrollWidth < targetWidth && clonePasses < 8) {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    clonePasses += 1;
  }

  if (track.scrollWidth <= wrapper.clientWidth && clonePasses < 12) {
    while (track.scrollWidth <= wrapper.clientWidth && clonePasses < 12) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
      clonePasses += 1;
    }
  }

  console.debug("[carousel] setup", {
    wrapperClass: wrapper.className,
    trackClass: track.className,
    wrapperClientWidth: wrapper.clientWidth,
    trackScrollWidth: track.scrollWidth,
    clonePasses,
    pauseOnHover,
  });

  const loopPoint = track.scrollWidth / 2;
  let paused = false;

  if (pauseOnHover) {
    wrapper.addEventListener("mouseenter", () => {
      paused = true;
    });
    wrapper.addEventListener("mouseleave", () => {
      paused = false;
    });
  }

  function step() {
    if (!paused) {
      wrapper.scrollLeft += speed;
      if (wrapper.scrollLeft >= loopPoint) {
        wrapper.scrollLeft -= loopPoint;
      }
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

window.addEventListener("load", () => {
  if (!projectsWrapper || !projectsTrack) {
    console.warn("[carousel] projects carousel missing wrapper or track", { projectsWrapper, projectsTrack });
  }
  if (!techWrapper || !techTrack) {
    console.warn("[carousel] technologies carousel missing wrapper or track", { techWrapper, techTrack });
  }
  setupLoopingCarousel(projectsWrapper, projectsTrack, 0.5, 2, true);
  setupLoopingCarousel(techWrapper, techTrack, 0.3, 2, true);
});