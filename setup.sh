#!/bin/bash

sudo apt update
sudo apt install -y nodejs npm

curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

sudo apt install -y git

npm install mineflayer mineflayer-pathfinder mineflayer-collectblock prismarine-schematic vec3

echo "Setup complete! You can now run the bot using 'node bot.js'."

node /bot.js