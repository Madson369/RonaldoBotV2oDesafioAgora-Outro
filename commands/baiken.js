/*
Imprime os detalhes do Torneio 'Fluffy the Cup' mais recent
*/
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder().setName("baiken").setDescription("baiken"),
  async execute(interaction) {
    await interaction.reply({
      content: `https://media.discordapp.net/attachments/1031620896298901634/1115489063231836160/169px-GGST_Baiken_236P.png`,
      ephemeral: false,
    });
  },
};
