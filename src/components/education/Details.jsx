import { GraduationCap } from "lucide-react";
import educationDetails from "../../data/education/Details";

const Details = ({ id }) => {
    const item = educationDetails.find((item) => item.id === id);

    if (!item) return null;

    return (
        <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.institution}
            </h3>

            <p className="mt-1 font-medium text-gray-700 dark:text-gray-300">
                {item.designation}
            </p>

            <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Academic Highlights
                </h4>

                <ul className="space-y-3">
                    {item.details.map((detail, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-400"
                        >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900 dark:bg-white" />
                            {detail}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Details;