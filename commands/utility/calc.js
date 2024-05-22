const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('calculadora').setDescription('resuelve dos numeros'),
  async execute(interaction) {
    await interaction.reply('holaaaaaaaa');
  },
};
