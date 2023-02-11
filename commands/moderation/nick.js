cfigs = require("../../config.json");

module.exports = {
  name: "nick",
  description: "Modifies the nickname of the specified user.",
  arguments: "(user) (name)",
  permissions: "Manage Nicknames",
  cooldown: 1,
  execute(message, args) {

    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args3 = message.content.split(' ').slice(2).join(" ");

    if (cfigs["disable_nick"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_NICKNAMES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (!firstMention) return message.channel.send("You must specify a user.");
    if (message.member.roles.highest.position < firstMember.roles.highest.position) return message.channel.send("You can't nick someone higher than you!");
    if (!args3) return message.channel.send("You must specify a name.");
    message.guild.member(firstMention).setNickname(args3)
      .then(message.channel.send("Changed " + firstMember.displayName + "'s nickname to " + args3))
      .catch(e => { return message.channel.send("An Error Occured! I might not permissions to do that.")});
  }
}
