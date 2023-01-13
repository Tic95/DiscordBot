const { SlashCommandBuilder,PermissionFlagsBits} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick the target user')
    .addUserOption((option) => 
        option
            .setName('user')
            .setDescription('The member to kick')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('The reason of the kick')
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
    
    
    async execute(interaction){
    const member = interaction.options.getUser('user');
    var Reason = "";
    if(interaction.options.getString('reason') != null){
         Reason = ("pour la reason :" + interaction.options.getString('reason')) 
    }
    else{ 
         Reason =   "pour aucune raison";
    }
    
    console.log(member);
    
    await interaction.reply(` ${member}  kick ${Reason}`);
    await wait(2500);
    try{await interaction.guild.members.kick(member);} catch(error){console.log(error)}
        
    },


};