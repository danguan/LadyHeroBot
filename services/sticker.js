const Discord = require('discord.js');
const images = require('../assets/images.json');

function handleSticker(suffix) {
  // allow alternate spellings of hyou/hyoh
  if (suffix.substring(0, 4) === 'hyoh') {
    suffix = 'hyou' + suffix.substring(4);
  }

  return new Promise((res, rej) => {
    if (images.hasOwnProperty(suffix)) {
      const stickerPath = './assets/' + images[suffix];
      const sticker = new Discord.Attachment(stickerPath);

      res(sticker);
    } else if (suffix === 'help') {
      var helpMsg =
        'Sticker![sticker] or sticker![sticker]  →  Posts a sticker to the channel (case insensitive)\n\n' +
        'Type Sticker!help to get a list of all available stickers\n\n' +
        'Available stickers:\n';

      for (let stickerName in images) {
        helpMsg += stickerName + ', ';
      }
      helpMsg = helpMsg.substring(0, helpMsg.length - 2);

      res(helpMsg);
    } else {
      rej();
    }
  });
}

module.exports = {
  handleSticker
};
