/*
Tenta obter a frame data do golpe de um personagem a partir do dustloop.com
*/

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("!")
    .addStringOption((option) =>
      option.setName("text").setDescription("lança a voz").setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.user.id === "158000799673221121") {
      const text = interaction.options.getString("text");

      await interaction.reply({
        content: text,
        ephemeral: false,
      });
      return;
    }

    await interaction.reply({
      content: "you are not the chosen one",
      ephemeral: false,
    });
  },
};
