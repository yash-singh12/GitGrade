"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-orange-500 rounded-lg group-hover:bg-orange-600 transition-colors shadow-md">
                    <Github className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                    Git<span className="text-orange-500">Grade</span>
                </span>
            </Link>

            <div className="flex items-center gap-6">
                <button
                    onClick={scrollToAbout}
                    className="text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors"
                >
                    About
                </button>
                <a
                    href="https://github.com/yash-singh12/GitGrade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors"
                >
                    GitHub
                </a>
            </div>
        </nav>
    );
}
