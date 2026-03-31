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
  const scrollSpeed = 0.6;

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
