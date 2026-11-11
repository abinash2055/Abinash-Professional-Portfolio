import { motion } from "framer-motion";
import navbarTitle from "../../data/navbar/Title";

export default function Title() {
    const { title, animation } = navbarTitle;
    const animated = animation?.enabled;

    return (
        <motion.div
            initial={animated ? { opacity: 0, y: -6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animation?.duration ?? 0.5, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}
        >
            <span
                style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: "var(--text, #111827)",
                    backgroundImage: "var(--brand-gradient, linear-gradient(to right, #4338CA, #818CF8))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                {title.name}
            </span>
            <span
                style={{
                    marginTop: 3,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.28em",
                    color: "var(--text-secondary, #64748B)",
                }}
            >
                {title.description}
            </span>
        </motion.div>
    );
}