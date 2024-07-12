import mongoose from 'mongoose';
import { StudentModel, CampusModel } from './schema-model.js';

// TESTING: fack data, and a few edge cases
(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/refresh-dev');

    // create fake campuses
    const campuses = [
      {
        city: 'berlin', // => uppercase
        students: [],
      },
      {
        city: 'LISBON',
        students: [],
      },
      {
        city: 'pArIS', // => uppercase
        students: [],
      },
    ];
    const createdCampuses = await CampusModel.insertMany(campuses);

    // create fake students
    const students = [
      {
        name: 'bob', // => capitalize
        age: 27,
        lang: ['en', 'de'],
        campus: createdCampuses[0]._id,
      },
      {
        name: 'mara',
        age: 29,
        lang: ['en', 'de', 'pt'],
        enrolled: false,
        campus: createdCampuses[0]._id,
      },
      {
        name: 'HARU', // => capitalize
        age: 26,
        lang: ['en', 'jp'],
        enrolled: true,
        campus: createdCampuses[0],
      },
      {
        name: 'Ahmed',
        age: 28,
        lang: ['  EN      '], // => trim + lowercase + validate: isTwoLetterCountryCode
        enrolled: true,
        campus: createdCampuses[1]._id,
      },
    ];
    const createdStudents = await StudentModel.insertMany(students);

    // update fake relations
    for (let i = 0; i < 3; i++) {
      await CampusModel.findOneAndUpdate(
        { city: 'Berlin' },
        { $push: { students: createdStudents[i]._id } },
        { new: true },
      );
    }
    await CampusModel.findOneAndUpdate(
      { city: 'Lisbon' },
      { $push: { students: createdStudents[3]._id } },
      { new: true },
    );

    // validate if relations linked
    const updatedCampuses = await CampusModel.find({});
    let areRelationsLinked = false;
    if (updatedCampuses[0].students.length && updatedCampuses[1].students.length) {
      areRelationsLinked = true;
    }

    // log results
    console.log(
      `${createdStudents.length ? createdStudents.length + ' students added!' : ''} ${
        createdCampuses.length ? createdCampuses.length + ' campuses added!' : ''
      } ${areRelationsLinked ? 'Students-Campus are linked: many-to-many!' : 'Without relations!'}`,
    );
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
