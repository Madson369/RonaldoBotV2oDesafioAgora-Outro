/*
Tenta obter a frame data do golpe de um personagem a partir do dustloop.com
*/

const { SlashCommandBuilder } = require("discord.js");
const { getMove } = require("../getMove");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("framedata")
    .setDescription("framedata dos boneco pog!")
    .addStringOption((option) =>
      option
        .setName("personagem")
        .setDescription("Escolhe um personagem ae brother")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("move")
        .setDescription("Escolhe um move ae brother")
        .setRequired(true)
    ),

  async execute(interaction) {
    const character = interaction.options.getString("personagem");
    const move = interaction.options.getString("move");
    let info = await getMove(character, move);
    console.log("info: ", info);
    await interaction.reply({
      content: JSON.stringify(info) || "deu ruim",
      ephemeral: false,
    });
  },
};
