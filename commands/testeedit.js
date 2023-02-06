/*
Tenta obter a frame data do golpe de um personagem a partir do dustloop.com
*/

const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const util = require("util");

// const readFile = util.promisify(fs.readFile);

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("testeedit")
    .setDescription("to testando o edit de texto calmae!")
    .addStringOption((option) =>
      option.setName("texto").setDescription("lança o verbo").setRequired(true)
    ),
  // .addStringOption((option) =>
  //   option
  //     .setName("category")
  //     .setDescription("The gif category")
  //     .setRequired(true)
  //     .addChoices(
  //       { name: "Funny", value: "gif_funny" },
  //       { name: "Meme", value: "gif_meme" },
  //       { name: "Movie", value: "gif_movie" }
  //     )
  // )
  async execute(interaction) {
    let roleArray = [];
    for (let item of interaction.member.roles.cache) {
      roleArray.push(item[0]);
    }

    for (let item of interaction.member.roles.cache) {
      console.log(item);
    }

    const permissionBool = roleArray.some((role) => {
      return role === "807823269306695680" || role === "1065679711931482112";
    });

    // console.log(interaction.member.roles.cache.has("1065679711931482112"));
    if (permissionBool) {
      const texto = interaction.options.getString("texto");
      fs.readFile("data.json", async (err, data) => {
        if (err) {
          await interaction.reply({
            content: "deu ruim",
            ephemeral: false,
          });
        }
        let fileData = JSON.parse(data);
        // Modify the fileData property
        fileData.fluffy = `${texto}`;
        fs.writeFile("data.json", JSON.stringify(fileData), async (err) => {
          await interaction.reply({
            content: "deu ruim",
            ephemeral: false,
          });
        });
      });

      await interaction.reply({
        content: "deu bom",
        ephemeral: false,
      });
      return;
    } else {
      await interaction.reply({
        content: "n tem permissao",
        ephemeral: false,
      });
      return;
    }
  },
};
