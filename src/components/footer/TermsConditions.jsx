import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

import termsConditions from "../../data/footer/TermsConditions";

const TermsConditions = () => {

    const sections = Object.entries(termsConditions)
        .filter(([key, value]) => typeof value === "function")
        .map(([key, getSection]) => ({
            id: key,
            ...getSection()
        }));

    return (
        <div className="min-h-screen px-5 py-12 sm:px-8 lg:px-12">

            <div className="mx-auto w-full max-w-4xl">

                {/* Back Navigation */}
                <Link
                    to="/"
                    className="mb-10 inline-flex items-center gap-2 text-sm"
                >
                    <ArrowLeft size={17} />
                    Back to Home
                </Link>

                {/* Page Header */}
                <header className="mb-12 border-b pb-8">

                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-xl p-3">
                            <FileText size={25} />
                        </div>

                        <span className="text-sm font-medium uppercase tracking-widest">
                            Legal Information
                        </span>
                    </div>

                    <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Terms & Conditions
                    </h1>

                    <p className="max-w-2xl text-sm leading-7 sm:text-base">
                        Please read these Terms & Conditions carefully before
                        accessing or using my personal portfolio website.
                    </p>

                    <p className="mt-5 text-sm">
                        Last Updated: {termsConditions.lastUpdated}
                    </p>

                </header>

                {/* Terms Sections */}
                <main className="space-y-10">

                    {sections.map((section, index) => (

                        <section
                            key={section.id}
                            className="space-y-4"
                        >

                            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                                <span className="mr-2">
                                    {String(index + 1).padStart(2, "0")}.
                                </span>

                                {section.title}
                            </h2>

                            {section.description && (
                                <p className="text-sm leading-8 sm:text-base">
                                    {section.description}
                                </p>
                            )}

                            {section.content?.map((paragraph, i) => (
                                <p
                                    key={i}
                                    className="text-sm leading-8 sm:text-base"
                                >
                                    {paragraph}
                                </p>
                            ))}

                            {section.points && (
                                <ul className="list-disc space-y-3 pl-6 text-sm leading-7 sm:text-base">
                                    {section.points.map((point, i) => (
                                        <li key={i}>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.details && (
                                <div className="space-y-3 rounded-xl p-5 text-sm sm:text-base">

                                    <p>
                                        <span className="font-semibold">
                                            Website Owner:
                                        </span>{" "}
                                        {section.details.websiteOwner}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Portfolio:
                                        </span>{" "}
                                        {section.details.portfolio}
                                    </p>

                                </div>
                            )}

                            {section.footer && (
                                <p className="text-sm leading-8 sm:text-base">
                                    {section.footer}
                                </p>
                            )}

                        </section>

                    ))}

                </main>

                {/* Bottom Navigation */}
                <div className="mt-14 border-t border-gray-200 pt-8 dark:border-gray-800">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all"
                    >
                        <ArrowLeft size={16} />
                        Return to Portfolio
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default TermsConditions;
