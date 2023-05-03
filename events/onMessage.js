const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(mensagem) {
    {
      if (mensagem.content.toLowerCase() === "chat") {
        const number = Math.random();
        if (number <= 0.05) {
          const opcoes = [
            "que foi",
            `"chat isso" "chat aquilo" how about you chat with some bitches huh? que tal em?            `,
            "capivara",
            "porfavor para o downplay",
            "pfvr pede pra dia me pagar to passando fome",
          ];
          const opcaoSelecionada =
            opcoes[Math.floor(Math.random() * opcoes.length)];

          mensagem.reply(opcaoSelecionada).then(/* ... */).catch(console.error);
          //   mensagem.react(reactionEmoji).then().catch(console.error);
          return;
        }
      }
      if (mensagem.content.toLowerCase() === "sabe") {
        const number = Math.random();
        if (number <= 0.1) {
          mensagem.reply("sei").then(/* ... */).catch(console.error);
          //   mensagem.react(reactionEmoji).then().catch(console.error);
          return;
        }
      }
      if (mensagem.content.includes("ky")) {
        if (Math.random() <= 0.04) {
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
