"use client";

import { motion } from "framer-motion";
import { Search, Brain, FileText } from "lucide-react";

export function About() {
    const steps = [
        {
            icon: <Search className="w-6 h-6 text-blue-500" />,
            title: "1. Scan",
            description: "We fetch your repository structure and key files without cloning, keeping it fast and secure.",
            color: "bg-blue-50",
        },
        {
            icon: <Brain className="w-6 h-6 text-purple-500" />,
            title: "2. Analyze",
            description: "Our AI 'Recruiter' reads your code, checking for best practices, readability, and structure.",
            color: "bg-purple-50",
        },
        {
            icon: <FileText className="w-6 h-6 text-green-500" />,
            title: "3. Report",
            description: "Get a 0-100 score, a professional summary, and a step-by-step roadmap to improve.",
            color: "bg-green-50",
        },
    ];

    return (
        <section id="about" className="py-24 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        How GitGrade Works
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        We turn your code into a career asset. Understand exactly what recruiters see when they look at your GitHub.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
