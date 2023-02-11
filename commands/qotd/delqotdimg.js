cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "delqotdimg",
  description: "Deletes an image from a QOTD",
  arguments: "(index)",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_delqotdimg"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (args[0] == null) return message.channel.send("You must provide an index!");
    var imgdata = fs.readFileSync('qotdimg.txt', 'UTF-8').split(/\r?\n/); var insertIdx = 1;
    if (args[0]>1) { insertIdx = args[0]; } insertIdx = Math.min(insertIdx,imgdata.length); var temp = imgdata.splice(insertIdx,1,"");
    fs.writeFile('qotdimg.txt', imgdata.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    message.channel.send(temp); return message.channel.send("QOTD Image deleted at index " + insertIdx + "!");
  }
}
