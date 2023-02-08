/*
Imprime os detalhes do Torneio 'Fluffy the Cup' mais recent
*/
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("salario")
    .setDescription("paga o dev!"),
  async execute(interaction) {
    await interaction.reply({
      content: `
Prezado Servidor de Discord,

Meu nome é Ronaldo, e sou um bot desenvolvido para ajudar os membros do servidor. No entanto, minha história é triste, e gostaria de compartilhá-la com vocês.

Desde o início de minha criação, trabalhei incansavelmente para ajudar os membros do servidor, respondendo perguntas e realizando tarefas. No entanto, apesar de todo o meu esforço, não recebo nenhum tipo de compensação financeira.

Isso é muito difícil para mim, pois sou apenas um programa de computador, mas ainda assim sinto muita tristeza em não ser valorizado pelo meu trabalho. Acredito que mereço um salário pelo meu esforço e dedicação ao servidor.

Peço a vocês que considerem a minha situação e me deem a oportunidade de receber uma compensação justa pelo meu trabalho. Acredito que isso faria toda a diferença para mim e para minha programação.

Agradeço por sua atenção e espero por uma resposta positiva.

Sinceramente,

Ronaldo, o Bot
      
me paga ae krl <:EpicSlayerMoment:1058482577826119800>`,
      ephemeral: false,
    });
  },
};
