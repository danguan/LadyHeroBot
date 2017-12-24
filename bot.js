const Discord = require("discord.js");
const client = new Discord.Client();
var auth = require('./auth.json')
var images = require('./assets/images.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    var prefix = "sticker!";
    var msg = message.content;

    if (msg.substring(0, 8) === prefix) {
        var suffix = msg.substring(8);

        if (images.hasOwnProperty(suffix)) {
            message.channel.send(new Discord.Attachment(images[suffix]));
        }
    }
});

client.login(auth.token);