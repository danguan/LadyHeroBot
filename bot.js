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
    const prefix = msg.substring(0, msg.indexOf('!'));
    const suffix = msg.substring(msg.indexOf('!') + 1).toLowerCase();

    if (prefix === 'sticker') {
      let stickerMsg = handleSticker(suffix);
      message.channel.send(stickerMsg);
    } else if (prefix === 'role') {
      handleRole(suffix, member, message.guild.roles)
        .then(roleMsg => {
          message.channel.send(roleMsg);
        })
        .catch(() => {
          console.error('Invalid role specified');
        });
    }
  }
});

client.login(auth.token);
