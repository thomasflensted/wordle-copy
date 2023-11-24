const preferredTheme = localStorage.getItem("theme");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
const theme = getPreferredTheme(preferredTheme, systemSettingLight);
document.querySelector("html").setAttribute("theme", theme);
setIcon(theme);

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    const currentTheme = document.querySelector("html").getAttribute("theme");
    const theme = currentTheme == "light" ? "dark" : "light";
    document.querySelector("html").setAttribute("theme", theme);
    setIcon(theme);
    localStorage.setItem("theme", theme)
})

function getPreferredTheme(preferredTheme, systemSettingLight) {
    if (preferredTheme) return preferredTheme;
    else if (systemSettingLight.matches) return "light";
    return "dark";
}

function setIcon(theme) {
    if (theme == "light") {
        document.getElementById("theme-toggle").classList.remove("fa-sun");
        document.getElementById("theme-toggle").classList.add("fa-moon");
    } else {
        document.getElementById("theme-toggle").classList.add("fa-sun");
        document.getElementById("theme-toggle").classList.remove("fa-moon");
    }
}