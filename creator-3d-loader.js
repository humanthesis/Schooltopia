(function () {
  const hero = document.getElementById("creatorHero");
  const retryButton = document.getElementById("retryCreator3d");
  if (!hero) return;

  let attempt = 0;
  let ready = false;
  let loadTimeout = 0;

  function markReady() {
    ready = true;
    window.clearTimeout(loadTimeout);
    hero.classList.add("scene-ready");
    hero.classList.remove("scene-failed");
    retryButton?.classList.add("hidden");
  }

  function markFailed() {
    if (ready) return;
    window.clearTimeout(loadTimeout);
    hero.classList.add("scene-failed");
    retryButton?.classList.remove("hidden");
  }

  function loadBundle() {
    attempt += 1;
    ready = false;
    hero.classList.remove("scene-failed");
    retryButton?.classList.add("hidden");
    const script = document.createElement("script");
    script.src = `creator-3d.bundle.js?v=20260628-2${attempt > 1 ? `&retry=${attempt}` : ""}`;
    script.async = true;
    script.addEventListener("error", () => {
      script.remove();
      if (attempt < 3) window.setTimeout(loadBundle, 450 * attempt);
      else markFailed();
    });
    script.addEventListener("load", () => {
      loadTimeout = window.setTimeout(markFailed, 2600);
    });
    document.head.append(script);
  }

  window.addEventListener("creator-3d-ready", markReady);
  window.addEventListener("creator-3d-failed", markFailed);
  retryButton?.addEventListener("click", () => {
    attempt = 0;
    loadBundle();
  });

  loadBundle();
})();
