const { SlashCommandBuilder } = require("discord.js");

const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("convite")
    .setDescription("ta aqui o contive krai"),
  async execute(interaction) {
    readFile("data.json", "utf8").then(async (res) => {
      const text = JSON.parse(res).convite ?? "";
      await interaction.reply({
        content: text,
        ephemeral: false,
      });
    });
  },
};
