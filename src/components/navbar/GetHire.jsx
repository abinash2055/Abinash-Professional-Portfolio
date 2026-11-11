import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import getHireData from "../../data/navbar/GetHire";

const icons = { "arrow-up-right": ArrowUpRight };

export default function GetHire({ onClick }) {
  const { text, path, showIcon, icon, animation } = getHireData;
  const Icon = icons[icon] ?? ArrowUpRight;
  const animated = animation?.enabled;
  const duration = animation?.duration ?? 0.3;

  const handleClick = (e) => {
    if (path?.startsWith("#")) {
      const target = document.querySelector(path);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClick?.(e);
  };

  return (
    <motion.a
      href={path}
      onClick={handleClick}
      initial="rest"
      whileHover={animated ? "hover" : undefined}
      whileTap={animated ? { scale: 0.97 } : undefined}
      variants={{
        rest: { scale: 1 },
        hover: { scale: animation?.hover === "scale" ? 1.06 : 1 },
      }}
      transition={{ duration }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
        whiteSpace: "nowrap",
        backgroundImage: "var(--brand-gradient, linear-gradient(to right, #4338CA, #818CF8))",
        boxShadow: "0 8px 24px var(--glow, rgba(129,140,248,0.25))",
      }}
    >
      <span>{text}</span>
      {showIcon && (
        <motion.span
          variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }}
          transition={{ duration }}
          style={{ display: "grid", placeItems: "center" }}
        >
          <Icon size={16} strokeWidth={2.4} />
        </motion.span>
      )}
    </motion.a>
  );
}