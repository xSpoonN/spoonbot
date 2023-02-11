cfigs = require("../../config.json");
const fs = require("fs");
const Discord = require("discord.js");
const GoogleImages = require('google-images');
const clientSearch = new GoogleImages('[Omitted]', '[Omitted]')

module.exports = {
  name: "google",
  description: "Searches and displays images from google.",
  arguments: "(amount) (query)",
  permissions: "None",
  cooldown: 1,
  async execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const args3 = message.content.split(' ').slice(2).join(" ");

    if (cfigs["disable_google"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!args[0]) return message.channel.send("You must provide a number of requests.");
    if (args[1] == null) return message.channel.send("You must provide a query.");
    if (parseInt(args[0]) > cfigs["maximum_google_requests"].value) return message.channel.send("Requesting that many images is disabled.");
    midResp = []; midResp[0] = "**Search Results For: " + args3 + "**\n";
    preEdit = await message.channel.send("**Searching...**");
    for (j = 0; j < Math.floor(args[0]/10); j++) {
      for (i = 0; i < 10; i++) {
        try {
          const results = await clientSearch.search(args3, {page: j});
          const reply = await !results.length ? "No results" : new Discord.MessageAttachment(results[i].url);
          midResp.push(results[i].url);
        } catch (e) {
          console.error(e);
          message.channel.send("Google rejected request, nothing I can do about this.");
        }
      }
    }
    for (i = 0; i < (args[0] % 10); i++) {
      try {
        const results = await clientSearch.search(args3, {page: Math.floor(args[0]/10)});
        const reply = await !results.length ? "No results" : new Discord.MessageAttachment(results[i].url);
        midResp.push(results[i].url);
      } catch (e) {
        console.error(e);
        message.channel.send("Google rejected request, nothing I can do about this.");
      }
    }
    preEdit.edit(midResp);
  }
}
