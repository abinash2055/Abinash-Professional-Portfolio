
import { motion } from "framer-motion";
import navbarTitle from "../../data/navbar/Title";

export default function Title() {
    const { title, animation } = navbarTitle;
    const animated = animation?.enabled;

    return (
        <motion.div
            initial={animated ? { opacity: 0, y: -6 } : false}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.08,
                transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{ duration: animation?.duration ?? 0.5, ease: "easeOut" }}
            style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.15,
                transformOrigin: "left center",
                cursor: "pointer"
            }}
        >
            <span
                style={{
                    fontSize: 25,
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
                    marginTop: 4,
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: "0.28em",
                    color: "var(--text-secondary, #4e5968)",
                }}
            >
                {title.description}
            </span>
        </motion.div>
    );
}
