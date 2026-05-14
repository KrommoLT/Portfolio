/*-----technologies section----- */
const techWrapper = document.querySelector(".technologies");
const techTrack = document.querySelector(".tech-track");

if (techWrapper && techTrack) {
  const originalLogos = Array.from(techTrack.children);
  originalLogos.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    techTrack.appendChild(clone);
  });

  let paused = false;
  const speed = 0.3;

  techWrapper.addEventListener("click", () => {
    paused = !paused;
  });

  function autoScroll() {
    if (!paused) {
      techWrapper.scrollLeft += speed;
      const loopPoint = techTrack.scrollWidth / 2;
      if (techWrapper.scrollLeft >= loopPoint) {
        techWrapper.scrollLeft -= loopPoint;
      }
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
}

/* -----my work section----- */
const projectsWrapper = document.querySelector(".projects-wrapper");
const projectsTrack = document.querySelector(".projects-track");

if (projectsWrapper && projectsTrack) {
  const originalCards = Array.from(projectsTrack.children);

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    projectsTrack.appendChild(clone);
  });

  let isPaused = false;
  const scrollSpeed = 0.008;

  projectsWrapper.addEventListener("click", (event) => {
    if (event.target.closest(".project-card")) {
      return;
    }

    isPaused = !isPaused;
  });

  function autoScroll() {
    if (!isPaused) {
      projectsWrapper.scrollLeft += scrollSpeed;

      const loopPoint = projectsTrack.scrollWidth / 2;

      if (projectsWrapper.scrollLeft >= loopPoint) {
        projectsWrapper.scrollLeft -= loopPoint;
      }
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
}
