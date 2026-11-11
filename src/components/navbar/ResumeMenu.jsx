import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Eye, FileText, FileUser, X } from "lucide-react";
import resumeMenu from "../../data/navbar/ResumeMenu";

const icons = { "file-user": FileUser };

const formats = [
  { key: "pdf", label: "PDF", note: "Best for reading and sharing" },
  { key: "docx", label: "Word (DOCX)", note: "Best for editing" },
];

export default function ResumeMenu() {
  const { title, icon, resumes, animation } = resumeMenu;
  const Icon = icons[icon] ?? FileUser;
  const animated = animation?.enabled;
  const duration = animation?.duration ?? 0.25;

  const [open, setOpen] = useState(false);
  const [downloadFor, setDownloadFor] = useState(null); // resume chosen for download
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the popup on Escape.
  useEffect(() => {
    if (!downloadFor) return;
    const onKey = (e) => e.key === "Escape" && setDownloadFor(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [downloadFor]);

  const viewPdf = (resume) => {
    window.open(resume.files.pdf, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const startDownload = (resume) => {
    setOpen(false);
    setDownloadFor(resume);
  };

  const actionStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid var(--border, #E2E8F0)",
    background: "transparent",
    color: "var(--text, #111827)",
  };

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        whileHover={animated ? { scale: 1.04 } : undefined}
        whileTap={animated ? { scale: 0.97 } : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
          color: "var(--text, #111827)",
          background: "var(--surface, #F8FAFC)",
          border: "1px solid var(--border, #E2E8F0)",
        }}
      >
        <Icon size={16} />
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration }}
          style={{ display: "grid", placeItems: "center" }}
        >
          <ChevronDown size={15} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={animated ? { opacity: 0, y: -8, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={animated ? { opacity: 0, y: -8, scale: 0.97 } : undefined}
            transition={{ duration, ease: "easeOut" }}
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 12px)",
              width: 340,
              maxWidth: "calc(100vw - 32px)",
              padding: 8,
              borderRadius: 16,
              zIndex: 60,
              transformOrigin: "top right",
              background: "var(--surface, #F8FAFC)",
              border: "1px solid var(--border, #E2E8F0)",
              boxShadow: "0 20px 50px var(--glow, rgba(129,140,248,0.25))",
            }}
          >
            {resumes.map((resume) => (
              <div
                key={resume.id}
                role="none"
                style={{
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text, #111827)" }}>
                  {resume.name}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontSize: 12.5,
                    color: "var(--text-secondary, #64748B)",
                  }}
                >
                  {resume.description}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => viewPdf(resume)}
                    style={actionStyle}
                  >
                    <Eye size={14} /> Show PDF
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => startDownload(resume)}
                    style={{
                      ...actionStyle,
                      color: "#FFFFFF",
                      border: "none",
                      backgroundImage:
                        "var(--brand-gradient, linear-gradient(to right, #4338CA, #818CF8))",
                    }}
                  >
                    <Download size={14} /> Download resume
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download popup */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {downloadFor && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setDownloadFor(null)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 100,
                  display: "grid",
                  placeItems: "center",
                  padding: 16,
                  background: "rgba(9, 9, 15, 0.55)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Download ${downloadFor.name} resume`}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration, ease: "easeOut" }}
                  style={{
                    position: "relative",
                    width: 400,
                    maxWidth: "100%",
                    padding: 24,
                    borderRadius: 20,
                    background: "var(--surface, #F8FAFC)",
                    color: "var(--text, #111827)",
                    border: "1px solid var(--border, #E2E8F0)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
                  }}
                >
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setDownloadFor(null)}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      display: "grid",
                      placeItems: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: "transparent",
                      color: "var(--text-secondary, #64748B)",
                    }}
                  >
                    <X size={18} />
                  </button>

                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                    Download resume
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 18px",
                      fontSize: 13.5,
                      color: "var(--text-secondary, #64748B)",
                    }}
                  >
                    {downloadFor.name}. Choose a file format.
                  </p>

                  <div style={{ display: "grid", gap: 10 }}>
                    {formats.map(({ key, label, note }) => (
                      <motion.a
                        key={key}
                        href={downloadFor.files[key]}
                        download
                        onClick={() => setTimeout(() => setDownloadFor(null), 200)}
                        whileHover={animated ? { scale: 1.02 } : undefined}
                        whileTap={animated ? { scale: 0.98 } : undefined}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 16px",
                          borderRadius: 14,
                          textDecoration: "none",
                          color: "var(--text, #111827)",
                          background: "var(--bg, #FFFFFF)",
                          border: "1px solid var(--border, #E2E8F0)",
                        }}
                      >
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            color: "var(--accent, #4338CA)",
                            background: "var(--glow, rgba(129,140,248,0.25))",
                          }}
                        >
                          <FileText size={20} />
                        </span>
                        <span style={{ flex: 1 }}>
                          <span style={{ display: "block", fontSize: 14, fontWeight: 600 }}>
                            {label}
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontSize: 12.5,
                              color: "var(--text-secondary, #64748B)",
                            }}
                          >
                            {note}
                          </span>
                        </span>
                        <Download size={18} color="var(--accent, #4338CA)" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}