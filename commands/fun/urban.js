cfigs = require("../../config.json");
const fs = require("fs");
const urban = require('relevant-urban');
const Discord = require("discord.js");

module.exports = {
  name: "urban",
  description: "Searches the Urban Dictionary for a term.",
  arguments: "(query)",
  permissions: "None",
  cooldown: 1,
  async execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args2 = message.content.split(/\s(.+)/)[1];

    if (cfigs["disable_urban"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!args[0]) return message.channel.send(`Please specify a term.`);
    let res = await urban(args2).catch(e => {
      return message.channel.send('That word was not found.')
    });
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(res.word)
      .setURL(res.urbanURL)
      .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
      .addField('Author', res.author, true)
      .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)
      if (res.tags.length > 0 && res.tags.join(', ').length<1024) {
        embed.addField('Tags', res.tags.join(', '), true)
      }
      message.channel.send(embed);
  }
}
