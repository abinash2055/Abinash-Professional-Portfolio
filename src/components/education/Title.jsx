import educationTitle from "../../data/education/Title";

const Title = () => {
    return (
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {educationTitle.title}
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
                {educationTitle.subtitle}
            </p>
        </div>
    );
};

export default Title;