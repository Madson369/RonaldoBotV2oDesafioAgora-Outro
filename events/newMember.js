const { Events } = require("discord.js");

const channelId = "701571020942868581";
const rulesChannel = "701571021198590054";
const rolesChannel = "701571021198590055";

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  execute(info) {
    const message = `Teste teste teste <@${
      info.user.id
    }> se liga nas regras ${info.guild.channels.cache
      .get(rulesChannel)
      .toString()} e pega os cargo la no ${info.guild.channels.cache
      .get(rolesChannel)
      .toString()}
    `;

    const channel = info.guild.channels.cache.get(channelId);
    channel.send(message);
  },
};
