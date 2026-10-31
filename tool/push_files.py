#!/usr/bin/env python3
"""把指定文件通过 GitHub Git Data API 推送到 ottertools-site（绕开 git 通道）。

用法:
  no_proxy='*' python3 tool/push_files.py --message "提交说明" index.html assets/img/home.jpg
  # 删除远端文件：路径前加 '-'（或 --delete 路径）
  no_proxy='*' python3 tool/push_files.py --message "清掉旧图" -assets/img/theme_fresh.jpg

为什么不用 git push：本机到 GitHub 的 git 通道经常 502/超时，
api.github.com 一直是通的；代价是远端 commit 与本地分叉（内容一致）。
"""
import base64
import json
import os
import subprocess
import sys
import time
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


def api(method, path, payload=None, timeout=600, retries=5):
    """20MB 级 blob 会间歇性 401/502，必须重试（实测第 4 次才成功）。"""
    data = json.dumps(payload).encode() if payload is not None else None
    last = ""
    for attempt in range(1, retries + 1):
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
            last = f"HTTP {e.code} on {method} {path}: {body[:300]}"
            if e.code in (401, 403, 429, 500, 502, 503, 504) and attempt < retries:
                wait = min(2 ** attempt, 20)
                print(f"  ! {last} → {wait}s 后重试（{attempt}/{retries}）", flush=True)
                time.sleep(wait)
                continue
            sys.exit(last)
        except (urllib.error.URLError, TimeoutError) as e:
            last = f"网络错误 {e}"
            if attempt < retries:
                time.sleep(min(2 ** attempt, 20))
                continue
            sys.exit(last)
    sys.exit(last)


def main(argv):
    message = "官网更新"
    paths, deletes = [], []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--message":
            i += 1
            message = argv[i]
        elif a == "--delete":
            i += 1
            deletes.append(argv[i])
        elif a.startswith("-") and len(a) > 1 and os.path.exists(os.path.join(ROOT, a[1:])):
            deletes.append(a[1:])
        else:
            paths.append(a)
        i += 1

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

    for rel in deletes:
        print(f"delete {rel}")
        tree_items.append({"path": rel, "mode": "100644", "type": "blob", "sha": None})

    tree = api("POST", "/git/trees", {"base_tree": base_tree, "tree": tree_items})
    commit = api("POST", "/git/commits", {
        "message": message,
        "tree": tree["sha"],
        "parents": [head_sha],
    })
    api("PATCH", f"/git/refs/heads/{BRANCH}", {"sha": commit["sha"]})
    print(f"✓ pushed commit {commit['sha'][:8]}")


if __name__ == "__main__":
    main(sys.argv[1:])
