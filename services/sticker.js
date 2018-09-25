function handleSticker(msg) {
  var suffix = msg.substring(8).toLowerCase();

  if (images.hasOwnProperty(suffix)) {
    var stickerPath = '../assets/' + images[suffix];
    var sticker = new Discord.Attachment(stickerPath);

    message.channel.send(sticker);
  } else if (suffix === 'help') {
    var helpMsg =
      'Sticker![sticker] or sticker![sticker]  →  Posts a sticker to the channel (case insensitive)\n\n' +
      'Type Sticker!help to get a list of all available stickers\n\n' +
      'Available stickers:\n';

    for (var stickerName in images) {
      helpMsg += stickerName + ', ';
    }
    helpMsg = helpMsg.substring(0, helpMsg.length - 2);

    message.channel.send(helpMsg);
  }
}

module.exports = {
  handleSticker
} 