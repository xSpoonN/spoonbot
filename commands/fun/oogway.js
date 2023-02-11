cfigs = require("../../config.json");
const fs = require("fs");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

module.exports = {
  name: "oogway",
  description: "Sends a quote from Master Oogway, creator of kung fu.",
  arguments: "[index]",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    if (cfigs["disable_oogway"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    const specMsg = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    var data = fs.readFileSync('oogway.txt', 'UTF-8').split(/\r?\n/);
    var x = getRandomInt(1, data.length-1);
    if (!specMsg) {
      message.channel.send(data[x]);
    } else {
      if (specMsg >= data.length-1) return message.channel.send("There aren't that many quotes!");
      message.channel.send(data[specMsg]);
    }
  }
}
