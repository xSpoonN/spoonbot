cfigs = require("../../config.json");

module.exports = {
  name: "poll",
  description: "Sends a yes/no poll.",
  arguments: "(message)",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_poll"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    const msg222 = args.join(" ");
    message.delete();
    message.channel.send("**Poll**: " + msg222).then(async function (message) {
      await message.react("👍")
      await message.react("😶")
      message.react("👎");
    }).catch(function() {
      console.error;
    })
  }
}
