import { CalendarDays } from "lucide-react";
import educationDuration from "../../data/education/Duration";

const Duration = ({ id }) => {
    const item = educationDuration.find((item) => item.id === id);

    if (!item) return null;

    return (
        <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDays size={15} />
            {item.duration}
        </span>
    );
};

export default Duration;