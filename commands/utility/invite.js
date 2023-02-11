cfigs = require("../../config.json");
const fs = require("fs");

async function invite(message) {
  let invite = await message.channel.createInvite({maxAge: 12*60*60, maxUses: 5},
  `Requested by ${message.author.tag}`).catch(console.log);
  message.channel.send(`Here you go: ${invite}`);
}

module.exports = {
  name: "invite",
  description: "Creates an invite to this server.",
  arguments: "None",
  permissions: "Create Instant Invite",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();

    if (cfigs["disable_invite"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (guildMember.permissions.has("CREATE_INSTANT_INVITE") != true && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    invite(message);
  }
}
