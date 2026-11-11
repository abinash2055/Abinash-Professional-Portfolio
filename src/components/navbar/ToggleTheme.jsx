import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import toggleThemeData from "../../data/navbar/ToggleTheme";

const STORAGE_KEY = "portfolio-theme";
const icons = { sun: Sun, moon: Moon };

const gradientOf = ({ gradient }) =>
    `linear-gradient(${gradient.direction}, ${gradient.from}, ${gradient.via}, ${gradient.to})`;


export function applyTheme(mode, { animate = false } = {}) {
    const theme = toggleThemeData.themes[mode];
    const root = document.documentElement;
    const { transitionDuration } = toggleThemeData.animation;

    if (animate) {
        root.classList.add("theme-transition");
        window.setTimeout(
            () => root.classList.remove("theme-transition"),
            transitionDuration * 1000 + 100
        );
    }

    root.setAttribute("data-theme", mode);
    root.classList.toggle("dark", mode === "dark");
    root.style.colorScheme = mode;

    // Dark mode's own gradient starts near-black, so the brand accent uses its end colour.
    const accent = mode === "dark" ? theme.gradient.to : theme.color;
    const brand =
        mode === "dark"
            ? `linear-gradient(135deg, #6366F1, ${theme.gradient.to}, #EC4899)`
            : gradientOf(theme);

    const vars = {
        "--bg": theme.background,
        "--surface": theme.surface,
        "--text": theme.text,
        "--text-secondary": theme.secondaryText,
        "--border": theme.border,
        "--glow": theme.glow,
        "--accent": accent,
        "--brand-gradient": brand,
    };
    Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));
}

const css = `
@keyframes themeGradientShift {
    0%   { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
html.theme-transition,
html.theme-transition *,
html.theme-transition *::before,
html.theme-transition *::after {
    transition: background-color ${toggleThemeData.animation.transitionDuration}s ease,
                color ${toggleThemeData.animation.transitionDuration}s ease,
                border-color ${toggleThemeData.animation.transitionDuration}s ease,
                box-shadow ${toggleThemeData.animation.transitionDuration}s ease !important;
}
.theme-toggle:focus-visible {
    outline: 2px solid var(--accent, #4338CA);
    outline-offset: 3px;
}
`;

const stars = [
    { left: 9, top: 9, size: 2.5, delay: 0 },
    { left: 19, top: 21, size: 2, delay: 0.6 },
    { left: 27, top: 8, size: 1.5, delay: 1.2 },
    { left: 14, top: 15, size: 1.5, delay: 1.8 },
];

export default function ToggleTheme() {
    const { title, themes, animation } = toggleThemeData;
    const reduceMotion = useReducedMotion();
    const [mode, setMode] = useState("light");
    const [ready, setReady] = useState(false);

    // Restore the saved choice, or follow the system preference on first visit.
    useEffect(() => {
        let initial = "light";
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            initial =
                saved === "light" || saved === "dark"
                    ? saved
                    : window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light";
        } catch {
            /* storage unavailable, keep default */
        }
        setMode(initial);
        applyTheme(initial);
        setReady(true);
    }, []);

    const toggle = useCallback(() => {
        const next = mode === "light" ? "dark" : "light";
        setMode(next);
        applyTheme(next, { animate: animation.enabled && !reduceMotion });
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* ignore */
        }
    }, [mode, animation.enabled, reduceMotion]);

    const isDark = mode === "dark";
    const theme = themes[mode];
    const Icon = icons[theme.icon] ?? Sun;
    const animated = animation.enabled && !reduceMotion;

    return (
        <>
            <style>{css}</style>
            <motion.button
                type="button"
                role="switch"
                aria-checked={isDark}
                aria-label={title}
                title={`${title}: ${themes[isDark ? "light" : "dark"].name}`}
                className="theme-toggle"
                onClick={toggle}
                whileHover={animated && animation.hoverEffect ? { scale: 1.06 } : undefined}
                whileTap={animated ? { scale: 0.94 } : undefined}
                style={{
                    position: "relative",
                    width: 68,
                    height: 34,
                    padding: 0,
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: 999,
                    cursor: "pointer",
                    overflow: "hidden",
                    opacity: ready ? 1 : 0,
                    backgroundImage: gradientOf(theme),
                    backgroundSize: "220% 100%",
                    animation:
                        animated && animation.type === "gradient"
                            ? `themeGradientShift ${animation.duration}s ease-in-out ${
                                  animation.infinite ? "infinite" : "1"
                              } alternate`
                            : "none",
                    boxShadow: `0 0 0 1px ${theme.border}, 0 6px 20px ${theme.glow}`,
                    transition: "box-shadow 0.5s ease, opacity 0.3s ease",
                }}
            >
                {/* Stars appear on the dark track */}
                {stars.map((s) => (
                    <motion.span
                        key={s.left}
                        aria-hidden="true"
                        initial={false}
                        animate={{
                            opacity: isDark ? [0.35, 1, 0.35] : 0,
                            scale: isDark ? 1 : 0.4,
                        }}
                        transition={
                            isDark && animated
                                ? { duration: 2.4, repeat: Infinity, delay: s.delay }
                                : { duration: 0.3 }
                        }
                        style={{
                            position: "absolute",
                            left: s.left,
                            top: s.top,
                            width: s.size,
                            height: s.size,
                            borderRadius: "50%",
                            background: "#F8FAFC",
                        }}
                    />
                ))}

                {/* Soft cloud highlight on the light track */}
                <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: isDark ? 0 : 0.5, x: isDark ? 14 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        position: "absolute",
                        right: 9,
                        bottom: 7,
                        width: 22,
                        height: 8,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.8)",
                        filter: "blur(1.5px)",
                    }}
                />

                {/* Knob */}
                <motion.span
                    initial={false}
                    animate={{ x: isDark ? 34 : 0 }}
                    transition={
                        animated
                            ? { type: "spring", stiffness: 420, damping: 28 }
                            : { duration: 0 }
                    }
                    style={{
                        position: "absolute",
                        top: 3,
                        left: 3,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: isDark ? "#E2E8F0" : "#FFFFFF",
                        color: isDark ? "#312E81" : "#F59E0B",
                        boxShadow: isDark
                            ? `0 0 14px ${theme.glow}, 0 2px 6px rgba(0,0,0,0.35)`
                            : "0 0 14px rgba(251,191,36,0.55), 0 2px 6px rgba(0,0,0,0.2)",
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={mode}
                            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                            transition={{ duration: animation.transitionDuration / 2 }}
                            style={{ display: "grid", placeItems: "center" }}
                        >
                            <Icon size={15} strokeWidth={2.4} />
                        </motion.span>
                    </AnimatePresence>
                </motion.span>
            </motion.button>
        </>
    );
}