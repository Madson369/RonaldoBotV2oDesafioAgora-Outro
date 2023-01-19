const { SlashCommandBuilder } = require("discord.js");
const mensagem = `O Fluffy the Cup , nosso torneio de Guilty Gear - STRIVE -  para iniciantes, mais recente foi/será em 20/01 às 20:00 (Check in 19:00). 
Para se inscrever mande seu perfil do challonge e rating update para algum organizador do torneio para se inscrever. Você receberá um convite no site para entrar no torneio. As regras estão na página do torneio: https://challonge.com/pt_BR/bm21o4y
`;

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("fluffy")
    .setDescription("Detalhes sobre torneio!"),
  async execute(interaction) {
    await interaction.reply({
      content: mensagem,
      ephemeral: false,
    });
  },
};
