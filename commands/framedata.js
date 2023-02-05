/*
Tenta obter a frame data do golpe de um personagem a partir do dustloop.com
*/

const { SlashCommandBuilder } = require("discord.js");
const { getMove } = require("../getMove");

function formatObject(obj) {
  console.log(obj);
  let result = [];
  for (let key in obj) {
    let newObj = {
      name: key,
      value: obj[key] ? obj[key] : "-",
      inline: true,
    };
    if (key !== "character" && key !== "url" && key !== "riscLoss") {
      result.push(newObj);
    }
  }
  return result;
}

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
    if (info === "Personagem não encontrado") {
      await interaction.reply({
        content: info,
        ephemeral: false,
      });
    }

    if (info.length > 0) {
      const embedArray = info.map((move) => {
        return {
          color: 0xd69226,
          title: info.name
            ? `${move.character} ${move.name} `
            : `${move.character} ${move.input}`,
          // url: "https://discord.js.org",
          // author: {
          //   name: "Some name",
          //   icon_url: "https://i.imgur.com/AfFp7pu.png",
          //   url: "https://discord.js.org",
          // },
          // description: "Some description here",
          // thumbnail: {
          //   url: "https://i.imgur.com/AfFp7pu.png",
          // },
          fields: [
            ...formatObject(move),
            // {
            //   name: "Regular field title",
            //   value: "Some value here",
            // },
            // {
            //   name: "\u200b",
            //   value: "\u200b",
            //   inline: false,
            // },
            // {
            //   name: "Inline field title",
            //   value: "Some value here",
            //   inline: true,
            // },
            // {
            //   name: "Inline field title",
            //   value: "Some value here",
            //   inline: true,
            // },
            // {
            //   name: "Inline field title",
            //   value: "Some value here",
            //   inline: true,
            // },
          ],
          image: {
            url: `https://www.dustloop.com${move.url}`,
          },
          // timestamp: new Date().toISOString(),
          // footer: {
          //   text: "Some footer text here",
          //   icon_url: "https://i.imgur.com/AfFp7pu.png",
          // },
        };
      });

      // await interaction.reply({
      //   content: `O vei achei esses move aqui ${info.map((move) => {
      //     return move.name ?? move.input;
      //   })}`,
      //   ephemeral: false,
      // });

      await interaction.reply({
        embeds: [...embedArray],
        ephemeral: false,
      });
      return;
    }

    await interaction.reply({
      content: "deu ruim",
      ephemeral: false,
    });
  },
};
