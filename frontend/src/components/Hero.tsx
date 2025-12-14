"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Hero() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setLoading(true);

        const encodedUrl = encodeURIComponent(url);
        router.push(`/report?url=${encodedUrl}`);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-full">
                        <Github className="w-8 h-8 text-orange-600" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
                    Git<span className="text-orange-500">Grade</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                    The AI-powered recruiter that grades your GitHub repository.
                    <br />
                    Get a score, summary, and personalized roadmap to get hired.
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
                    <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-6 py-4 text-lg text-slate-900 rounded-full border-2 border-slate-200 focus:border-orange-500 focus:outline-none shadow-sm transition-all pr-14"
                        disabled={loading}

                    />
                    <button
                        type="submit"
                        disabled={loading || !url}
                        className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <ArrowRight className="w-5 h-5" />
                        )}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-400">
                    Try: facebook/react, vercel/next.js, or your own repo.
                </p>
            </motion.div>
        </div>
    );
}
