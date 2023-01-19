const { Events } = require("discord.js");

const messageChannel = "810605680498311208";
const rulesChannel = "807419813357420555";
const rolesChannel = "1006575997900034098";

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  execute(info) {
    const message = `<:fluffy:914732955702800384> <@${
      info.user.id
    }> <:fluffy:914732955702800384> muito boas-vindas ao server, lembre-se de checkar as ${info.guild.channels.cache
      .get(rulesChannel)
      .toString()} e escolher seus ${info.guild.channels.cache
      .get(rolesChannel)
      .toString()}
    `;

    const channel = info.guild.channels.cache.get(messageChannel);
    channel.send(message);
  },
};
