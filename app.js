const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

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

    const movie3 = await Movie.build({
      title: 'Toy Story 3',
      runtime: 128,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: true,
    });
    await movie3.save(); // save the record
    console.log(movie3.toJSON());

    const movie4 = await Movie.build({
      title: 'Pulp fiction',
      runtime: 128,
      releaseDate: '1996-08-18',
      isAvailableOnVHS: true,
    });
    await movie4.save(); // save the record
    console.log(movie4.toJSON());

    const person1 = await Person.create({
      firstName: 'Michal',
      lastName: 'Majewski'
    });
    console.log(person1.toJSON());

    const person2 = await Person.create({
      firstName: 'Tom',
      lastName: 'Hanks'
    });
    console.log(person2.toJSON());

    const person3 = await Person.create({
      firstName: 'Popo',
      lastName: 'Fooofsky'
    });
    console.log(person3.toJSON());

// SELECT 'one' FROM Movies WHERE Pk (primary key) = 4;
    const movieById = await Movie.findByPk(4);
    console.log(movieById.toJSON());

// SELECT 'first met' FROM Movies WHERE runtime = 115;
    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    console.log(movieByRuntime.toJSON());

    const people = await Person.findAll({
      where: {
        lastName: 'Hanks'
      }
    });
// SELECT * FROM People WHERE lastName = 'Hanks';
    console.log( people.map(person => person.toJSON()) );

    const movies = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        releaseDate: {
          [Op.gte]: '1800-01-01' // greater than or equal to the date
        },
        runtime: {
          [Op.gt]: 95, // greater than 95
        }
      },
      order: [['id', 'DESC']] // IDs in descending order
    });
    console.log( movies.map(movie => movie.toJSON()) );

    const movies2 = await Movie.findAll({
      attributes: ['id', 'title', 'releaseDate'],
      where: {
        releaseDate: {
          [Op.gte]: '1995-01-01'
        }
      },
      order: [['releaseDate', 'ASC']], // dates in ascending order
    });
    console.log( movies2.map(movie => movie.toJSON()) );



  } catch (error) {
    if (error.name === 'SequelizeValidationError'){
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();