#!/bin/sh
# Gets github changes and restarts node application
git pull
echo "Got new changes from github!"

if tmux has-session -t nodeserver
then
        tmux kill-session -t nodeserver
        echo "Session killed!"
fi

cd node/src

echo "Starting new session in:"; pwd

tmux new-session -d -s nodeserver
tmux send-keys -t nodeserver "node server.js &" C-m
tmux ls

echo "Started new session!"
