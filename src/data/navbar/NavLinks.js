
// Professional Navbar Navigation Configuration

const navbarLinks = {
    title: "Explore",

    links: [
        { id: 1, name: "Home", path: "#home" },
        { id: 2, name: "About", path: "#about" },
        { id: 3, name: "Experience", path: "#experience" },
        { id: 4, name: "Achievements", path: "#awards-and-certificate" },
        { id: 5, name: "Education", path: "#education" },
        { id: 6, name: "Projects", path: "#projects" },
        { id: 7, name: "Contact", path: "#contact" },
    ],

    animation: {
        enabled: true,
        type: "slide",
        duration: 0.3,
        stagger: 0.08,
    },
};

export default navbarLinks;
