#!/usr/bin/env python3
"""把指定文件通过 GitHub Git Data API 推送到 ottertools-site（绕开 git 通道）。

用法: no_proxy='*' python3 tool/push_files.py index.html assets/video/ottertools-promo.mp4
"""
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
BASE = f"https://api.github.com/repos/{REPO}"

env = dict(os.environ)
for k in ("http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY"):
    env.pop(k, None)
TOKEN = subprocess.check_output(["gh", "auth", "token"], env=env, text=True).strip()


def api(method, path, payload=None, timeout=600):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Authorization", f"Bearer {TOKEN}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if payload is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        sys.exit(f"HTTP {e.code} on {method} {path}: {body[:300]}")


def main(paths):
    ref = api("GET", f"/git/ref/heads/{BRANCH}")
    head_sha = ref["object"]["sha"]
    base_commit = api("GET", f"/git/commits/{head_sha}")
    base_tree = base_commit["tree"]["sha"]
    print(f"head {head_sha[:8]} tree {base_tree[:8]}")

    tree_items = []
    for rel in paths:
        full = os.path.join(ROOT, rel)
        raw = open(full, "rb").read()
        print(f"upload {rel} {len(raw)/1048576:.1f}MB ...", flush=True)
        blob = api("POST", "/git/blobs",
                   {"content": base64.b64encode(raw).decode(), "encoding": "base64"})
        print(f"  blob {blob['sha'][:8]}")
        tree_items.append({"path": rel, "mode": "100644", "type": "blob", "sha": blob["sha"]})

    tree = api("POST", "/git/trees", {"base_tree": base_tree, "tree": tree_items})
    commit = api("POST", "/git/commits", {
        "message": "官网：换成 v3 宣传片（75s · 豆包配音 · 重新排版）",
        "tree": tree["sha"],
        "parents": [head_sha],
    })
    api("PATCH", f"/git/refs/heads/{BRANCH}", {"sha": commit["sha"]})
    print(f"✓ pushed commit {commit['sha'][:8]}")


if __name__ == "__main__":
    main(sys.argv[1:])
