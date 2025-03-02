import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkTheme from "../hooks/useDarkTheme";

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkTheme();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={20}
            />
        </>
    );
}