cfigs = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "pfp",
  description: "Returns the profile picture of you [or the specified user]",
  arguments: "[user]",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_pfp"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (firstMention == null) {
      let embed = new Discord.MessageEmbed().setTitle(guildMember.displayName + "'s Profile Picture").setImage(guildMember.user.avatarURL()).setColor('#873348')
      message.channel.send(embed);
    } else {
      let embed = new Discord.MessageEmbed().setTitle(firstMember.displayName + "'s Profile Picture").setImage(firstMember.user.avatarURL()).setColor('#873348')
      message.channel.send(embed);
    }
  }
}
