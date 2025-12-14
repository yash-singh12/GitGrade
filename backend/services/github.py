import httpx
import base64
from typing import Dict, List, Any, Optional

class GitHubClient:
    BASE_URL = "https://api.github.com"

    def __init__(self, token: Optional[str] = None):
        self.headers = {"Accept": "application/vnd.github.v3+json"}
        if token:
            self.headers["Authorization"] = f"Bearer {token}"

    async def get_repo_metadata(self, owner: str, repo: str) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}", headers=self.headers)
            resp.raise_for_status()
            return resp.json()

    async def get_file_tree(self, owner: str, repo: str, branch: str = "main") -> List[Dict[str, Any]]:
        # First try 'main', if fails try 'master'
        branches = [branch, "master"]
        
        async with httpx.AsyncClient() as client:
            for b in branches:
                try:
                    url = f"{self.BASE_URL}/repos/{owner}/{repo}/git/trees/{b}?recursive=1"
                    resp = await client.get(url, headers=self.headers)
                    if resp.status_code == 200:
                        return resp.json().get("tree", [])
                except Exception:
                    continue
            return []

    async def get_file_content(self, owner: str, repo: str, path: str) -> str:
        async with httpx.AsyncClient() as client:
            url = f"{self.BASE_URL}/repos/{owner}/{repo}/contents/{path}"
            resp = await client.get(url, headers=self.headers)
            if resp.status_code == 200:
                data = resp.json()
                if "content" in data and data["encoding"] == "base64":
                    return base64.b64decode(data["content"]).decode("utf-8", errors="ignore")
            return ""

    @staticmethod
    def parse_url(url: str) -> tuple[str, str]:
        # Expected format: https://github.com/owner/repo
        parts = url.rstrip("/").split("/")
        if "github.com" not in parts:
            raise ValueError("Invalid GitHub URL")
        return parts[-2], parts[-1]
