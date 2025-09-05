const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const collectBlock = require('mineflayer-collectblock');
const schematic = require('prismarine-schematic');
const Vec3 = require('vec3');

// Load your schematic file
const schem = schematic(new Uint8Array(require('fs').readFileSync('church.schem')));

// Define your quarry area (adjust these coordinates)
const quarryStart = new Vec3(-10, 60, -10); // Example: Start corner of the quarry
const quarryEnd = new Vec3(10, 50, 10);     // Example: End corner of the quarry

// Define the starting position for the schematic (your specified coordinates)
const buildStart = new Vec3(-1778, 90, -571); // Start corner of the build area
const buildEnd = new Vec3(-1697, 154, -543);   // End corner of the build area

// Connect to your Minecraft server
const bot = mineflayer.createBot({
  host: 'winslow.plus', // or your server IP
  port: 25565,      // default Minecraft port
  username: 'BuilderBot',
});

// Load plugins
bot.loadPlugin(pathfinder);
bot.loadPlugin(collectBlock);

// Wait for the bot to spawn
bot.on('spawn', () => {
  console.log('Bot spawned!');

  // Initialize pathfinder movements
  const defaultMove = new Movements(bot);
  bot.pathfinder.setMovements(defaultMove);

  // Start mining deepslate from the quarry
  mineDeepslate(bot, quarryStart, quarryEnd);
});

// Function to mine deepslate from the quarry
function mineDeepslate(bot, start, end) {
  bot.collectBlock.collect(
    { point: start, blockType: 'deepslate', maxDistance: 128, world: bot.world },
    (err) => {
      if (err) {
        console.error('Error mining deepslate:', err);
        return;
      }
      console.log('Finished mining deepslate!');
      // After mining, build the schematic
      buildSchematic(bot, schem, buildStart);
    }
  );
}

// Function to build the schematic at the specified location
function buildSchematic(bot, schem, startPos) {
  for (let x = 0; x < schem.width; x++) {
    for (let y = 0; y < schem.height; y++) {
      for (let z = 0; z < schem.length; z++) {
        const block = schem.getBlock(new Vec3(x, y, z));
        if (block.type !== 0) { // Skip air blocks
          const pos = new Vec3(
            startPos.x + x,
            startPos.y + y,
            startPos.z + z
          );
          bot.chat(`Placing block at ${pos}`);
          bot.setBlock(block, pos);
        }
      }
    }
  }
  console.log('Finished building the schematic!');
}
