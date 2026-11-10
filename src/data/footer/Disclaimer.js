
const disclaimer = {
    lastUpdated: "November 10, 2026",

    introduction: () => ({
        title: "Introduction",
        content: [
            "Welcome to my personal portfolio website.",
            "The information provided on this website is intended for general informational, professional, and educational purposes only.",
            "By accessing and using this website, you acknowledge that you have read and understood this Disclaimer."
        ]
    }),

    generalInformation: () => ({
        title: "General Information",
        content: [
            "All information presented on this portfolio website, including personal details, professional experience, skills, education, certifications, and projects, is provided in good faith.",
            "Although reasonable efforts are made to keep the information accurate and up to date, I make no guarantees regarding the completeness, reliability, or accuracy of any information displayed on this website.",
            "Any action you take based on the information available on this website is strictly at your own risk."
        ]
    }),

    professionalDisclaimer: () => ({
        title: "Professional Disclaimer",
        content: [
            "The projects, skills, technical knowledge, and professional experiences presented on this website reflect my personal learning journey and professional capabilities.",
            "Project demonstrations, descriptions, and technical implementations are provided to showcase my development experience and problem-solving abilities.",
            "Any opinions, technical explanations, or professional views expressed on this website are my own and do not necessarily represent those of any employer, organization, client, or affiliated institution."
        ]
    }),

    projectAndPortfolioDisclaimer: () => ({
        title: "Projects and Portfolio Disclaimer",
        content: [
            "The projects displayed on this website are presented for portfolio, educational, and demonstration purposes.",
            "Some projects may be experimental, under development, or continuously improved. Therefore, their functionality, performance, and availability may change over time.",
            "Screenshots, demonstrations, source code, and project descriptions are intended to provide an overview of my work and should not automatically be considered production-ready solutions.",
            "Where projects involve third-party technologies, APIs, libraries, datasets, or services, their respective owners retain their applicable rights."
        ]
    }),

    technicalDisclaimer: () => ({
        title: "Technical Disclaimer",
        content: [
            "This website may include information, examples, demonstrations, or implementations related to web development, software engineering, Artificial Intelligence, Machine Learning, and other technologies.",
            "Technology evolves continuously, and technical information may become outdated as frameworks, libraries, tools, and development practices change.",
            "Visitors should independently verify technical information before using it in professional, commercial, or production environments.",
            "I am not responsible for technical issues, software errors, data loss, or damages resulting from the use of information or code provided on this website."
        ]
    }),

    externalLinksDisclaimer: () => ({
        title: "External Links Disclaimer",
        content: [
            "This portfolio may contain links to external websites, platforms, repositories, and services, including GitHub, LinkedIn, and other professional or technical resources.",
            "These external websites are provided for convenience and additional information.",
            "I do not control or guarantee the accuracy, availability, security, or content of third-party websites.",
            "Visiting external links is entirely at your own discretion and subject to the terms and privacy policies of those respective websites."
        ]
    }),

    thirdPartyDisclaimer: () => ({
        title: "Third-Party Content and Services",
        content: [
            "This website may use third-party libraries, frameworks, APIs, fonts, icons, hosting providers, and other external services.",
            "All third-party trademarks, logos, product names, and intellectual property belong to their respective owners.",
            "The use of third-party tools or services does not imply sponsorship, endorsement, or official affiliation unless explicitly stated.",
            "Third-party services operate independently and are governed by their own terms, conditions, and policies."
        ]
    }),

    noGuarantees: () => ({
        title: "No Guarantees",
        content: [
            "This website and its contents are provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express or implied, to the extent permitted by applicable law.",
            "I do not guarantee uninterrupted website availability, error-free operation, compatibility with all devices or browsers, or the continued accuracy of published information.",
            "Website features, content, and services may be modified, suspended, or discontinued at any time without prior notice."
        ]
    }),

    limitationOfLiability: () => ({
        title: "Limitation of Liability",
        content: [
            "To the maximum extent permitted by applicable law, I shall not be held liable for any direct, indirect, incidental, consequential, or other damages arising from the use of, or inability to use, this website or its content.",
            "This includes, but is not limited to, loss of data, business opportunities, profits, information, or other losses resulting from reliance on website content or third-party services.",
            "Nothing in this Disclaimer is intended to exclude or limit liability where such exclusion or limitation is prohibited by applicable law."
        ]
    }),

    userResponsibility: () => ({
        title: "User Responsibility",
        description: "By using this website, visitors agree to take responsibility for their own actions, including:",
        points: [
            "Verifying information before relying on it for professional or personal decisions.",
            "Using project examples, source code, and technical resources responsibly.",
            "Respecting applicable intellectual property rights and third-party licenses.",
            "Reviewing the terms and policies of external websites and services.",
            "Ensuring that their use of website resources complies with applicable laws and regulations."
        ]
    }),

    intellectualProperty: () => ({
        title: "Intellectual Property",
        content: [
            "Unless otherwise stated, the original content, personal descriptions, portfolio design, and materials published on this website belong to me.",
            "Third-party content, trademarks, logos, software, libraries, and other resources remain the property of their respective owners.",
            "Unauthorized reproduction, redistribution, or commercial use of original website content without appropriate permission is discouraged and may violate applicable intellectual property laws.",
            "Any use of third-party resources is subject to their respective licenses and permissions."
        ]
    }),

    changesToDisclaimer: () => ({
        title: "Changes to This Disclaimer",
        content: [
            "I reserve the right to update, modify, or replace any part of this Disclaimer at any time to reflect changes in website functionality, content, services, or applicable requirements.",
            "Any revisions will be published on this page along with the updated last-updated date.",
            "Visitors are encouraged to review this page periodically to remain informed about any changes."
        ]
    }),

    contactInformation: () => ({
        title: "Contact Information",
        description: "If you have any questions, concerns, or requests regarding this Disclaimer, you can contact me through:",

        details: {
            websiteOwner: "Abinash Nath Pandey",
            portfolio: "Personal Portfolio Website",
            email: "your-email@example.com",
            contactPage: "Contact section on this website"
        },

        footer: "Thank you for visiting my portfolio and taking the time to read this Disclaimer."
    })
};

export default disclaimer;
