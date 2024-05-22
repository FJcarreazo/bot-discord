const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const createEmbed = (country) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor([255, 255, 255])
    .setTitle(country.name.common)
    .setURL(`https://es.wikipedia.org/wiki/${country.translations.spa.common}`)
    .addFields(
      { name: 'Capital', value: `${country.capital[0]}`, inline: true },
      { name: 'Poblacion', value: `${country.population.toLocaleString()}`, inline: true },
      { name: 'Region', value: `${country.region}`, inline: true },
    )
    .setImage(country.flags.png);

  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-pais')
    .setDescription('Busca un pais de tu preferencia')
    .addStringOption((option) =>
      option.setName('nombre').setDescription('El nombre del pais a buscar').setRequired(true),
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const countryName = interaction.options.getString('nombre');
      const { data } = await axios.get(`http://ergast.com/api/f1/circuits.json${countryName}`);

      if (data.length > 1) return await interaction.editReply('Pais invalido. Intenta de nuevo.');

      const embed = createEmbed(data[0]);

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply(`<@${interaction.user.id}>Hubo un error 😥`);
      console.log(error);
    }
  },
};

// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('buscar-pais')
//     .setDescription('busca un pais de tu preferencia')
//     .addStringOption(Option => Option
//       .setName('nombre')
//       .setDescription('el nombre del pais a buscar')
//       .setRequired(true),
//     ),

//   async execute(interaction) {
//     const countryName = interaction.options.getString('nombre');
//     console.log(countryName);
//     await interaction.reply('holaaaaa');
//   },
// };
