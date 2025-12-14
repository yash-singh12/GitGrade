"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

interface SummaryCardProps {
    summary: string;
}

export function SummaryCard({ summary }: SummaryCardProps) {
    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Recruiter's Feedback
            </h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {summary}
            </p>
        </div>
    );
}
