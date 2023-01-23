/*
Imprime os detalhes do Torneio 'Fluffy the Cup' mais recent
*/
const { SlashCommandBuilder } = require("discord.js");
const mensagem = `O Fluffy the Cup , nosso torneio de Guilty Gear - STRIVE -  para iniciantes, mais recente foi/será em <t:1674255600:F> (Check in <t:1674252000:t>). 
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
