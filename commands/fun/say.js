cfigs = require("../../config.json");

module.exports = {
  name: "say",
  description: "Sends a message as the bot.",
  arguments: "(message)",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    if (cfigs["disable_say"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (args[0] == null) return message.channel.send("You need to give me a prompt!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }
}
