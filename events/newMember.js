const { Events } = require("discord.js");

const messageChannel = "810605680498311208";
const rulesChannel = "807419813357420555";
const rolesChannel = "1006575997900034098";

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

    const channel = info.guild.channels.cache.get(messageChannel);
    channel.send(message);
  },
};
