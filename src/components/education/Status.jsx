import { CheckCircle2 } from "lucide-react";
import educationStatus from "../../data/education/Status";

const Status = ({ id }) => {
    const item = educationStatus.find((item) => item.id === id);

    if (!item) return null;

    return (
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 size={13} />
            {item.status}
        </span>
    );
};

export default Status;