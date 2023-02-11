cfigs = require("../../config.json");

module.exports = {
  name: "sendqotds",
  description: "Sends the QOTD file.",
  arguments: "None",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_sendqotds"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    return message.channel.send("Current QOTD File: ", {files: ["./qotd.txt"]});
  }
}
