const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(mensagem) {
    if (mensagem.author.id === "158000799673221121") {
      const reactionEmoji = mensagem.guild.emojis.cache.find(
        (emoji) => emoji.name === "fluffy"
      );

      //   if (mensagem.content.includes("trigger")) {
      //     mensagem.reply("teste!").then(/* ... */).catch(console.error);
      //     mensagem.react(reactionEmoji).then().catch(console.error);
      //     return;
      //   }
      if (mensagem.content.includes("ky")) {
        if (Math.random() <= 0.01) {
          mensagem
            .reply("ky é muito based vdd")
            .then(/* ... */)
            .catch(console.error);
          //   mensagem.react(reactionEmoji).then().catch(console.error);
          return;
        }
      }
    }
  },
};
