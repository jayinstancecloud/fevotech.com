document.addEventListener("DOMContentLoaded", () => {
  const navItems = Array.from(document.querySelectorAll(".main-nav .nav-item"));

  if (!navItems.length) return;

  const closeAll = () => {
    navItems.forEach((item) => item.classList.remove("open"));
  };

  navItems.forEach((item) => {
    const trigger = item.querySelector(":scope > a");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      const isOpen = item.classList.contains("open");

      if (!isOpen) {
        event.preventDefault();
        closeAll();
        item.classList.add("open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = event.target.closest(".main-nav");
    if (!clickedInsideMenu) closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
});
