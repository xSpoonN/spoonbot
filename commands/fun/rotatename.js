cfigs = require("../../config.json");

module.exports = {
  name: "rotatename",
  description: "Rotates a certain someone's name by one character.",
  arguments: "",
  permissions: "None",
  cooldown: 2,
  async execute(message, args) {
    if (!args[0]) {
      try {
        var currentNick = message.guild.members.cache.get('[Omitted]').displayName;
        var rotatedNick = currentNick.substring(currentNick.length-1) + currentNick.substring(0,currentNick.length-1);
        await message.guild.members.cache.get('[Omitted]').setNickname(rotatedNick).catch();
        message.channel.send("Rotated Dylan's name by one character.");
      } catch { message.channel.send("Error 404: Dylan not found.")}
    } else {
      const firstMember = message.mentions.members.first();
      if (!firstMember) return message.channel.send("Mention a user, or leave it blank!");
      var currentNick = firstMember.displayName;
      var rotatedNick = currentNick.substring(currentNick.length-1) + currentNick.substring(0,currentNick.length-1);
      try {
        await firstMember.setNickname(rotatedNick)
      } catch (error) {
        console.error(error);
        return message.channel.send("No perms <:mikeySmoge:911471618243592192> (" + rotatedNick + ")");
      }
      message.channel.send("Rotated " + currentNick + "'s name by one character.");
    }
  }
}
