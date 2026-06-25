#!/bin/zsh
cd "$(dirname "$0")"

NODE="${NODE:-$(command -v node)}"

if [[ -z "$NODE" ]]; then
  echo "未找到 Node.js。请先安装 Node.js 18 或更高版本。"
  read -r "?按回车键关闭..."
  exit 1
fi

echo "Schooltopia 正在启动..."
echo "游戏：http://127.0.0.1:4180"
echo "公开玩家入口：http://127.0.0.1:4181"
echo "后台：http://127.0.0.1:4180/admin.html"
echo "关闭这个窗口会停止本地后台。"

"$NODE" server.js &
SERVER_PID=$!
"$NODE" public-server.js &
PUBLIC_PID=$!
trap 'kill "$SERVER_PID" "$PUBLIC_PID" 2>/dev/null' EXIT INT TERM
sleep 1
open "http://127.0.0.1:4180"
wait "$SERVER_PID"
