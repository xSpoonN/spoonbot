responses = require("../../responses.json");
const fs = require("fs");

function pushDataToJSON(configName, editedmessage) {
  responses[configName] = {
    value: editedmessage
  }
  fs.writeFile("./responses.json", JSON.stringify(responses, null, 4), err => {
    if (err) throw err;
  });
  return responses[configName].value;
}

module.exports = {
  name: "addresponse",
  description: "Adds a simple text response.",
  arguments: "\"(trigger)\" \"(response)\"",
  permissions: "Administrator",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;

    if (!guildMember.hasPermission('ADMINISTRATOR') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    args = args.join("").split(/[“”"]+/);
    if (!args[1] || !args[3]) return message.channel.send("You must specify both a trigger and a response");
    if (responses.hasOwnProperty(args[1])) return message.channel.send("A response for that message already exists!");
    pushDataToJSON(args[1], args[3]);
    message.channel.send("Added a response: \"" + args[1] + "\": \"" + args[3] + "\".");
  }
}
