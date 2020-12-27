const db = require('./db');
const { Movie, Person } = db.models;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '1895-12-28',
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());

    const person1 = await Person.create({
      firstName: 'Michal',
      lastName: 'Majewski'
    });
    console.log(person1.toJSON());

  } catch (error) {
    if (error.name === 'SequelizeValidationError'){
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();