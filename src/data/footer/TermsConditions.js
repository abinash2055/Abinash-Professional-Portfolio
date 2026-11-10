
const termsConditions = {
    lastUpdated: "November 10, 2026",

    acceptanceOfTerms: () => ({
        title: "Acceptance of Terms",
        content: [
            "By accessing this website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.",
            "If you do not agree with any part of these terms, please discontinue using the website."
        ]
    }),

    websitePurpose: () => ({
        title: "Website Purpose",
        description: "This website is a personal professional portfolio created to showcase my:",
        points: [
            "Professional background and experience.",
            "Technical skills and expertise.",
            "Academic qualifications and certifications.",
            "Software development and AI/ML projects.",
            "Professional achievements and accomplishments.",
            "Contact information and professional interests."
        ],
        footer: "The information presented is intended for professional, educational, and informational purposes."
    }),

    intellectualProperty: () => ({
        title: "Intellectual Property Rights",
        content: [
            "Unless otherwise stated, the website's original content, including text, personal branding, graphics, design elements, and original materials, belongs to Abinash Nath Pandey.",
            "You may not reproduce, redistribute, modify, or commercially exploit original website content without prior written permission.",
            "Third-party trademarks, logos, libraries, frameworks, and technologies mentioned or displayed on this website remain the property of their respective owners."
        ]
    }),

    projectDemonstrations: () => ({
        title: "Project Demonstrations and Code",
        description: "Projects displayed on this website are presented for demonstration and portfolio purposes.",
        points: [
            "Project descriptions and demonstrations showcase development experience and technical capabilities.",
            "Some projects may include open-source libraries, third-party APIs, or publicly available resources.",
            "You must respect the applicable licenses and terms of third-party software or resources.",
            "You may not claim my original work as your own.",
            "Access to source code, where provided, does not automatically grant additional usage or redistribution rights."
        ]
    }),

    accuracyOfInformation: () => ({
        title: "Accuracy of Information",
        content: [
            "I make reasonable efforts to ensure that the information presented on this website is accurate and up to date.",
            "However, professional experience, skills, projects, certifications, and other information may change over time.",
            "I do not guarantee that all information will always be complete, accurate, or current."
        ]
    }),

    externalLinks: () => ({
        title: "External Links",
        content: [
            "This website may contain links to third-party platforms and services, including GitHub, LinkedIn, professional resources, and project demonstrations.",
            "These external websites are operated independently. I am not responsible for their content, availability, privacy practices, or terms of service.",
            "Visiting external websites is entirely at your own discretion."
        ]
    }),

    userConduct: () => ({
        title: "User Conduct",
        description: "When using this website, you agree not to:",
        points: [
            "Use the website for unlawful or unauthorized purposes.",
            "Attempt to compromise the website's security or functionality.",
            "Distribute malicious software or harmful content.",
            "Copy or misuse original content without authorization.",
            "Interfere with the website's normal operation."
        ]
    }),

    limitationOfLiability: () => ({
        title: "Limitation of Liability",
        content: [
            'This website and its content are provided on an "as is" and "as available" basis.',
            "To the extent permitted by applicable law, I shall not be held responsible for any direct or indirect loss, damage, or inconvenience resulting from the use of this website, reliance on its information, or inability to access its services."
        ]
    }),

    changesToTerms: () => ({
        title: "Changes to These Terms",
        content: [
            "I reserve the right to modify, update, or revise these Terms & Conditions at any time.",
            "Any changes will be published on this page with an updated revision date.",
            "Continued use of the website after changes are published constitutes acceptance of the revised terms, to the extent permitted by applicable law."
        ]
    }),

    contactInformation: () => ({
        title: "Contact Information",
        content: [
            "If you have any questions, concerns, or requests regarding these Terms & Conditions, please contact me through the contact information provided on this website."
        ],
        details: {
            websiteOwner: "Abinash Nath Pandey",
            portfolio: "Personal Professional Portfolio"
        },
        footer: "Thank you for visiting my portfolio and taking the time to review these Terms & Conditions."
    })
};

export default termsConditions;
