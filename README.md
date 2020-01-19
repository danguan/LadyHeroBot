# LadyHeroBot Info

Discord bot for Lady_Hero's Discord channel, used for testing Final Fantasy Brave Exvius-themed stickers.

Invite URL: https://discord.gg/ahVvx6r

All resources belong to LadyHero - [Reddit](https://www.reddit.com/user/lady_hero) | [Twitch](https://www.twitch.tv/ladyxhero) | [RedBubble](https://www.redbubble.com/people/ladyhero?asc=u) | [Patreon](https://www.patreon.com/ladyhero)

---

## Current Functionality

#### Commands (All commands are case-insensitive):

- Sticker![sticker] or sticker![sticker] → Posts a sticker to the channel
- sticker!help → See usage of sticker! commands as well as a list of all available stickers
- Role![role] or role![role] → Assigns the specified role to you
- role!help → See usage of role! commands as well as a list of all available roles
- role!remove[age|pronoun|color|job|stream] → Removes specified role type from you

#### Example Usage:

- Sticker!NoisesIntensifies
- sticker!carry
- sticker!rainbowplease
- role!fighter
- role!removecolor

---

## Development Instructions

Pre-requisite: node.js and npm must be installed

1. Create auth.json file in root dir containing Discord bot token with the format:
```
{
    "token": "<TOKEN-HERE>"
}
```
2. Run `npm install`
3. Run `node bot.js` to start bot

Optional: Install [pm2](https://pm2.keymetrics.io/) to manage bot.js process, i.e. `pm2 start bot.js`
