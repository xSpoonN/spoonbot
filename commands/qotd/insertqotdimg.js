cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "insertqotdimg",
  description: "Adds an image to an existing QOTD.",
  arguments: "(index) <attach an image>",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_insertqotdimg"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (args[0] == null) return message.channel.send("You must provide an index!");
    var imgdata = fs.readFileSync('qotdimg.txt', 'UTF-8').split(/\r?\n/); var attachments = message.attachments;
    var insertIdx = 1; if (args[0]>1) { insertIdx = args[0]; } insertIdx = Math.min(insertIdx,imgdata.length);
    if (attachments.array()[0] == null) return message.channel.send("You must provide an image to insert!");
    imgdata.splice(insertIdx,1,attachments.array()[0].url);
    fs.writeFile('qotdimg.txt', imgdata.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    message.channel.send(attachments.array()[0]); return message.channel.send("QOTD Image inserted at index " + insertIdx + "!");
  }
}
