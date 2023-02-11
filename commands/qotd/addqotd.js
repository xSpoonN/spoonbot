cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "addqotd",
  description: "Adds a QOTD.",
  arguments: "(content) [<attach an image>]",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args2 = message.content.split(/\s(.+)/)[1];

    if (cfigs["disable_addqotd"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (args == null) return message.channel.send("You must provide a Question of the Day to add!");
    fs.appendFile('qotd.txt', "\n" + args2, err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    var attachment = message.attachments;
    fs.appendFile('qotdimg.txt', "\n", err => { if (err)  {console.error(err); return message.channel.send("An Error Occured! (image push)");}})
    if (attachment.array()[0] != null) {
      fs.appendFile('qotdimg.txt', attachment.array()[0].url.replace("\n",""), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured! (image push)");}})
    }
    if (attachment.array()[0] != null) message.channel.send(attachment.array()[0]);
    var data = fs.readFileSync('qotd.txt', 'UTF-8').split(/\r?\n/);
    return message.channel.send("New Question of the Day: \"" + args2 + "\" added at index " + data.length + "!");
  }
}
