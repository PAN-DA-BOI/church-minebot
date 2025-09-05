#!/bin/bash

# Update and install Node.js
sudo apt update
sudo apt install -y nodejs npm

# Install the latest stable version of Node.js (if the default is too old)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Install git (if not already installed)
sudo apt install -y git


# Install dependencies
npm install mineflayer mineflayer-pathfinder mineflayer-collectblock prismarine-schematic vec3

echo "Setup complete! You can now run the bot using 'node bot.js'."
