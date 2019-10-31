const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const { handleSticker } = require('./src/services/sticker.js');
const { handleRole } = require('./src/services/role.js');
const {
  handleTreat,
  handleAnswer,
  handleInfo,
  handleIntro,
  handleFinished
} = require('./src/services/halloween2019.js');
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
    const msg = message.content.toLowerCase();

    logTo('dm.log', msg, message.author.username);

    if (msg.startsWith('!2019 treat')) {
      const suffix = msg.split('!2019 treat')[1];
      handleTreat(suffix, message.author.id)
        .then(treatMsg => {
          message.channel.send(treatMsg);
        })
        .catch(err => {
          console.error(err);
          console.error('Invalid treat specified');
        });
    } else if (msg.startsWith('!answer ')) {
      const suffix = msg.split('!answer ')[1];
      handleAnswer(suffix, message.author.id)
        .then(answerMsg => {
          message.channel.send(answerMsg);

          handleFinished(message.author.id)
            .then(finishMsg => {
              const candyPath = './assets/candy.png';
              const candy = new Discord.Attachment(candyPath);
              message.channel.send(candy);
              message.channel.send(finishMsg);
            })
            .catch(err => {
              console.error(err);
              console.error('Not yet finished with treat');
            });
        })
        .catch(err => {
          console.error(err);
          console.error('Invalid answer specified');
        });
    } else if (msg === '!info') {
      handleInfo(message.author.id)
        .then(dmInfoMsg => {
          message.channel.send(dmInfoMsg);
        })
        .catch(err => {
          console.error(err);
          console.error('Error occurred while sending DM info');
        });
    }
  }
}

// Current Text message format: "prefix!suffix"
function handleTextMessage(message) {
  if (!message.author.equals(client.user)) {
    const msg = message.content.toLowerCase();
    const member = message.member;
    const prefix = msg.substring(0, msg.indexOf('!'));
    const suffix = msg.substring(msg.indexOf('!') + 1);

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
    } else if (msg === '!halloween2019') {
      handleIntro(message.author.id)
        .then(dmIntroMsg => {
          message.author.send(dmIntroMsg);
        })
        .catch(err => {
          console.error(err);
          console.error(
            'Error occurred while sending DM intro for Halloween2019'
          );
        });
    }
  }
}
