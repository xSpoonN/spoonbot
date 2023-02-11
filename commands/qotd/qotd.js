cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "qotd",
  description: "Immediately sends the first QOTD in queue.",
  arguments: "None",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_qotd"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    var data = fs.readFileSync('qotd.txt', 'UTF-8').split(/\r?\n/);
    if (data[1] == null) return message.channel.send("<@![Omitted]> <@![Omitted]>");
    message.delete(); var titleFinal = ""; var descFinal = "";
    if (data[1].length >= 256) descFinal = "**" + data[1] + "**"; else titleFinal = data[1];
    var imgdata = fs.readFileSync('qotdimg.txt', 'UTF-8').split(/\r?\n/);
    if (imgdata[1] == null) {
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: "QUESTION OF THE DAY",
          icon_url: message.client.user.avatarURL()
        },
        title: titleFinal,
        description: descFinal,
        timestamp: new Date(),
        footer: {
          icon_url: guildMember.user.avatarURL(),
          text: member.username
        }
      }});
    }
    else message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "QUESTION OF THE DAY",
        icon_url: message.client.user.avatarURL()
      },
      title: titleFinal,
      description: descFinal,
      timestamp: new Date(),
      image: {
        url: imgdata[1],
      },
      footer: {
        icon_url: guildMember.user.avatarURL(),
        text: member.username
      }
    }});
    data.splice(1,1);
    imgdata.splice(1,1);
    fs.writeFile('qotd.txt', data.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");}})
    fs.writeFile('qotdimg.txt', imgdata.join("\n"), err => { if (err)  {console.error(err); return message.channel.send("An Error Occured!");}})
  }
}
