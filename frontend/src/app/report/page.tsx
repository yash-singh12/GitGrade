"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ScoreGauge } from "@/components/ScoreGauge";
import { Roadmap } from "@/components/Roadmap";
import { SummaryCard } from "@/components/SummaryCard";
import { Loader2, AlertCircle } from "lucide-react";
import { AnalysisResult } from "@/types";
import Link from "next/link";

export default function ReportPage() {
    const searchParams = useSearchParams();
    const url = searchParams.get("url");

    const [data, setData] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                });

                if (!res.ok) throw new Error("Failed to analyze repository");

                const result = await res.json();
                setData(result);
            } catch (err) {
                setError("Something went wrong. Please check the URL and try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <h2 className="text-xl font-semibold text-slate-700">Analyzing Repository...</h2>
                <p className="text-slate-500">Reading code, checking structure, and generating feedback.</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
                <p className="text-slate-600 mb-6">{error}</p>
                <Link href="/" className="px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">
                    Try Another Repo
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        ← Back to Home
                    </Link>
                    <h1 className="text-sm font-mono text-slate-400 truncate max-w-md">{url}</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Left Column: Score */}
                    <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
                        <ScoreGauge score={data.score} />
                        <div className="mt-8 w-full space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Documentation</span>
                                <span className="font-bold text-slate-900">{data.metrics?.documentation}/10</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{ width: `${(data.metrics?.documentation || 0) * 10}%` }} />
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Complexity</span>
                                <span className="font-bold text-slate-900">{data.metrics?.complexity}/10</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full" style={{ width: `${(data.metrics?.complexity || 0) * 10}%` }} />
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Best Practices</span>
                                <span className="font-bold text-slate-900">{data.metrics?.best_practices}/10</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: `${(data.metrics?.best_practices || 0) * 10}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full md:w-2/3">
                        <SummaryCard summary={data.summary} />
                        <Roadmap items={data.roadmap} />
                    </div>
                </div>
            </div>
        </main>
    );
}
