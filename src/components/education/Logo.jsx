import educationLogo from "../../data/education/Logo";

const Logo = ({ id }) => {
    const logo = educationLogo[
        id === 1 ? "bachelor" :
            id === 2 ? "college" :
                id === 3 ? "school" : "nursery"
    ];

    return (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <img
                src={logo}
                alt="Institution Logo"
                className="h-full w-full object-contain p-2"
            />
        </div>
    );
};

export default Logo;