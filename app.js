document.documentElement.classList.add("js");

const menu = document.querySelector(".menu");
const globalNav = document.getElementById(menu.getAttribute("aria-controls"));
const setMenu = (expanded) => menu.setAttribute("aria-expanded", String(expanded));
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
globalNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header-inner")) setMenu(false);
});

for (const demo of document.querySelectorAll("[data-tabs]")) {
  const tabs = [...demo.querySelectorAll('[role="tab"]')];
  const selectTab = (selected, moveFocus = false) => {
    for (const tab of tabs) {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
    }
    if (moveFocus) selected.focus();
  };
  selectTab(tabs[0]);
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      const next = {
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next], true);
    });
  }
}

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const text = document.getElementById(button.dataset.copy);
    const status = button.parentElement.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText(text.textContent);
      status.textContent = "已复制";
      return;
    } catch {
      // File previews or restricted browser sessions can fall back to selection.
    }
    const selected = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(text);
    selected.removeAllRanges();
    selected.addRange(range);
    try {
      if (document.execCommand("copy")) {
        selected.removeAllRanges();
        status.textContent = "已复制";
        return;
      }
    } catch {
      // Leave the selected text available for manual copying.
    }
    text.parentElement.focus({ preventScroll: true });
    status.textContent = "已选中文本，请按 Ctrl+C 或 ⌘C 复制";
  });
}

const tocLinks = [...document.querySelectorAll(".case-toc a")];
if (tocLinks.length) {
  const chapters = tocLinks.map((link) => document.getElementById(link.hash.slice(1)));
  const updateToc = () => {
    const current = chapters.findLastIndex((chapter) => chapter.getBoundingClientRect().top <= 130);
    for (const [index, link] of tocLinks.entries()) {
      if (current === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };
  updateToc();
  addEventListener("scroll", updateToc, { passive: true });
  addEventListener("resize", updateToc);
}
