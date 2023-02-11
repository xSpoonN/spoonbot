cfigs = require("../../config.json");

module.exports = {
  name: "jason",
  description: "Sends a picture of Jason",
  arguments: "None",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    const jasonResp = [
      '[Omitted]'
    ];
    const jasonPreResp = [
      'dreamy!', 'cute!', 'beautiful!', 'desirable!'
    ];
    message.channel.send("He's so " + jasonPreResp[Math.floor(Math.random() * jasonPreResp.length)], {
    files: [jasonResp[Math.floor(Math.random() * jasonResp.length)]]
    });
  }
}
