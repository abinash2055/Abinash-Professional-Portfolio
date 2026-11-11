import { MapPin } from "lucide-react";
import educationLocation from "../../data/education/Location";

const Location = ({ id }) => {
    const item = educationLocation.find((item) => item.id === id);

    if (!item) return null;

    return (
        <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={15} />
            {item.location}
        </span>
    );
};

export default Location;