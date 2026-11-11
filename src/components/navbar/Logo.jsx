import { motion } from "framer-motion";
import navbarLogo from "../../data/navbar/Logo";

export default function Logo() {
    const { logo, animation } = navbarLogo;
    const animated = animation?.enabled;

    return (
        <motion.a
            href="#home"
            aria-label={logo.alt}
            whileHover={animated && animation.hover === "scale" ? { scale: 1.08 } : undefined}
            whileTap={animated ? { scale: 0.96 } : undefined}
            transition={{ duration: animation?.duration ?? 0.3 }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "var(--text, #111827)",
            }}
        >
            <img
                src={logo.src}
                alt={logo.alt}
                style={{ height: 40, width: "auto", display: "block" }}
            />
            {logo.showName && (
                <span style={{ fontWeight: 700, fontSize: 16 }}>{logo.name}</span>
            )}
        </motion.a>
    );
}