cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "listqotds",
  description: "Lists all QOTDs in queue.",
  arguments: "None",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_listqotds"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    var data = fs.readFileSync('./qotd.txt', {encoding:'utf8', flag:'r'}).split(/\r?\n/); var output1 = "**Current QOTDs:**\n";
    for (i = 1; i < data.length; i++) {
      var added = i + ") \"" + data[i] + "\"\n";
      if (output1.length + added.length > 2000) {
        message.channel.send(output1); output1 = "";
      }
      output1 += added;
    }
    if (output1.length != 0) message.channel.send(output1);
  }
}
