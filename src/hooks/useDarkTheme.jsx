import { useState, useEffect } from "react";

export default function useDarkTheme() {
    const [theme, setTheme] = useState(localStorage.theme ? localStorage.theme : 'dark');
    const colorTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme ? theme : 'dark');
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        if (localStorage.theme == "dark")
            localStorage.removeItem("light");
        else localStorage.setItem("theme", theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}
