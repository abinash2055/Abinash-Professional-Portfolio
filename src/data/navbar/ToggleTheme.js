
// Professional Corporate Navbar Theme Configuration

const toggleThemeData = {
    title: "Toggle Theme",

    themes: {
        light: {
            name: "Light Mode",
            color: "#4338CA",
            icon: "sun",

            gradient: {
                from: "#4338CA",
                via: "#818CF8",
                to: "#F9A8D4",
                direction: "to right",
            },

            background: "#FFFFFF",
            surface: "#F8FAFC",
            text: "#111827",
            secondaryText: "#64748B",
            border: "#E2E8F0",

            glow: "rgba(129, 140, 248, 0.25)",
        },

        dark: {
            name: "Dark Mode",
            color: "#334155",
            icon: "moon",

            gradient: {
                from: "#111827",
                via: "#334155",
                to: "#8B5CF6",
                direction: "to right",
            },

            background: "#09090F",
            surface: "#111827",
            text: "#F8FAFC",
            secondaryText: "#94A3B8",
            border: "#27272A",

            glow: "rgba(139, 92, 246, 0.25)",
        },
    },

    animation: {
        enabled: true,

        type: "gradient",
        direction: "left-to-right",

        duration: 5,
        transitionDuration: 0.5,

        infinite: true,
        hoverEffect: true,
    },
};

export default toggleThemeData;
