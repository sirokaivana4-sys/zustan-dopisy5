document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const enableBtn = document.getElementById("enable-audio-btn");
  const yearSpan = document.getElementById("year");

  // Rok ve footeru
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Tlačítko na začátku schováme, zobrazí se jen když je potřeba
  if (enableBtn) {
    enableBtn.style.display = "none";
  }

  // Zkusit automaticky spustit hudbu (desktop většinou dovolí, mobil většinou ne)
  function tryAutoPlay() {
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay povolen – tlačítko nepotřebujeme
          if (enableBtn) enableBtn.style.display = "none";
        })
        .catch(() => {
          // Autoplay bloknutý – ukážeme tlačítko
          if (enableBtn) enableBtn.style.display = "inline-flex";
        });
    }
  }

  tryAutoPlay();

  // Pokud web potřebuje „dotyk“ uživatele, tlačítko hudbu pustí
  if (enableBtn && audio) {
    enableBtn.addEventListener("click", () => {
      audio.play();
      enableBtn.style.display = "none";
    });
  }

  // Plynulé scrollování na sekce
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Animace při scrollu
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
});
