const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-nota')
    .setDescription('crea una nota')
    .addStringOption((option) =>
      option.setName('titulo').setDescription('El titulo').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('contenido').setDescription('El contenido').setRequired(true),
    ),
  async execute(interaction) {
    try {
      const title = interaction.options.getString('titulo');
      const content = interaction.options.getString('contenido');

      const statemen = db.prepare(`
     INSERT INTO notes (title, content, user_id)
      VALUES (?, ?, ?)`);
      statemen.run(title, content, interaction.user.id);
      await interaction.reply(`<@${interaction.user.id}> Nota creada`);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        await interaction.reply(`<@${interaction.user.id}> Ya estas creado.`);
      }
      console.log(error.code);
    }
  },
};
