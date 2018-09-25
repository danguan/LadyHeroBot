const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const images = require('./assets/images.json');
const { handleSticker } = require('./services/sticker.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.equals(client.user)) {
    var msg = message.content;

    if (msg.substring(0, 8).toLowerCase() === 'sticker!') {
      handleSticker(msg);
    }
  }
});

client.login(auth.token);
