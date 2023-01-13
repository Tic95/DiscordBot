const { SlashCommandBuilder, User } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('say pong2x'),
    async execute(interaction){ 
    
        await interaction.reply({content :`J\'te Pong Pong ta daronne <@${interaction.user.id}>`, ephemeral : false});
        
        console.log(interaction.user.id);
           
    }
    
}