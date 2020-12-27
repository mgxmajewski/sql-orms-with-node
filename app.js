const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
});

// Movie model
class Movie extends Sequelize.Model {}
Movie.init({
  title: Sequelize.STRING
}, { sequelize });

(async () => {
  // Sync 'Movies' table
  await sequelize.sync({ force: true });

  try {

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();
