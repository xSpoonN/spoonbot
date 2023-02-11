cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "insertqotd",
  description: "Insertqotds a QOTD at a set index.",
  arguments: "(index) [<attach an image>]",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args3 = message.content.split(' ').slice(2).join(" ");

    if (cfigs["disable_insertqotd"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (args[0] == null) return message.channel.send("You must provide an index!");
    if (args[1] == null) return message.channel.send("You must provide a Question of the Day!");
    var imgdata = fs.readFileSync('qotdimg.txt', 'UTF-8').split(/\r?\n/);
    var attachments = message.attachments;
    var data = fs.readFileSync('qotd.txt', 'UTF-8').split(/\r?\n/); var insertIdx = 1; if (args[0]>1) {insertIdx = args[0];}
    insertIdx = Math.min(insertIdx,data.length); data.splice(insertIdx,0,args3);
    if (attachments.array()[0] != null) imgdata.splice(insertIdx,0,attachments.array()[0].url); else imgdata.splice(insertIdx,0,"");
    fs.writeFile('qotd.txt', data.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    fs.writeFile('qotdimg.txt', imgdata.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    if (attachments.array()[0] != null) message.channel.send(attachments.array()[0]);
    return message.channel.send("Question of the Day: \"" + args3 + "\" inserted at index " + insertIdx + "!");
  }
}
