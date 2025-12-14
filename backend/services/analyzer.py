from .github import GitHubClient
from .llm import GeminiClient
import json

class AnalyzerService:
    def __init__(self):
        self.github = GitHubClient()
        self.llm = GeminiClient()

    async def analyze_repository(self, url: str):
        # 1. Parse URL
        try:
            owner, repo = self.github.parse_url(url)
        except ValueError:
            return {"error": "Invalid GitHub URL"}

        # 2. Fetch Metadata & Tree
        metadata = await self.github.get_repo_metadata(owner, repo)
        file_tree = await self.github.get_file_tree(owner, repo)

        # 3. Spot Check Strategy
        # Find README and Entry Point
        readme_content = ""
        entry_point_content = ""
        entry_point_file = "Unknown"

        # Simple heuristic for entry point
        possible_entry_points = ["main.py", "app.py", "index.js", "App.js", "server.js", "go.mod", "Cargo.toml"]
        
        for file in file_tree:
            path = file["path"]
            if path.lower() == "readme.md":
                readme_content = await self.github.get_file_content(owner, repo, path)
            
            if not entry_point_content and path in possible_entry_points:
                entry_point_content = await self.github.get_file_content(owner, repo, path)
                entry_point_file = path

        # 4. Construct Prompt
        prompt = f"""
        You are a Senior Technical Recruiter and Engineering Manager.
        Analyze this GitHub repository submission from a student/candidate.
        
        === PROJECT METADATA ===
        Repo: {owner}/{repo}
        Stars: {metadata.get('stargazers_count')}
        Language: {metadata.get('language')}
        Description: {metadata.get('description')}
        
        === FILE STRUCTURE (Top Level) ===
        {[f['path'] for f in file_tree if '/' not in f['path']]}
        
        === README ===
        {readme_content[:2000]}  # Truncated to save tokens if massive
        
        === CODE SAMPLE ({entry_point_file}) ===
        {entry_point_content[:3000]}
        
        === INSTRUCTIONS ===
        Evaluate this project based on:
        1. **Employability**: Is this a portfolio-worthy project?
        2. **Code Quality**: Is the code clean, readable, and structured?
        3. **Completeness**: Does it have documentation and a clear purpose?
        
        Return STRICT JSON format:
        {{
            "score": <0-100 integer>,
            "summary": "<Executive summary of the project quality>",
            "roadmap": ["<Actionable step 1>", "<Actionable step 2>", ...],
            "metrics": {{
                "documentation": <0-10>,
                "complexity": <0-10>,
                "best_practices": <0-10>
            }}
        }}
        """

        # 5. Call LLM
        analysis_result = await self.llm.analyze_repo(prompt)
        
        return analysis_result
