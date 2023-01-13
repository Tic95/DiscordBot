const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('planning')
        .setDescription('Show the planning of the week'),
    async execute(interaction){

           
            const attachment = new AttachmentBuilder((__dirname + "\\.."+ '\\Planing-Efrei.png'), { name: 'ticket.png' });
            
            await interaction.reply({ content: "Voici le planning de la semaine" ,files: [attachment]});
        }
}