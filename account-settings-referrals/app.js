const routes = {
  portfolio: "#/portfolio",
  profile: "#/settings/profile",
  security: "#/settings/security",
  referrals: "#/referrals",
};

const accountTrigger = document.querySelector("#accountTrigger");
const accountMenu = document.querySelector("#accountMenu");
const signOutModal = document.querySelector("#signOutModal");
const copyReferral = document.querySelector("#copyReferral");
const referralLinkText = document.querySelector("#referralLinkText");

function currentRoute() {
  return window.location.hash || routes.profile;
}

function closeAccountMenu() {
  accountMenu.hidden = true;
  accountTrigger.setAttribute("aria-expanded", "false");
}

function openSignOutModal() {
  closeAccountMenu();
  signOutModal.hidden = false;
}

function closeSignOutModal() {
  signOutModal.hidden = true;
}

function setActive(selector, predicate) {
  document.querySelectorAll(selector).forEach((node) => {
    node.classList.toggle("active", predicate(node));
  });
}

function renderRoute() {
  const route = currentRoute();
  const isSettings = route.startsWith("#/settings");
  const isSecurity = route === routes.security;
  const isReferrals = route === routes.referrals;
  const isPortfolio = route === routes.portfolio;

  document.querySelector("#settingsPage").hidden = !isSettings;
  document.querySelector("#referralsPage").hidden = !isReferrals;
  document.querySelector("#portfolioPage").hidden = !isPortfolio;

  document.querySelector("#profileView").hidden = !isSettings || isSecurity;
  document.querySelector("#securityView").hidden = !isSecurity;

  setActive("[data-nav]", (node) => {
    const nav = node.dataset.nav;
    return (nav === "settings" && isSettings) || (nav === "referrals" && isReferrals) || (nav === "portfolio" && isPortfolio);
  });

  setActive("[data-section-link]", (node) => {
    return node.dataset.sectionLink === (isSecurity ? "security" : "profile");
  });
}

accountTrigger.addEventListener("click", () => {
  const nextOpen = accountMenu.hidden;
  accountMenu.hidden = !nextOpen;
  accountTrigger.setAttribute("aria-expanded", String(nextOpen));
});

document.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.hash = button.dataset.route;
    closeAccountMenu();
  });
});

document.querySelector("#openSignOut").addEventListener("click", openSignOutModal);
document.querySelector("#cancelSignOut").addEventListener("click", closeSignOutModal);
document.querySelector("#confirmSignOut").addEventListener("click", closeSignOutModal);

signOutModal.addEventListener("click", (event) => {
  if (event.target === signOutModal) closeSignOutModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAccountMenu();
    closeSignOutModal();
  }
});

document.addEventListener("click", (event) => {
  if (!accountMenu.hidden && !accountMenu.contains(event.target) && !accountTrigger.contains(event.target)) {
    closeAccountMenu();
  }
});

copyReferral.addEventListener("click", async () => {
  const link = referralLinkText.textContent.trim();
  try {
    await navigator.clipboard.writeText(link);
    copyReferral.textContent = "Copied";
    window.setTimeout(() => {
      copyReferral.textContent = "Copy link";
    }, 1200);
  } catch {
    copyReferral.textContent = "Copy link";
  }
});

window.addEventListener("hashchange", renderRoute);

if (!window.location.hash) {
  window.location.hash = routes.profile;
} else {
  renderRoute();
}
