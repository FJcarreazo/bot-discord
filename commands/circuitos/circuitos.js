const { SlashCommandBuilder, MessageEmbed } = require('discord.js'); // Cambia a MessageEmbed
const axios = require('axios');

const createEmbed = (circuits) => {
  const embed = new MessageEmbed() // Usa MessageEmbed aquí
    .setColor(0x0099ff)
    .setTitle('Circuitos de Fórmula 1')
    .setThumbnail('https://www.topnews.in/files/Formula_One_Logo_2.jpg');

  circuits.forEach((circuit) => {
    embed.addField(circuit.circuitName, circuit.circuitId, true);
  });

  return embed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('circuitos')
    .setDescription('Muestra la lista de todos los circuitos de Fórmula 1'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const { data } = await axios.get('https://ergast.com/api/f1/circuits.json');
      const circuits = data.MRData.CircuitTable.Circuits;

      const embed = createEmbed(circuits);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: 'Hubo un error al obtener los circuitos. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  },
};
