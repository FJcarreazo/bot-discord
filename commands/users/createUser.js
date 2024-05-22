const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-usuario')
    .setDescription('crea un usuario')
    .addStringOption((option) =>
      option.setName('nombre').setDescription('Tu nombre').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('pais').setDescription('Tu pais').setRequired(false),
    ),
  async execute(interaction) {
    try {
      const name = interaction.options.getString('nombre');
      const country = interaction.options.getString('pais');

      const statemen = db.prepare(`
     INSERT INTO users (user_id, name, country)
      VALUES (?, ?, ?)`);
      statemen.run(interaction.user.id, name, country);
      await interaction.reply(`<@${interaction.user.id}> Usuario creado`);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        await interaction.reply(`<@${interaction.user.id}> Ya estas creado.`);
      }
      console.log(error.code);
    }
  },
};
