cfigs = require("../../config.json");
const prefix = cfigs["prefix"].value;
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
  name: "config",
  description: "Lists or changes configuration options server-wide.",
  arguments: "(field) (value)",
  permissions: "Administrator",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;

    if (!guildMember.hasPermission('ADMINISTRATOR') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (!args[0]) {
      message.channel.send({embed: {
      color: 3447003,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.avatarURL
      },
      title: "Config Fields",
      description: "**" + prefix + "config (field) (value)**",
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.avatarURL,
        text: "© Spoonbot"
      },
      fields: [
        {
          name: "peasant",
          value: "This role is silenced, assuming Spoonbot has required permissions. \n Currently set to " + message.cfigs["peasant"].value
        },
        {
          name: "maximum_google_requests",
          value: "Maximum number of google api requests allowed in commands. \n Currently set to " + message.cfigs["maximum_google_requests"].value
        },
        {
          name: "prefix",
          value: "Prefix the bot uses. \n Currently set to " + message.cfigs["prefix"].value
        },
        {
          name: "disable_*command*",
          value: "Disables a command. "
        }
      ]
      }});
    } else {
      const configAspect = args[0];
      const configValue = args[1];
      if (configValue == null) return message.reply('You must specify a value.');
      try {
        var tempNamespace = {};
        editedmessage = message.content.slice(9 + configAspect.length);
        tempNamespace[configAspect] = message.guild.roles.cache.find(role => role.name === pushDataToJSON(configAspect, editedmessage));
        message.channel.send("Config Field " + configAspect + " has been set to " + editedmessage + ".");
      } catch {
        message.channel.send("Invalid Config Field");
      }
    }
  }
}
