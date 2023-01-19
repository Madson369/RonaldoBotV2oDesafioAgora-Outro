const { SlashCommandBuilder } = require("discord.js");
const messageChannel = "810605680498311208";
const rulesChannel = "807419813357420555";
const rolesChannel = "1006575997900034098";

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder().setName("teste").setDescription("teste!"),
  async execute(interaction) {
    // const fluffy = interaction.emojis.cache.get("1065694132846215259");

    const message = `<:fluffy:914732955702800384> <@${
      interaction.user.id
    }> <:fluffy:914732955702800384> muito boas-vindas ao server, teste lembre-se de checkar as ${interaction.guild.channels.cache
      .get(rulesChannel)
      .toString()} e escolher seus ${interaction.guild.channels.cache
      .get(rolesChannel)
      .toString()}
        `;

    const teste = "";

    await interaction.reply({ content: message, ephemeral: false });
  },
};
