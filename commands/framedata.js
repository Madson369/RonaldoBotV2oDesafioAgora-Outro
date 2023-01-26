/*
Tenta obter a frame data do golpe de um personagem a partir do dustloop.com
*/

const { SlashCommandBuilder } = require("discord.js");
const { getMove } = require("../getMove");

function formatObject(obj) {
  let result = [];
  for (let key in obj) {
    let newObj = {
      name: key,
      value: obj[key] ? obj[key] : "-",
      inline: true,
    };
    if (key !== "character") {
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
      const exampleEmbed = {
        color: 0x0099ff,
        title: info.name
          ? `${info[0].character} ${info[0].name} `
          : `${info[0].character} ${info[0].input}`,
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
          ...formatObject(info[0]),
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
          url: "https://i.imgur.com/AfFp7pu.png",
        },
        // timestamp: new Date().toISOString(),
        // footer: {
        //   text: "Some footer text here",
        //   icon_url: "https://i.imgur.com/AfFp7pu.png",
        // },
      };

      await interaction.reply({
        embeds: [exampleEmbed],
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
