const { Events } = require("discord.js");

const channelId = "701571020942868581";
const targetChannel = "701571021198590055";

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  execute(info) {
    console.log("info", info.user);
    const message = `Teste teste teste <@${
      info.user.id
    }> se liga no ${info.guild.channels.cache.get(targetChannel).toString()}`;

    const channel = info.guild.channels.cache.get(channelId);
    channel.send(message);
  },
};
