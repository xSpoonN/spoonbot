responses = require("../../responses.json");
const fs = require("fs");

module.exports = {
  name: "delresponse",
  description: "Deletes a simple text response.",
  arguments: "\"(trigger)\"",
  permissions: "Administrator",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;

    if (!guildMember.hasPermission('ADMINISTRATOR') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    args = args.join("").split('"');
    if (!args[1]) return message.channel.send("You must specify a trigger!");
    if (!responses.hasOwnProperty(args[1])) return message.channel.send("A response for that message doesn't exist!");
    delete responses[args[1]];
    fs.writeFile('./responses.json', JSON.stringify(responses), err => {if (err) throw err;})
    message.channel.send("Deleted a response: \"" + args[1] + "\"");
  }
}
