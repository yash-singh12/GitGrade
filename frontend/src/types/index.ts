export interface AnalysisResult {
    score: number;
    summary: string;
    roadmap: string[];
    metrics: {
        documentation: number;
        complexity: number;
        best_practices: number;
    };
}
