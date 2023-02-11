cfigs = require("../../config.json");

module.exports = {
  name: "reactpast",
  description: "Reacts to a past message with an emoji.",
  arguments: "(number) (emoji)",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;

    if (cfigs["disable_reactwith"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (args[0] == null || args[1] == null || args.length >= 3) return message.channel.send("Provide a number and an emoji!");
    message.channel.messages.fetch({limit: parseInt(args[0])+1}).then((messages) => {
      try {
        const emoji = client.emojis.cache.find(emoji => emoji.name === args[1]); var i = 0;
        messages.forEach(function(message) {
            i++; if (i == parseInt(args[0])+1) message.react(emoji).catch(console.error);
        })
      } catch(error) {
        try { var i = 0;
          messages.forEach(function(message) {
            i++; if (i == parseInt(args[0])+1) message.react(args[1]).catch(console.error);
          })
        } catch(error) {
          console.error(error);
          message.channel.send("An Error Occured!");
        }
      }
    });
    message.delete();
  }
}
