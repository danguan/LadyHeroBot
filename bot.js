const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const { handleSticker } = require('./services/sticker.js');
const { handleRole } = require('./services/selfRoleAdd.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.equals(client.user)) {
    const msg = message.content;
    const prefix = msg.substring(0, msg.indexOf('!'));
    const suffix = msg.substring(msg.indexOf('!') + 1).toLowerCase();

    if (prefix === 'sticker') {
      let stickerMsg = handleSticker(suffix);
      message.channel.send(stickerMsg);
    } else if (prefix === 'role') {
      let roleMsg = handleRole(suffix);
      message.channel.send(roleMsg);
    }
  }
});

client.login(auth.token);
