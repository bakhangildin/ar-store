import {
    Accessor,
    ParentComponent,
    createContext,
    createEffect,
    createSignal,
    useContext,
} from "solid-js";

type Theme = "dark" | "light" | "system";

interface ThemeModel {
    currentTheme: Accessor<Theme>;
    set(theme: string): void;
}

const ctx = createContext<ThemeModel>();

export function useTheme() {
    const themeCtx = useContext(ctx);
    if (!themeCtx) throw new Error("theme context undefined");
    return themeCtx;
}

export const ThemeProvider: ParentComponent<{}> = (props) => {
    const ls = localStorage.getItem("theme") as Theme | null;
    let defaultTheme: Theme = "system";
    const [theme, setTheme] = createSignal<Theme>(ls || defaultTheme);

    function applyLight() {
        const html = document.querySelector("html");
        html?.setAttribute("data-theme", "corporate");
        html?.classList.remove("dark");
    }
    function applyDark() {
        const html = document.querySelector("html");
        html?.setAttribute("data-theme", "forest");
        html?.classList.add("dark");
    }

    const query = "(prefers-color-scheme: dark)";
    window.matchMedia(query).addEventListener("change", (ev) => {
        if (theme() === "system") ev.matches ? applyDark() : applyLight();
    });

    createEffect(() => {
        const newTheme = theme();
        localStorage.setItem("theme", newTheme);
        switch (newTheme) {
            case "system":
                window.matchMedia(query).matches ? applyDark() : applyLight();
                break;
            case "light":
                applyLight();
                break;
            case "dark":
                applyDark();
                break;
        }
    });

    const value: ThemeModel = {
        currentTheme: theme,
        set: (theme) => setTheme(theme as Theme),
    };

    return <ctx.Provider value={value}>{props.children}</ctx.Provider>;
};
