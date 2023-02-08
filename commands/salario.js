/*
Imprime os detalhes do Torneio 'Fluffy the Cup' mais recent
*/
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("salario")
    .setDescription("paga o dev!"),
  async execute(interaction) {
    await interaction.reply({
      content: `me paga ae krl <:EpicSlayerMoment:1058482577826119800>`,
      ephemeral: false,
    });
  },
};
