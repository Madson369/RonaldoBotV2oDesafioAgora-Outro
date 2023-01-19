const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("torneio")
    .setDescription("Detalhes sobre torneio!"),
  async execute(interaction) {
    await interaction.reply({
      content: "Fluffy confia!",
      ephemeral: false,
    });
  },
};
