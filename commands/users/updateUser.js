const { SlashCommandBuilder, bold } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('actualizar-usuario')
    .setDescription('Actualiza tu usuario')
    .addStringOption((option) =>
      option.setName('pais').setDescription('Tu pais').setRequired(true),
    ),
  async execute(interaction) {
    try {
      const country = interaction.options.getString('pais');

      const getStatement = db.prepare(`
        SELECT * FROM users
            WHERE user_id = ?
        `);

      const responseGET = getStatement.get(interaction.user.id);
      if (!responseGET) {
        await interaction.reply(`<@${interaction.user.id}> No tienes un usuario creado`);
      }
      const statemen = db.prepare(`
      UPDATE users
      SET country = ?
      WHERE user_id =?
     `);
      statemen.run(country, interaction.user.id);
      await interaction.reply(
        `<@${interaction.user.id}> Actualizaste tu usuario el pais cambio de ${bold(responseGET.country)} a ${bold(country)}`,
      );
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        return await interaction.reply(`<@${interaction.user.id}> Ya estas creado.`);
      }
      console.log(error.code);
    }
  },
};
