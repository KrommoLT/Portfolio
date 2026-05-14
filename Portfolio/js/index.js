function setupCarousel({ wrapper, track, speed = 0.3, pauseEvent = "click", cloneCount = 1, minTrackWidthMultiplier = 2 }) {
  if (!wrapper || !track) return;

  const items = Array.from(track.children);
  const originalTrackWidth = track.scrollWidth;

  let repeat = cloneCount;
  if (minTrackWidthMultiplier > 1 && originalTrackWidth > 0) {
    repeat = Math.max(cloneCount, Math.ceil((wrapper.clientWidth * minTrackWidthMultiplier) / originalTrackWidth));
  }

  for (let i = 0; i < repeat; i++) {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  let paused = false;
  wrapper.addEventListener(pauseEvent, (event) => {
    if (event.type === "click" && event.target.closest(".project-card")) {
      return;
    }
    paused = !paused;
  });

  function scrollFrame() {
    if (!paused) {
      wrapper.scrollLeft += speed;
      if (wrapper.scrollLeft >= originalTrackWidth) {
        wrapper.scrollLeft -= originalTrackWidth;
      }
    }
    requestAnimationFrame(scrollFrame);
  }

  scrollFrame();
}

const techWrapper = document.querySelector(".technologies");
const techTrack = document.querySelector(".tech-track");
setupCarousel({
  wrapper: techWrapper,
  track: techTrack,
  speed: 0.3,
  pauseEvent: "click",
  cloneCount: 2,
  minTrackWidthMultiplier: 2,
});

const projectsWrapper = document.querySelector(".projects-wrapper");
const projectsTrack = document.querySelector(".projects-track");
setupCarousel({
  wrapper: projectsWrapper,
  track: projectsTrack,
  speed: 0.3,
  pauseEvent: "click",
  cloneCount: 1,
  minTrackWidthMultiplier: 1,
});
