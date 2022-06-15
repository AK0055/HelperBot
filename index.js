require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.SEARCH_TOKEN);
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log(`Server is running in port ${PORT}`)
var result=''
client.on("message", msg => {
  
  var splitted=msg.content.split(' ')
  if (splitted[0] === "hb") {
    try{
      if(splitted[1] === "help"){
        msg.reply("You have called for help!\n✈️ For searching a place- `hb loc <yoursearch>`\n\n🎵 For searching a media- `hb play <yoursearch>`\n\n🍔 For searching food - `hb food <yoursearch>`\n\n🌦️ For weather- `hb weather <yourplace>`\n\n❔ For word meaning- `hb dict <yourword>`\n\n🛒 For shopping item- `hb buy <youritem>`\n\n💊 For medication details- `hb med <yourmed>`\n\n🖼️ To reverse search an image URL- `hb isearch <yourimageurl>`\n")

      }
      else if(splitted[1]==="loc"){
        result = result.concat("where is ")

        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
       try {
            console.log(data["knowledge_graph"]["local_map"]["link"]);
            msg.reply(data["knowledge_graph"]["local_map"]["link"])
            result=''
        }
        catch(TypeError){
          try{
            console.log(data["local_map"]['link']);
        msg.reply(data["local_map"]['link'])
        result=''
          }
          catch(err){
            msg.reply(data["organic_results"][0].link)
            result=''
          }
            
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
        try{
        console.log(data["inline_videos"][0].link);
        msg.reply(data["inline_videos"][0].link)
        result=''}
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply(data["organic_results"][0].link)
          result=''
        }
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
      result = result.concat("meaning")
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        try {
          console.log(data["answer_box"]["definitions"]);
        msg.reply(data["answer_box"]["definitions"])
        result=''
      }
      catch(DiscordAPIError){
        msg.send('Your search cannot be found')
      }
       
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
        try{
        console.log(data["shopping_results"][0].link);
        msg.reply(data["shopping_results"][0].link)
        result=''
        }
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply(data["organic_results"][0].link)
          result=''
        }
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
        try{
          console.log(data["recipes_results"][0].link);
          msg.reply(data["recipes_results"][0].link)
          result=''
        }
        
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply(data["organic_results"][0].link)
          result=''
        }
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
        try{
          console.log(((parseInt(data["answer_box"]["temperature"]- 32)) * 5/9).toFixed(2).toString()+'°C\n'+"Forecast: "+data["answer_box"]["forecast"][0]["weather"]);
          var a = (parseInt(data["answer_box"]["temperature"]- 32) * 5/9).toFixed(2).toString()
          msg.reply("Temperature: "+a+'°C\n'+"Might expect "+data["answer_box"]["forecast"][0]["weather"]+"\n")
         
          result=''
        }
        
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply(data["organic_results"][0].link)
          result=''
        }
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="search"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
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
      else if(splitted[1]==="isearch"){
        result=splitted[2]
      const params = {
        engine: "google_reverse_image",
        image_url: result
      };
      
      const callback = function(data) {
        console.log(data["inline_images"][0]["source"]);
        msg.reply(data["inline_images"][0]["source"])
      };
      
      // Show result as JSON
      search.json(params, callback);
      }
    else  msg.reply("Please use these commands: \n✈️ For searching a place- `hb loc <yoursearch>`\n\n🎵 For searching a media- `hb play <yoursearch>`\n\n🍔 For searching food - `hb food <yoursearch>`\n\n🌦️ For weather- `hb weather <yourplace>`\n\n❔ For word meaning- `hb dict <yourword>`\n\n🛒 For shopping item- `hb buy <youritem>`\n\n💊 For medication details- `hb med <yourmed>`\n\n🖼️ To reverse search an image URL- `hb isearch <yourimageurl>`\n")

    console.log(result)
   
      
      
      
      // Show result as JSON
      
    }
    catch(err){
      for (let i = 1; i < splitted.length; i++) {
        result = result.concat(splitted[i]+' ');
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
    }
    
})

client.login(process.env.BOT_TOKEN)
module.exports = client

});
  