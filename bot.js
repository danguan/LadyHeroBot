const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const { handleSticker } = require('./src/services/sticker.js');
const { handleRole } = require('./src/services/role.js');
const { initDb } = require('./src/database/db.js');
const { logTo } = require('./src/services/log.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  initDb();
});

client.on('message', message => {
  if (message.channel.type === 'dm') {
    handleDmMessage(message);
  } else if (message.channel.type === 'text') {
    handleTextMessage(message);
  }
});

client.on('error', err => {
  console.error(err);
});

client.login(auth.token);

// Current DM message format: "!prefix suffix"
function handleDmMessage(message) {
  if (!message.author.equals(client.user)) {
    const msg = message.content;
    const prefix = msg.substring(0, msg.indexOf(' ')).toLowerCase();
    const suffix = msg.substring(msg.indexOf(' ') + 1).toLowerCase();

    logTo('dm.log', msg, message.author.username);

    if (prefix === '!2019') {
      handleTreat(suffix)
        .then(treatMsg => {
          message.channel.send(treatMsg);
        })
        .catch(err => {
          console.error(err);
          console.error('Invalid treat specified');
        });
    } else if (prefix === '!answer') {
      handleAnswer(suffix)
        .then(answerMsg => {
          message.channel.send(answerMsg);
        })
        .catch(err => {
          console.error(err);
          console.error('Invalid role specified');
        });
    }
  }
}

// Current Text message format: "prefix!suffix"
function handleTextMessage(message) {
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
        .catch(err => {
          console.error(err);
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
}
