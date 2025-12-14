"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapProps {
    items: string[];
}

export function Roadmap({ items }: RoadmapProps) {
    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                🚀 Your Personalized Roadmap
            </h3>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                        <div className="mt-1">
                            <Circle className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <p className="text-slate-700 leading-relaxed">{item}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
