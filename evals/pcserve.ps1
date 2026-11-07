# Two slots of 32K each (the NAS budget), localhost only; reached from the Mac through an SSH tunnel.
Set-Location C:\Users\leoca\passport-evals
$exe = (Get-ChildItem llama -Recurse -Filter llama-server.exe | Select-Object -First 1).FullName
& $exe -m models\Qwen3.5-4B-Q4_K_M.gguf --alias qwen3.5-4b --host 127.0.0.1 --port 8080 --jinja -ngl 99 -c 65536 -np 2 --temp 0.6 --top-p 0.95 --top-k 20 --min-p 0 --metrics --chat-template-file qwen35-latesystem.jinja 2>&1 | Tee-Object -FilePath server.log
