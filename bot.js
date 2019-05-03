const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const { handleSticker } = require('./services/sticker.js');
const { handleRole } = require('./services/role.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.equals(client.user)) {
    const msg = message.content;
    const member = message.member;
    const prefix = msg.substring(0, msg.indexOf('!')).toLowerCase();
    const suffix = msg.substring(msg.indexOf('!') + 1).toLowerCase();

    if (prefix === 'sticker') {
      handleSticker(suffix)
        .then(stickerMsg => {
          message.channel.send(stickerMsg);
        })
        .catch(() => {
          console.error('Invalid sticker specified');
        });
    } else if (prefix === 'role') {
      handleRole(suffix, member, message.guild.roles)
        .then(roleMsg => {
          message.channel.send(roleMsg);
        })
        .catch(err => {
          console.error(err);
          console.error('Invalid role specified');
        });
    }
  }
});

client.on('error', err => {
  console.error(err);
});

client.login(auth.token);
