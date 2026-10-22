#!/usr/bin/env python3
"""通过 GitHub Git Data API 把本地目录提交到仓库（绕开本机 git/https 通道不可用的问题）。"""
import base64
import json
import os
import subprocess
import sys
import urllib.request
import urllib.error

REPO = "ShaoAsher/ottertools-site"
ROOT = "/Users/shaw/Desktop/code/MacToolsApp/ottertools-site"
BRANCH = "main"


def token():
    env = dict(os.environ)
    for k in ("http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY"):
        env.pop(k, None)
    return subprocess.check_output(["gh", "auth", "token"], env=env, text=True).strip()


TOKEN = token()
BASE = f"https://api.github.com/repos/{REPO}"


def api(method, path, payload=None, raw=False):
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8") if not raw else payload
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Authorization", f"Bearer {TOKEN}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if payload is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        print(f"HTTP {e.code} on {method} {path}: {body[:500]}", file=sys.stderr)
        raise


def tracked_files():
    env = dict(os.environ)
    for k in ("http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY"):
        env.pop(k, None)
    out = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT, env=env, text=True)
    return [p for p in out.split("\0") if p]


def ensure_initialized():
    """空仓库（无任何提交）时 blob API 会 409，先用 Contents API 造一个初始提交。"""
    try:
        ref = api("GET", f"/git/ref/heads/{BRANCH}")
        return ref["object"]["sha"]
    except urllib.error.HTTPError:
        pass
    print("仓库为空，创建初始提交…")
    seed = api(
        "PUT",
        "/contents/README.md",
        {
            "message": "init",
            "content": base64.b64encode(b"# ottertools-site\n").decode("ascii"),
            "branch": BRANCH,
        },
    )
    return seed["commit"]["sha"]


base_parent = ensure_initialized()

files = tracked_files()
print(f"待提交文件 {len(files)} 个")

tree = []
for rel in files:
    full = os.path.join(ROOT, rel)
    with open(full, "rb") as f:
        content = f.read()
    b64 = base64.b64encode(content).decode("ascii")
    mode = "100755" if os.access(full, os.X_OK) else "100644"
    blob = api("POST", "/git/blobs", {"content": b64, "encoding": "base64"})
    tree.append({"path": rel, "mode": mode, "type": "blob", "sha": blob["sha"]})
    print(f"  blob {rel} ({len(content)} bytes)")

tree_sha = api("POST", "/git/trees", {"tree": tree})["sha"]
print("tree", tree_sha)

parent = None
try:
    ref = api("GET", f"/git/ref/heads/{BRANCH}")
    parent = ref["object"]["sha"]
except urllib.error.HTTPError:
    parent = None

payload = {"message": "官网首版：水獭工具落地页 + 1.0.0 公证安装包", "tree": tree_sha}
if parent:
    payload["parents"] = [parent]
commit = api("POST", "/git/commits", payload)
print("commit", commit["sha"])

if parent:
    api("PATCH", f"/git/refs/heads/{BRANCH}", {"sha": commit["sha"]})
else:
    api("POST", "/git/refs", {"ref": f"refs/heads/{BRANCH}", "sha": commit["sha"]})

print("pushed ->", f"https://github.com/{REPO}")
