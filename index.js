require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.SEARCH_TOKEN);

  var result=''
client.on("message", msg => {
    if (msg.content === "hb help") {
      msg.reply("You have called for help!\n 1. For searching a place- hb loc <yoursearch>\n 2. For searching a media- hb play <yoursearch>\n 3. For searching food - hb food <yoursearch>\n 4. For weather- hb weather <yourplace>")
    }
  })
  client.on("message", msg => {
    
    var splitted=msg.content.split(' ')
    if (splitted[0] === "hb") {
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
      else if(splitted[1]==="play"){
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
            result = result.concat("medication details")
            
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["organic_results"][0].link);
        msg.reply(data["organic_results"][0].link)
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
        console.log(data["answer_box"]["definitions"]);
        msg.reply(data["answer_box"]["definitions"])
        result=''
      };
      search.json(params, callback);
      }

      else if(splitted[1]==="buy"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            result = result.concat("amazon")
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["shopping_results"][0].link);
        msg.reply(data["shopping_results"][0].link)
        result=''
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="recipe"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["recipes_results"][0].link);
        msg.reply(data["recipes_results"][0].link)
        result=''
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="weather"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            result = result.concat("weather")
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(((parseInt(data["answer_box"]["temperature"]- 32)) * 5/9).toString()+'°C');
        msg.reply(((parseInt(data["answer_box"]["temperature"]- 32)) * 5/9).toString()+'°C')
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