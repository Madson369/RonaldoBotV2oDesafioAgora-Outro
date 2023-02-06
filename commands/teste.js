const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder().setName("teste").setDescription("teste!"),
  async execute(interaction) {
    console.log(interaction.member.roles.cache);
    // console.log("interaction", interaction.member);

    fs.readFile("data.json", async (err, data) => {
      if (err) {
        await interaction.reply({
          content: "deu ruim",
          ephemeral: false,
        });
      }
      let fileData = JSON.parse(data);
      // console.log(fileData);
      await interaction.reply({
        content: fileData.fluffy
          ? fileData.fluffy
          : "mensagem padrao ve se isso dae ta certo",
        ephemeral: false,
      });
    });
  },
};
