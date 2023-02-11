cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "delqotd",
  description: "Deletes a QOTD.",
  arguments: "(index)",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_delqotd"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (args[0] == null) return message.channel.send("You must provide an index!");
    var data = fs.readFileSync('qotd.txt', 'UTF-8').split(/\r?\n/); var temp = data.splice(args[0],1);
    var imgdata = fs.readFileSync('qotdimg.txt', 'UTF-8').split(/\r?\n/); var temp2 = imgdata.splice(args[0],1);
    fs.writeFile('qotd.txt', data.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    fs.writeFile('qotdimg.txt', imgdata.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");} })
    if (temp2.length != 0) message.channel.send(temp2); return message.channel.send("Question of the Day: \"" + temp + "\" deleted!");
  }
}
