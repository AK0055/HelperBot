console.log('helloworld')
console.log('`hb help')
require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("f875a84eeecd87137c342bcfb7b1509828c650477f8903b6997ccf4fd4b805b7");

  var result=''
client.on("message", msg => {
    if (msg.content === "`hb help") {
      msg.reply("You have called for help!")
    }
  })
  client.on("message", msg => {
    
    var splitted=msg.content.split(' ')
    if (splitted[0] === "`hb") {
      if(splitted[1]==="loc"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
       try {
            console.log(data["knowledge_graph"]["local_map"]['link']);
            msg.reply(data["knowledge_graph"]["local_map"]['link'])
            result=''
        }
        catch(TypeError){
            console.log(data["local_map"]['link']);
        msg.reply(data["local_map"]['link'])
        result=''
        }
        
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="song"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["inline_videos"][0].link);
        msg.reply(data["inline_videos"][0].link)
        result=''
      };
      search.json(params, callback);
      }

      else if(splitted[1]==="med"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["inline_videos"][0].link);
        msg.reply(data["inline_videos"][0].link)
        result=''
      };
      search.json(params, callback);
      }

      else if(splitted[1]==="dict"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["inline_videos"][0].link);
        msg.reply(data["inline_videos"][0].link)
        result=''
      };
      search.json(params, callback);
      }

      else if(splitted[1]==="buy"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["inline_videos"][0].link);
        msg.reply(data["inline_videos"][0].link)
        result=''
      };
      search.json(params, callback);
      }
    
    
    console.log(result)
   
      
      
      
      // Show result as JSON
      
    }
  })

client.login(process.env.BOT_TOKEN)
module.exports = client


