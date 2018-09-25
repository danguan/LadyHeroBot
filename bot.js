const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const { handleSticker } = require('./services/sticker.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.equals(client.user)) {
    var msg = message.content;

    if (msg.substring(0, 8).toLowerCase() === 'sticker!') {
      let stickerMsg = handleSticker(message);
      message.channel.send(stickerMsg);
    }
  }
});

client.login(auth.token);
