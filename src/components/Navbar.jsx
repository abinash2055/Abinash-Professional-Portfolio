import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./navbar/Logo";
import Title from "./navbar/Title";
import NavLinks from "./navbar/NavLinks";
import ResumeMenu from "./navbar/ResumeMenu";
import ToggleTheme from "./navbar/ToggleTheme";
import GetHire from "./navbar/GetHire";
import "../styles/navbar.css"

const css = `
.nb-desktop { display: none; }
.nb-burger  { display: inline-grid; }
.nb-title   { display: none; }
@media (min-width: 640px)  { .nb-title { display: block; } }
@media (min-width: 1024px) {
    .nb-desktop { display: flex; }
    .nb-burger  { display: none; }
}
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--bg, #FFFFFF) 82%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border, #E2E8F0)",
      }}
    >
      <style>{css}</style>

      <div
        style={{
          margin: "0 auto",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo />
          <div className="nb-title">
            <Title />
          </div>
        </div>

        <div className="nb-desktop" style={{ alignItems: "center" }}>
          <NavLinks />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="nb-desktop" style={{ alignItems: "center", gap: 12 }}>
            <ResumeMenu />
            <GetHire />
          </div>
          <ToggleTheme />
          <button
            type="button"
            className="nb-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              placeItems: "center",
              width: 46,
              height: 46,
              borderRadius: 14,
              cursor: "pointer",
              color: "var(--text, #111827)",
              background: "var(--surface, #F8FAFC)",
              border: "1px solid var(--border, #E2E8F0)",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nb-burger"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "block",
              overflow: "hidden",
              borderTop: "1px solid var(--border, #E2E8F0)",
            }}
          >
            <div style={{ padding: "16px 20px 20px", display: "grid", gap: 16 }}>
              <NavLinks orientation="vertical" showTitle onNavigate={() => setMenuOpen(false)} />
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
                <ResumeMenu />
                <GetHire onClick={() => setMenuOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
