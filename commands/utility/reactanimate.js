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
  name: "reactanimate",
  description: "Reacts to a user's messages with the specified emoji. Does not use Nitro for animated emojis. ",
  arguments: "(emoji name)",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args3 = message.content.split(' ').slice(2).join(" ");

    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!")
    if (args[0] == undefined) {
      return message.reply("You must specify a Member and an Emoji.");
    }
    if (!firstMention) return message.reply('You must specify a member.');
    if (!args3 || args3 == 0) {
      try {
        var tempNamespace = {};
        tempNamespace[firstMention.id] = message.guild.roles.cache.find(role => role.name === pushDataToJSON(firstMention.id, 0));
        message.channel.send("User " + firstMember.displayName + "'s messages will no longer be reacted to. ");
      } catch(error) {
        console.error(error);
        message.channel.send("An Error Occured!");
      }
    }
    try {
      var tempNamespace = {};
      const emoji = client.emojis.cache.find(emoji => emoji.name === args3);
      if (args3 != 0) {
        tempNamespace[firstMention.id] = message.guild.roles.cache.find(role => role.name === pushDataToJSON(firstMention.id, emoji.toString()));
        message.channel.send("User " + firstMember.displayName + "'s messages will now be reacted to with " + emoji.toString());
      }
    } catch(error) {
      console.error(error);
      message.channel.send("An Error Occured!");
    }
  }
}
