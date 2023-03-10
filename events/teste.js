const { Events } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,
  once: false,
  async execute(reaction, user) {
    const message = reaction.message;
    if (reaction.emoji.name !== "MyHonestReaction") return;
    // if (message.author.id === user.id)
    //   return message.channel.send(
    //     `${user}, deu react na propria mensagem lmao.`
    //   );
    if (message.author.bot) {
      return message.channel.send(`${user}, ta dando react em bot pq parça.`);
    }
    // const { starboardChannel } = reaction.client.settings.get(message.guild.id);
    const starChannel = message.guild.channels.cache.get("1067058350287753278");

    if (!starChannel) return message.channel.send(`achei o canal n.`);

    //----------------------------------

    const fetch = await starChannel.messages.fetch({ limit: 100 });

    // We check the messages within the fetch object to see if the message that was reacted to is already a message in the starboard,
    const stars = fetch.find((m) => {
      m.embeds &&
        m.embeds[0] &&
        m.embeds[0].footer &&
        m.embeds[0].footer.text.startsWith("MyHonestReaction") &&
        m.embeds[0].footer.text.endsWith(message.id);
    });
    // Now we setup an if statement for if the message is found within the starboard.
    if (stars) {
      // Regex to check how many stars the embed has.
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars.embeds[0].footer.text
      );
      // A variable that allows us to use the color of the pre-existing embed.
      const foundStar = stars.embeds[0];
      // We use the this.extension function to see if there is anything attached to the message.
      const image =
        message.attachments.size > 0
          ? await this.extension(reaction, message.attachments.array()[0].url)
          : "";
      const embed = new MessageEmbed()
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`)
        .setImage(image);
      // We fetch the ID of the message already on the starboard.
      const starMsg = await starChannel.messages.fetch(stars.id);
      // And now we edit the message with the new embed!
      await starMsg.edit({ embeds: [embed] });
    }
    // Now we use an if statement for if a message isn't found in the starboard for the message.
    if (!stars) {
      // We use the this.extension function to see if there is anything attached to the message.
      let image = "";
      const attachments = [...message.attachments];
      if (attachments[0][1].url) {
        image = attachments[0][1].url;
      }

      console.log("imageimage.png", image);

      const embed = new EmbedBuilder()
        // // We set the color to a nice yellow here.
        .setColor(15844367)
        // // Here we use cleanContent, which replaces all mentions in the message with their
        // // equivalent text. For example, an @everyone ping will just display as @everyone, without tagging you!
        // // At the date of this edit (09/06/18) embeds do not mention yet.
        // // But nothing is stopping Discord from enabling mentions from embeds in a future update.
        .setDescription(message.cleanContent ?? " ")
        // .setAuthor(message.author.tag, message.author.displayAvatarURL);
        // .setAuthor({
        //   name: message.author.username,
        //   iconURL: message.author.avatarURL(),
        //   // url: "https://discord.js.org",
        // })

        .setTimestamp(new Date())
        // .setFooter(`⭐ 1 | ${message.id}`)
        .setImage(image);

      await starChannel.send({ embeds: [embed] });
    }
  },
};
