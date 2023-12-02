/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    darkMode: "class",
    daisyui: {
        themes: [
            {
                //light
                corporate: {
                    ...require("daisyui/src/theming/themes")[
                        "[data-theme=corporate]"
                    ],
                    // "primary": "",
                    // "primary-focus": "",
                    // "primary-content": "",
                    // "secondary": "",
                    // "secondary-focus": "",
                    // "secondary-content": "",
                    // "accent": "",
                    // "accent-focus": "",
                    // "accent-content": "",
                    // "neutral": "",
                    // "neutral-focus": "",
                    // "neutral-content": "",
                    "base-100": "#fafafa",
                    "base-200": "#e0e0e0",
                    "base-300": "#cfcfcf",
                    "base-content": "#121212",
                    info: "#e0e0e0",
                    "info-content": "#428fdc",
                    success: "#e0e0e0",
                    "success-content": "#2da160",
                    warning: "#e0e0e0",
                    "warning-content": "#fd7e14",
                    error: "#e0e0e0",
                    "error-content": "#F85149",
                },
            },
            {
                // dark
                forest: {
                    ...require("daisyui/src/theming/themes")[
                        "[data-theme=forest]"
                    ],
                    primary: "#2F81F7",
                    "primary-focus": "#2F81F7",
                    "primary-content": "#ffffff",
                    // "secondary": "",
                    // "secondary-focus": "",
                    // "secondary-content": "",
                    // "accent": "",
                    // "accent-focus": "",
                    // "accent-content": "",
                    neutral: "#2C2D35",
                    // "neutral-focus": "",
                    // "neutral-content": "",
                    "base-100": "#1E1E1E",
                    "base-200": "#333333",
                    // "base-300": "#ffffff",
                    "base-content": "#dddddd",
                    info: "#333333",
                    "info-content": "#428fdc",
                    success: "#333333",
                    "success-content": "#2da160",
                    warning: "#333333",
                    "warning-content": "#fd7e14",
                    error: "#333333",
                    "error-content": "#F85149",
                },
            },
        ],
        logs: false,
    },
};

/*
primary
primary-focus
primary-content
secondary
secondary-focus
secondary-content
accent
accent-focus
accent-content
neutral
neutral-focus
neutral-content
base-100
base-200
base-300
base-content
info
info-content
success
success-content
warning
warning-content
error
error-content
*/
