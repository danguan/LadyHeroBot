const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');
var images = require('./assets/images.json');
var { handleSticker } = require('./services/sticker.js');

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
