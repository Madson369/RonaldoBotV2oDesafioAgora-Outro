const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");


//Creates a message embed with a Robo-Ky give, humbbly asking to lab
const labMazeEmbed = new EmbedBuilder()
    .setColor(0x14D514)
    .setAuthor(
        {name: "Maze"}
        )
    .setImage("https://media.tenor.com/pKwRy_WMQXAAAAAd/robo-ky-robo-ky-gym.gif")
    .setTitle("VAI LABBAR!")
    .setDescription("Faz bem para a saúde.")
    .setFooter(
        {text: "Provided by GGSTBR"}
        );

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("labbar")
    .setDescription("O Maze versão bot pede para tu labbar."),
  async execute(interaction) {
    await interaction.reply({ embeds: [labMazeEmbed], ephemeral: false });
  },
};