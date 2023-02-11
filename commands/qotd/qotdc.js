cfigs = require("../../config.json");

module.exports = {
  name: "qotdc",
  description: "Sends a custom QOTD immediately",
  arguments: "(content) [<attach an image>]",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_qotdc"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    message.delete(); var titleFinal = ""; var descFinal = "";
    if (args.join(" ").length >= 256) descFinal = "**" + args.join(" ") + "**"; else titleFinal = args.join(" ");
    var attachment = message.attachments;
    if (attachment.array()[0] != null) {
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: "QUESTION OF THE DAY",
          icon_url: message.client.user.avatarURL()
        },
        title: titleFinal,
        description: descFinal,
        timestamp: new Date(),
        image: {
          url: attachment.array()[0].url,
        },
        footer: {
          icon_url: guildMember.user.avatarURL(),
          text: member.username
        }
      }});
    } else {
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
  }
}
