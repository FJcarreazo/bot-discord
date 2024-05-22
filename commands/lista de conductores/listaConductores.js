const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const createEmbed = (circuitId) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor([255, 255, 255])
    .addFields(
      { name: 'Circuito', value: `${circuitId[0]}`, inline: true },
      { name: 'Localizacion', value: `${circuitId.locality.toLocaleString()}`, inline: true },
      { name: 'Pais', value: `${circuitId.country}`, inline: true },
    );

  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-circuito')
    .setDescription('Busca un circuito de tu preferencia')
    .addStringOption((option) =>
      option.setName('nombre').setDescription('El nombre del circuito a buscar').setRequired(true),
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const circuitName = interaction.options.getString('nombre');
      const { data } = await axios.get(`https://ergast.com/api/f1/2024/circuits/${circuitName}`);
      console.log(data);

      if (data.length > 1)
        return await interaction.editReply('Circuito invalido. Intenta de nuevo.');

      const embed = createEmbed(data[0]);

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply(`<@${interaction.user.id}>Hubo un error 😥`);
      console.log(error.response);
    }
  },
};

// const axios = require('axios');
// const { SlashCommandBuilder } = require('discord.js');
// const { EmbedBuilder } = require('discord.js');

// const createEmbed = (circuitId) => {
//   const exampleEmbed = new EmbedBuilder()
//     .setColor([255, 255, 255])
//     .setTitle()
//     .addFields(
//       { name: 'Circuito', value: `${circuitId}`, inline: true },
//       { name: 'Localizacion', value: `${circuitId.locality}`, inline: true },
//       { name: 'Pais', value: `${circuitId.country}`, inline: true },
//     );

//   return exampleEmbed;
// };

// module.exports = {
//   data: new SlashCommandBuilder().setName('circuitos').setDescription('Lista de circuitos 2024'),
//   async execute(interaction) {
//     try {
//       await interaction.deferReply();
//       const circuitsName = interaction.options.getString('nombre');
//       const { data } = await axios.get(`https://ergast.com/api/f1/2024/circuits${circuitsName}`);
//       if (data.length > 1)
//         return await interaction.editReply('Circuito invalido. Intenta de nuevo.');
//       const embed = createEmbed(data[0]);
//       await interaction.editReply({ embeds: [embed] });
//     } catch {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: 'https://ergast.com/api/f1/2024/circuits/1',
//         headers: {},
//       };
//       axios(config)
//         .then(function (response) {
//           console.log(JSON.stringify(response.data));
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     }
//   },
// };
