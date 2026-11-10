import React, { useEffect, useState } from 'react'

// Import Resume Configuration
import resumeMenu from "../../data/navbar/ResumeMenu"

const ResumeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Control Resume Menu entrance animation
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);



  // Open PDF Resume in New Tab
  const handleView = (resume) => {
    window.open(resume.files.pdf, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };


  // Open Download Popup
  const handleDownload = (resume) => {
    setSelectedResume(resume);
    setShowDownloadModal(true);
    setIsOpen(false);
  };


  // Close Download Popup
  const closeModal = () => {
    setShowDownloadModal(false);
    setSelectedResume(null);
  };

  return (
    <>
      {/* Resume DropDown */}
      <div className={`
    relative
    transition-all duration-[2000ms] ease-out
    ${loaded
          ? "translate-y-0 opacity-100"
          : "-translate-y-20 opacity-0"
        }
  `}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`
            flex items-center gap-2
            rounded-lg border px-4 py-2
            text-base font-semibold
            transition-all duration-[2000ms] ease-out
            hover:text-blue-500
            ${loaded
              ? "translate-y-0 opacity-100"
              : "-translate-y-20 opacity-0"
            }
          `}
        >
          {resumeMenu.title}

          <span
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          >
            ▾
          </span>
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div
            className="
              absolute right-0 top-full z-50 mt-3
              w-64 overflow-hidden
              rounded-xl border
              bg-white p-2 shadow-xl"
          >
            {resumeMenu.resumes.map((resume) => (
              <div
                key={resume.id}
                className="
                  rounded-lg p-3
                  transition-colors duration-200
                "
              >
                {/* Resume Title */}
                <p className="mb-2 text-sm font-bold">
                  {resume.name}
                </p>

                {/* Resume Actions */}
                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() => handleView(resume)}
                    className="
                      flex-1 rounded-md px-3 py-2 border
                      text-sm font-medium hover:text-white
                      transition-colors hover:bg-blue-600 
                    "
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(resume)}
                    className="
                      flex-1 rounded-md
                      border px-3 py-2
                      text-sm font-medium
                      hover:text-white hover:bg-gray-700"
                  >
                    Download
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Download Format Modal */}
      {showDownloadModal && selectedResume && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            px-4 backdrop-blur-sm
          "
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="
              w-full max-w-sm rounded-2xl
              border
              p-6 shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Heading */}
            <h2
              id="resume-modal-title"
              className="text-xl font-bold"
            >
              Download Resume
            </h2>

            <p className="mt-2 text-sm">
              Choose your preferred file format for{" "}
              <span className="font-semibold">
                {selectedResume.name}
              </span>
              .
            </p>

            {/* Download Options */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <a
                href={selectedResume.files.pdf}
                download
                className="
                  flex flex-col items-center gap-2
                  rounded-xl border bg-gray-300
                  p-4 text-center transition-all hover:bg-gray-600"
              >
                <span className="text-3xl">📄</span>
                <span className="font-semibold">
                  PDF
                </span>
                <span className="text-xs">
                  .pdf file
                </span>
              </a>

              <a
                href={selectedResume.files.docx}
                download
                className="
                  flex flex-col items-center gap-2
                  rounded-xl border bg-gray-300
                  p-4 text-center transition-all hover:bg-gray-600
                "
              >
                <span className="text-3xl">📝</span>
                <span className="font-semibold">
                  DOCX
                </span>
                <span className="text-xs">
                  .docx file
                </span>
              </a>

            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="
                mt-5 w-full rounded-lg
                px-4 py-2 border hover:bg-gray-700 hover:text-white
                text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeMenu;