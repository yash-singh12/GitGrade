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
                className="w-full max-w-4xl mx-auto"
            >
                <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-slate-900 mb-6">
                    Git<span className="text-orange-500">Grade.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
                    Turn your GitHub into a Hiring Magnet.
                </p>



                <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative flex items-center">
                    <div className="relative w-full group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Github className="w-6 h-6 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="github.com/owner/repo"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full pl-14 pr-16 py-6 text-xl text-slate-900 bg-white rounded-xl border-2 border-slate-100 shadow-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-300"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !url}
                            className="absolute right-3 top-3 bottom-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <ArrowRight className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </form>



                <p className="mt-4 text-sm text-slate-400">
                    Try: facebook/react, vercel/next.js, or your own repo.
                </p>
            </motion.div>
        </div>
    );
}
