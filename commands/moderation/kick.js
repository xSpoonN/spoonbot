cfigs = require("../../config.json");

module.exports = {
  name: "kick",
  description: "Kicks the specified user.",
  arguments: "(user) [reason]",
  permissions: "Kick Members",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args3 = message.content.split(' ').slice(2).join(" ");

    if (cfigs["disable_kick"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('KICK_MEMBERS') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (!firstMember) return message.channel.send('You must specify a user.');
    if (message.member.roles.highest.position <= firstMember.roles.highest.position) return message.channel.send("You can't kick someone higher than you!");
    if (!args3) {
      message.guild.member(firstMember).kick('No Reason Given.')
        .then(() => { message.channel.send(`Kicked ${firstMention.tag}.`) })
        .catch(err => { message.channel.send('An Error Occured! I might not permissions to do that.'); console.error(err) });
    } else {
      message.guild.member(firstMember).kick(args3)
        .then(() => { message.channel.send(`Kicked ${firstMention.tag}.`) })
        .catch(err => { message.channel.send('An Error Occured! I might not permissions to do that.'); console.error(err) });
    }
  }
}
