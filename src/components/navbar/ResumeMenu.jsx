
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronDown,
  Download,
  Eye,
  FileText,
  FileUser,
  X,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import resumeMenu from "../../data/navbar/ResumeMenu";

const icons = {
  "file-user": FileUser,
};

const formats = [
  {
    key: "pdf",
    label: "PDF",
    note: "Best for reading and sharing",
  },
  {
    key: "docx",
    label: "Word (DOCX)",
    note: "Best for editing",
  },
];

export default function ResumeMenu() {
  const { title, icon, resumes, animation } = resumeMenu;

  const Icon = icons[icon] ?? FileUser;
  const animated = animation?.enabled;
  const duration = animation?.duration ?? 0.25;

  // Dropdown state
  const [open, setOpen] = useState(false);

  // Selected resume
  const [downloadFor, setDownloadFor] = useState(null);

  // Download states
  const [downloading, setDownloading] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState(null);
  const [progress, setProgress] = useState(0);
  const [hasKnownSize, setHasKnownSize] = useState(true);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const wrapRef = useRef(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close download popup on Escape
  useEffect(() => {
    if (!downloadFor || downloading) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setDownloadFor(null);
        setDownloadError("");
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [downloadFor, downloading]);

  // Open PDF in a new tab
  const viewPdf = (resume) => {
    window.open(
      resume.files.pdf,
      "_blank",
      "noopener,noreferrer"
    );

    setOpen(false);
  };

  // Open download popup
  const startDownload = (resume) => {
    setOpen(false);
    setDownloadFor(resume);

    setProgress(0);
    setHasKnownSize(true);
    setDownloading(false);
    setDownloadingFormat(null);
    setDownloadComplete(false);
    setDownloadError("");
  };

  // Close download popup
  const closeDownload = () => {
    if (downloading) return;

    setDownloadFor(null);
    setDownloadError("");
    setDownloadComplete(false);
    setProgress(0);
  };

  // Actual download with real-time progress
  const handleDownload = async (key) => {
    if (!downloadFor || downloading) return;

    try {
      setDownloading(true);
      setDownloadingFormat(key);
      setProgress(0);
      setHasKnownSize(true);
      setDownloadComplete(false);
      setDownloadError("");

      const fileUrl = downloadFor.files[key];

      // Fetch resume file
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(
          `Download failed. Server returned ${response.status}.`
        );
      }

      // Get total file size
      const contentLength = response.headers.get(
        "Content-Length"
      );

      const total = Number(contentLength);

      const knownSize =
        contentLength !== null &&
        Number.isFinite(total) &&
        total > 0;

      setHasKnownSize(knownSize);

      if (!response.body) {
        throw new Error(
          "Download stream is unavailable."
        );
      }

      // Read downloaded file in chunks
      const reader = response.body.getReader();

      const chunks = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);

        received += value.length;

        // Calculate actual percentage
        if (knownSize) {
          const percentage = Math.min(
            100,
            Math.round((received / total) * 100)
          );

          setProgress(percentage);
        }
      }

      // Create downloadable Blob
      const mimeType =
        key === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      const blob = new Blob(chunks, {
        type: mimeType,
      });

      const blobUrl = URL.createObjectURL(blob);

      // Create temporary download link
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileUrl.split("/").pop();

      document.body.appendChild(link);
      link.click();
      link.remove();

      // Release temporary URL
      window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 2000);

      // Download completed
      setProgress(100);
      setDownloadComplete(true);

      // Close popup after success
      window.setTimeout(() => {
        setDownloading(false);
        setDownloadingFormat(null);
        setDownloadFor(null);
        setDownloadComplete(false);
        setProgress(0);
      }, 1500);

    } catch (error) {
      console.error("Resume download error:", error);

      setDownloadError(
        error.message || "Something went wrong while downloading."
      );

      setDownloading(false);
      setDownloadingFormat(null);
      setProgress(0);
      setDownloadComplete(false);
    }
  };

  // Shared action button styling
  const actionStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
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
    <div
      ref={wrapRef}
      style={{ position: "relative" }}
    >

      {/* MAIN RESUME BUTTON */}

      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        whileHover={
          animated ? { scale: 1.04 } : undefined
        }
        whileTap={
          animated ? { scale: 0.97 } : undefined
        }
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
          color: "var(--text, #111827)",
          background: "var(--surface, #F8FAFC)",
          border: "1px solid var(--border, #E2E8F0)",
        }}
      >
        <Icon size={19} />

        <span>{title}</span>

        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{ duration }}
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <ChevronDown size={15} />
        </motion.span>
      </motion.button>

      {/* RESUME DROPDOWN */}

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={
              animated
                ? {
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }
                : false
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              animated
                ? {
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }
                : undefined
            }
            transition={{
              duration,
              ease: "easeOut",
            }}
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
              boxShadow:
                "0 20px 50px var(--glow, rgba(129,140,248,0.25))",
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
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text, #111827)",
                  }}
                >
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

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => viewPdf(resume)}
                    style={actionStyle}
                  >
                    <Eye size={14} />
                    Show PDF
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
                    <Download size={14} />
                    Download resume
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DOWNLOAD POPUP */}

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
                onClick={closeDownload}
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
                  initial={{
                    opacity: 0,
                    y: 16,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 16,
                    scale: 0.96,
                  }}
                  transition={{
                    duration,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "relative",
                    width: 400,
                    maxWidth: "100%",
                    padding: 24,
                    borderRadius: 20,
                    background: "var(--surface, #F8FAFC)",
                    color: "var(--text, #111827)",
                    border: "1px solid var(--border, #E2E8F0)",
                    boxShadow:
                      "0 30px 80px rgba(0,0,0,0.35)",
                  }}
                >

                  {/* POPUP HEADING */}

                  <h3
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
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

                  {/* CLOSE BUTTON */}

                  <button
                    type="button"
                    aria-label="Close"
                    disabled={downloading}
                    onClick={closeDownload}
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
                      cursor: downloading
                        ? "not-allowed"
                        : "pointer",
                      background: "transparent",
                      color: "var(--text-secondary, #64748B)",
                      opacity: downloading ? 0.4 : 1,
                    }}
                  >
                    <X size={18} />
                  </button>

                  {/* FILE FORMAT OPTIONS */}

                  <div
                    style={{
                      display: "grid",
                      gap: 10,
                    }}
                  >
                    {formats.map(({ key, label, note }) => {
                      const active =
                        downloadingFormat === key;

                      return (
                        <motion.button
                          key={key}
                          type="button"
                          disabled={downloading}
                          onClick={() =>
                            handleDownload(key)
                          }
                          whileHover={
                            animated && !downloading
                              ? { scale: 1.02 }
                              : undefined
                          }
                          whileTap={
                            animated && !downloading
                              ? { scale: 0.98 }
                              : undefined
                          }
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            width: "100%",
                            padding: "14px 16px",
                            borderRadius: 14,
                            cursor: downloading
                              ? "wait"
                              : "pointer",
                            textAlign: "left",
                            color: "var(--text, #111827)",
                            background: "var(--bg, #FFFFFF)",
                            border: "1px solid var(--border, #E2E8F0)",
                            opacity:
                              downloading && !active
                                ? 0.5
                                : 1,
                          }}
                        >
                          {/* PROGRESS COVER */}

                          <motion.span
                            initial={false}
                            animate={{
                              width: active
                                ? `${progress}%`
                                : "0%",
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            style={{
                              position: "absolute",
                              inset: "0 auto 0 0",
                              background:
                                "rgba(99, 102, 241, 0.13)",
                              pointerEvents: "none",
                            }}
                          />

                          {/* FILE ICON */}

                          <span
                            style={{
                              position: "relative",
                              display: "grid",
                              placeItems: "center",
                              width: 40,
                              height: 40,
                              flexShrink: 0,
                              borderRadius: 12,
                              color: "var(--accent, #4338CA)",
                              background:
                                "var(--glow, rgba(129,140,248,0.25))",
                            }}
                          >
                            <FileText size={20} />
                          </span>

                          {/* FILE DETAILS */}

                          <span
                            style={{
                              position: "relative",
                              flex: 1,
                            }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                              }}
                            >
                              {label}
                            </span>

                            <span
                              style={{
                                display: "block",
                                fontSize: 12.5,
                                color: "var(--text-secondary, #64748B)",
                              }}
                            >
                              {active
                                ? downloadComplete
                                  ? "Download complete"
                                  : hasKnownSize
                                    ? "Downloading..."
                                    : "Receiving file..."
                                : note}
                            </span>
                          </span>

                          {/* STATUS ICON */}

                          <span
                            style={{
                              position: "relative",
                              display: "grid",
                              placeItems: "center",
                              flexShrink: 0,
                              color: "var(--accent, #4338CA)",
                            }}
                          >
                            {active ? (
                              downloadComplete ? (
                                <motion.span
                                  initial={{
                                    scale: 0,
                                  }}
                                  animate={{
                                    scale: 1,
                                  }}
                                  style={{
                                    display: "grid",
                                    placeItems: "center",
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: "#16A34A",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  <CheckCircle2
                                    size={20}
                                    color="#FFFFFF"
                                  />
                                </motion.span>
                              ) : (
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {hasKnownSize ? (
                                    `${progress}%`
                                  ) : (
                                    <LoaderCircle
                                      size={19}
                                      className="animate-spin"
                                    />
                                  )}
                                </span>
                              )
                            ) : (
                              <Download size={18} />
                            )}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* DOWNLOAD PROGRESS */}

                  <AnimatePresence>
                    {downloading && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        style={{
                          marginTop: 22,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                            marginBottom: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            {downloadComplete
                              ? "Download completed!"
                              : "Downloading your resume..."}
                          </span>

                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "var(--accent, #4338CA)",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {hasKnownSize
                              ? `${progress}%`
                              : "Downloading"}
                          </span>
                        </div>

                        {/* PROGRESS BAR */}

                        <div
                          style={{
                            height: 9,
                            width: "100%",
                            borderRadius: 999,
                            overflow: "hidden",
                            background:
                              "var(--border, #E2E8F0)",
                          }}
                        >
                          <motion.div
                            initial={{
                              width: "0%",
                            }}
                            animate={{
                              width: downloadComplete
                                ? "100%"
                                : hasKnownSize
                                  ? `${progress}%`
                                  : "35%",
                            }}
                            transition={{
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                            style={{
                              height: "100%",
                              borderRadius: 999,
                              background:
                                "linear-gradient(90deg, #4338CA, #818CF8)",
                              ...(hasKnownSize
                                ? {}
                                : {
                                  animation:
                                    "resume-indeterminate 1.2s ease-in-out infinite alternate",
                                }),
                            }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 9,
                            fontSize: 11.5,
                            color: "var(--text-secondary, #64748B)",
                          }}
                        >
                          <span>
                            {downloadComplete
                              ? "Your file is ready"
                              : hasKnownSize
                                ? "Please wait..."
                                : "File size unavailable"}
                          </span>

                          <span>
                            {downloadComplete
                              ? "100% completed"
                              : hasKnownSize
                                ? `${progress}% completed`
                                : "Receiving data"}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* SUCCESS MESSAGE */}

                  <AnimatePresence>
                    {downloadComplete && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginTop: 18,
                          padding: 14,
                          borderRadius: 14,
                          background:
                            "rgba(22, 163, 74, 0.08)",
                          border: "1px solid rgba(22, 163, 74, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: 40,
                            height: 40,
                            flexShrink: 0,
                            borderRadius: "50%",
                            background: "#16A34A",
                            color: "#FFFFFF",
                          }}
                        >
                          <CheckCircle2
                            size={23}
                            color="#FFFFFF"
                          />
                        </span>

                        <span>
                          <span
                            style={{
                              display: "block",
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#16A34A",
                            }}
                          >
                            Download Successful!
                          </span>

                          <span
                            style={{
                              display: "block",
                              marginTop: 3,
                              fontSize: 12,
                              color: "var(--text-secondary, #64748B)",
                            }}
                          >
                            Your resume has been downloaded successfully.
                          </span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ERROR MESSAGE */}

                  <AnimatePresence>
                    {downloadError && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginTop: 18,
                          padding: 14,
                          borderRadius: 14,
                          background:
                            "rgba(239, 68, 68, 0.07)",
                          border: "1px solid rgba(239, 68, 68, 0.18)",
                        }}
                      >
                        {/* RED CIRCULAR ERROR ICON */}

                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: 40,
                            height: 40,
                            flexShrink: 0,
                            borderRadius: "50%",
                            background: "#DC2626",
                            color: "#FFFFFF",
                          }}
                        >
                          <XCircle
                            size={23}
                            color="#FFFFFF"
                          />
                        </span>

                        {/* ERROR DETAILS */}

                        <span
                          style={{
                            flex: 1,
                          }}
                        >
                          <span
                            style={{
                              display: "block",
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#DC2626",
                            }}
                          >
                            Download Failed
                          </span>

                          <span
                            style={{
                              display: "block",
                              marginTop: 3,
                              fontSize: 12,
                              color: "var(--text-secondary, #64748B)",
                            }}
                          >
                            {downloadError}
                          </span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
