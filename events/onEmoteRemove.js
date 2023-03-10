const { Events } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageReactionRemove,
  once: false,
  async execute(reaction, user) {
    const { message } = reaction;
    if (message.author.id === user.id) return;
    if (reaction.emoji.name !== "💀") return;
    const starChannel = message.guild.channels.cache.get("1083854425296207872");
    if (!starChannel) return message.channel.send(`tem canal n brother.`);

    const fetch = await starChannel.messages.fetch({ limit: 100 });

    const stars = fetch.find((m) => {
      return (
        m?.embeds[0]?.footer?.text.startsWith("💀") &&
        m?.embeds[0]?.footer?.text.endsWith(message.id)
      );
    });
    if (stars) {
      const star = /^\💀\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars.embeds[0].footer.text
      );
      const foundStar = stars.embeds[0];
      let image = "";
      const attachments = [...message.attachments];
      if (attachments[0] && attachments[0][1] && attachments[0][1].url) {
        image = attachments[0][1].url;
      }
      const embed = {
        color: foundStar.color,
        description: foundStar.description,
        image: {
          url: foundStar?.image?.url ?? "",
        },
        author: foundStar.author,
        footer: { text: `💀 ${parseInt(star[1]) - 1} | ${message.id}` },
      };
      const starMsg = await starChannel.messages.fetch(stars.id);
      console.log("aqui");
      await starMsg.edit({ embeds: [embed] });
      if (parseInt(star[1]) - 1 < 5)
        return setTimeout(() => starMsg.delete(), 1000);
    }
  },
};
