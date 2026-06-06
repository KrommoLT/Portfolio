const projectsWrapper = document.querySelector(".projects-wrapper");
const projectsTrack = document.querySelector(".projects-track");
const techWrapper = document.querySelector(".technologies");
const techTrack = techWrapper ? (techWrapper.querySelector(".tech-track") || techWrapper.querySelector("ul")) : null;

/*
 * Sets up a looping carousel effect for a given wrapper and track.
 * @param {HTMLElement} wrapper - The container element for the carousel.
 * @param {HTMLElement} track - The track element containing the carousel items.
 * @param {number} speed - The speed of the carousel animation.
 * @param {number} cloneMultiplier - The multiplier for cloning items.
 * @param {boolean} pauseOnHover - Whether to pause the carousel on hover.
 */
function setupLoopingCarousel(wrapper, track, speed = 0.6, cloneMultiplier = 2, pauseOnHover = true) {
  if (!wrapper || !track) return;

  const items = Array.from(track.children);
  if (items.length === 0) return;

  wrapper.style.overflowX = wrapper.style.overflowX || "auto";
  wrapper.style.scrollBehavior = wrapper.style.scrollBehavior || "auto";
  track.style.display = track.style.display || "flex";
  track.style.width = track.style.width || "max-content";

  const originalScrollWidth = track.scrollWidth;
  const targetWidth = Math.max(wrapper.clientWidth + originalScrollWidth, originalScrollWidth * 2);
  let clonePasses = 0;
  while (track.scrollWidth < targetWidth && clonePasses < 12) {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    clonePasses += 1;
  }

  if (track.scrollWidth <= wrapper.clientWidth) {
    console.warn("[carousel] track width is not greater than wrapper width", {
      wrapperClientWidth: wrapper.clientWidth,
      trackScrollWidth: track.scrollWidth,
      clonePasses,
    });
    return;
  }

  wrapper.scrollLeft = 0;
  const loopPoint = originalScrollWidth;
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
  setupLoopingCarousel(techWrapper, techTrack, 1.2, 2, true);
});