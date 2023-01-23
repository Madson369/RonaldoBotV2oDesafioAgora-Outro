const { SlashCommandBuilder } = require("discord.js");
const { getMove } = require("../getMove");
const { EmbedBuilder } = require("discord.js");

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("Some title")
  .setURL("https://discord.js.org/")
  .setAuthor({
    name: "Some name",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
    url: "https://discord.js.org",
  })
  .setDescription("Some description here")
  .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true }
  )
  .addFields({
    name: "Inline field title",
    value: "Some value here",
    inline: true,
  })
  .setImage("https://i.imgur.com/AfFp7pu.png")
  .setTimestamp()
  .setFooter({
    text: "Some footer text here",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
  });

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
