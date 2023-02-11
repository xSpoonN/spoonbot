cfigs = require("../../config.json");

module.exports = {
  name: "mute",
  description: "Mutes the specified user.",
  arguments: "(user) [reason]",
  permissions: "Mute Members",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_mute"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MUTE_MEMBERS') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (!firstMention) return message.channel.send("You must specify a user.");
    if (message.member.roles.highest.position < firstMember.roles.highest.position) return message.channel.send("You can't mute someone higher than you!");
    if (firstMember.voice.channel == null) return message.channel.send("That user is not in a voice channel!");
    if (!firstMember.voice.mute) {
      message.guild.member(firstMention).voice.setMute(true)
        .then(() => { message.channel.send(`Muted ${firstMention.tag}.`) })
        .catch(err => { message.channel.send('An Error Occured! I might not permissions to do that.'); console.error(err) });
    } else {
      message.guild.member(firstMention).voice.setMute(false)
        .then(() => { message.channel.send(`Unmuted ${firstMention.tag}.`) })
        .catch(err => { message.channel.send('An Error Occured! I might not permissions to do that.'); console.error(err) });
    }
  }
}
