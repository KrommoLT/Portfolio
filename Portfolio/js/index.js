// Carousel module: shared logic for continuous scrolling carousels
function setupCarousel({ wrapper, track, speed = 0.3, pauseOnHover = false, pauseEvent = "click", cloneCount = 1, minTrackWidthMultiplier = 2 }) {
  if (!wrapper || !track) return;

  const items = Array.from(track.children);

  // initial estimate of track width (may be 0 until layout completes)
  const initialTrackWidth = track.scrollWidth || items.reduce((w, el) => w + el.offsetWidth, 0);

  // determine how many times to repeat the items so track is wider than wrapper
  let repeat = cloneCount;
  if (minTrackWidthMultiplier > 1 && initialTrackWidth > 0) {
    repeat = Math.max(cloneCount, Math.ceil((wrapper.clientWidth * minTrackWidthMultiplier) / initialTrackWidth));
  }

  for (let i = 0; i < repeat; i++) {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  // recompute loop point after cloning
  const loopPoint = track.scrollWidth / 2;

  let paused = false;

  if (pauseOnHover) {
    wrapper.addEventListener("mouseenter", () => (paused = true));
    wrapper.addEventListener("mouseleave", () => (paused = false));
  } else {
    wrapper.addEventListener(pauseEvent, (event) => {
      if (pauseEvent === "click" && event.target.closest(".project-card")) return;
      paused = !paused;
    });
  }

  function scrollFrame() {
    if (!paused) {
      wrapper.scrollLeft += speed;
      if (wrapper.scrollLeft >= loopPoint) wrapper.scrollLeft -= loopPoint;
    }
    requestAnimationFrame(scrollFrame);
  }

  scrollFrame();
}

// Initialize technologies carousel (pause on hover)
const techWrapper = document.querySelector(".technologies");
const techTrack = document.querySelector(".tech-track");
setupCarousel({
  wrapper: techWrapper,
  track: techTrack,
  speed: 0.3,
  pauseOnHover: true,
  cloneCount: 2,
  minTrackWidthMultiplier: 2,
});

// Initialize projects carousel (pause on hover)
const projectsWrapper = document.querySelector(".projects-wrapper");
const projectsTrack = document.querySelector(".projects-track");
setupCarousel({
  wrapper: projectsWrapper,
  track: projectsTrack,
  speed: 0.3,
  pauseOnHover: true,
  cloneCount: 1,
  minTrackWidthMultiplier: 1,
});
