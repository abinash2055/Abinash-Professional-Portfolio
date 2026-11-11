
import { GraduationCap } from "lucide-react";

import Logo from "./education/Logo";
import Title from "./education/Title";
import Details from "./education/Details";
import Duration from "./education/Duration";
import Location from "./education/Location";
import Status from "./education/Status";

import educationDetails from "../data/education/Details";

const Education = () => {
    return (
        <section id="education" className="w-full">

            <Title />

            <div className="relative mx-auto max-w-4xl">

                {/* Timeline Line */}
                <div className="absolute left-5 top-0 h-full w-px bg-gray-300 dark:bg-gray-700 md:left-8" />

                <div className="space-y-10">

                    {educationDetails.map((item) => (
                        <div
                            key={item.id}
                            className="relative pl-14 md:pl-20"
                        >

                            {/* Timeline Icon */}
                            <div className="absolute left-0 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white md:left-3">
                                <GraduationCap size={20} />
                            </div>

                            {/* Education Card */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-8">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                                    <Logo id={item.id} />

                                    <div className="flex-1">

                                        <Details id={item.id} />

                                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                                            <Duration id={item.id} />
                                            <Location id={item.id} />
                                        </div>

                                    </div>

                                    <Status id={item.id} />

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Education;
