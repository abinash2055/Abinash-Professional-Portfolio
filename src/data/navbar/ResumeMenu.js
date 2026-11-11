
// Professional Resume Download Menu Configuration

const resumeMenu = {
    title: "My Resume",
    icon: "file-user",

    resumes: [
        {
            id: 1,
            name: "AI / ML Engineer",
            description: "Python, Machine Learning & AI",
            files: {
                pdf: "/resumes/pdf/MachineLearning.pdf",
                docx: "/resumes/docx/MachineLearning.docx",
            },
        },
        {
            id: 2,
            name: "Full Stack Developer",
            description: "Frontend & Backend Development",
            files: {
                pdf: "/resumes/pdf/FullStack.pdf",
                docx: "/resumes/docx/FullStack.docx",
            },
        },
        {
            id: 3,
            name: "Complete Resume",
            description: "Detailed Professional Profile",
            files: {
                pdf: "/resumes/pdf/Detailed_CV.pdf",
                docx: "/resumes/docx/Detailed_CV.docx",
            },
        },
    ],

    animation: {
        enabled: true,
        type: "fade",
        duration: 0.25,
    },
};

export default resumeMenu;
