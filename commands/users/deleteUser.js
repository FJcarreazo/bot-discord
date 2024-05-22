const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder().setName('eliminar-usuario').setDescription('elimina tu usuario'),
  async execute(interaction) {
    try {
      const id = interaction.user.id;
      const statemen = db.prepare(`
     DELETE FROM users
     WHERE user_id = ?
     `);
      const responseDB = statemen.run(id);
      if (responseDB.changes === 0) {
        return await interaction.reply(`<@${interaction.user.id}> No tienes un usuario registrado`);
      }
      await interaction.reply(`<@${interaction.user.id}> Usuario eliminada`);
    } catch (error) {
      console.log(error.code);
    }
  },
};
