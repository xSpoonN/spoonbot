cfigs = require("../../config.json");

module.exports = {
  name: "shufflename",
  description: "Shuffles a certain someone's name.",
  arguments: "[user]",
  permissions: "None",
  cooldown: 1,
  async execute(message, args) {
    if (!args[0]) {
      try {
        var currentNick = message.guild.members.cache.get('[Omitted]').displayName;
        var a = currentNick.split(""), n = a.length;
        for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        rotatedNick = a.join("");
        await message.guild.members.cache.get('[Omitted]').setNickname(rotatedNick);
        message.channel.send("Shuffled Dylan's name.");
      } catch { message.channel.send("Error 404: Dylan not found.")}
    } else {
      const firstMember = message.mentions.members.first();
      if (!firstMember) return message.channel.send("Mention a user, or leave it blank!");
      var currentNick = firstMember.displayName;
      var a = currentNick.split(""), n = a.length;
      for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      rotatedNick = a.join("");
      try {
        await firstMember.setNickname(rotatedNick)
      } catch (error) {
        console.error(error);
        return message.channel.send("No perms <:mikeySmoge:911471618243592192> (" + rotatedNick + ")")
      }
      message.channel.send("Shuffled " + currentNick + "'s name.");
    }
  }
}
