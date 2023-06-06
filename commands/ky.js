/*
Imprime os detalhes do Torneio 'Fluffy the Cup' mais recent
*/
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder().setName("ky").setDescription("ky"),
  async execute(interaction) {
    await interaction.reply({
      content: `se o kyle tem barra bloqueia low
      é melhor vc bloquear low to falando serio em
      se o kyle ta dando pirueta vc provavelmente consegue dar stuff com um botão pog tipo 5P
      se vc n consegue reagir a pirueta bloqueia high que ele ta menos
      se vc ta em shock a pirueta é plus de qualquer forma ent lmao 
      shock state só influencia memo no foundre arc o resto é completamente fodase 
      se vc n consegue dar whiff punish nos botão toma espaço é melhor doque só ficar com cara de cu
      qualquer coisa só jogar paciente e esperar o mlk se matar 98% da população que joga de ky tem um demonio na cabeça mandando dar coisa unsafe`,
      ephemeral: false,
    });
  },
};
