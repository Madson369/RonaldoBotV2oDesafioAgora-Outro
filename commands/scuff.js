const { SlashCommandBuilder } = require("discord.js");

const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("scuff")
    .setDescription("info sobre a scuff!"),
  async execute(interaction) {
    readFile("data.json", "utf8").then(async (res) => {
      let json = JSON.parse(res);
      let text = json.scuff;
      if (!text) {
        json.scuff = "";
        text = "setaram esse texto ainda não usa o /edit";
        fs.writeFile("data.json", JSON.stringify(json), (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
      }
      await interaction.reply({
        content: text,
        ephemeral: false,
      });
    });
  },
};
