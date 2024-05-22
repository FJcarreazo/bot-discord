const { SlashCommandBuilder, codeBlock } = require('discord.js');
const db = require('../../db');
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');

module.exports = {
  data: new SlashCommandBuilder().setName('notas').setDescription('Muestra todas las notas'),
  async execute(interaction) {
    try {
      const notes = db
        .prepare(
          `
            SELECT notes.note_id, notes.title, notes.content, users.name FROM notes
            JOIN users
            ON users.user_id = users.user_id
            WHERE notes.user_id = ?
            `,
        )
        .all(interaction.user.id);
      const formatedNotes = notes.map((note) => {
        return [note.note_id, note.title, note.content, note.name];
      });

      const table = new AsciiTable3('Notas')
        .setHeading('ID', 'titulo', 'contenido', 'nombre')
        .setAlign(4, AlignmentEnum.CENTER)
        .addRowMatrix(formatedNotes);
      await interaction.reply(codeBlock(table.toString()));
    } catch (error) {
      await interaction.reply('error!');
    }
  },
};
