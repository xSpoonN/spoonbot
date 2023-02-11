cfigs = require("../../config.json");
const fs = require("fs");

function pushDataToJSON(configName, editedmessage) {
  cfigs[configName] = {
    value: editedmessage
  }
  fs.writeFile("./config.json", JSON.stringify(cfigs, null, 4), err => {
    if (err) throw err;
  });
  return cfigs[configName].value;
}

module.exports = {
  name: "setqotdchannel",
  description: "Sets the channel to send a QOTD to.",
  arguments: "(channel id)",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (args[0] == null) return message.channel.send("You must provide a channel id!");
    if (client.channels.cache.get(args[0]) == null) return message.channel.send("Invalid channel id!");
    try {pushDataToJSON("qotdchannel", args[0]);} catch(error) {console.log(error);}
    message.channel.send("Successfully set QOTD channel to: " + args[0]);
  }
}
