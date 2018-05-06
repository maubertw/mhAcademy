const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const { db, Student, Campus } = require('./server/db/models/index.js');



const numUsers = 14;

const emails = chance.unique(chance.email, numUsers);

let campuses = [
  (Campus.build({
  name: 'Moon Campus',
  imageUrl: 'http://image.pennlive.com/home/penn-media/width600/img/wildaboutpa/photo/14-blue-moonjpg-e541a63d92f2ed42.jpg',
  description: `The Moon is an astronomical body that orbits planet Earth,
  being Earth's only permanent natural satellite. It is the fifth-largest
  natural satellite in the Solar System, and the largest among planetary
  satellites relative to the size of the planet that it orbits (its primary).
  Following Jupiter's satellite Io, the Moon is the second-densest satellite
  in the Solar System among those whose densities are known.`
})),

(Campus.build({
  name: 'Jupiter Campus',
  imageUrl: 'https://news.ucsc.edu/2015/03/images/jupiter-400.jpg',
  description: `Jupiter is the fifth planet from the Sun and the largest in
  the Solar System. It is a giant planet with a mass one-thousandth that of
  the Sun, but two-and-a-half times that of all the other planets in the Solar
  System combined. Jupiter and Saturn are gas giants; the other two giant planets,
  Uranus and Neptune are ice giants. Jupiter has been known to astronomers since
  antiquity. The Romans named it after their god Jupiter.[14] When viewed from
  Earth, Jupiter can reach an apparent magnitude of −2.94, bright enough for its reflected
  light to cast shadows, and making it on average the third-brightest object in the night
  sky after the Moon and Venus.`
})),

(Campus.build({
  name: 'Saturn Campus',
  imageUrl: 'http://www.nasa.gov/sites/default/files/images/171395main_image_feature_778_ys_full.jpg',
  description: `Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after
  Jupiter. It is a gas giant with an average radius about nine times that of Earth.[10][11] It has only one-eighth
  the average density of Earth, but with its larger volume Saturn is over 95 times more massive.[12][13][14] Saturn
  is named after the Roman god of agriculture; its astronomical symbol (♄) represents the god's sickle.`
})),

(Campus.build({
  name: 'Mars Campus',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFznmHUJ00bPBT34b-Hul4cp-POKh6U2frRUyAy0bAV4ZyDYHp',
  description: `Mars is the fourth planet from the Sun and the second-smallest planet in the Solar
  System after Mercury. In English, Mars carries a name of the Roman god of war, and is often referred
  to as the "Red Planet"[14][15] because the reddish iron oxide prevalent on its surface gives it a reddish
  appearance that is distinctive among the astronomical bodies visible to the naked eye.[16] Mars is a terrestrial
  planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys,
  deserts, and polar ice caps of Earth.`
}))]




function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randUser () {
  const gender = chance.gender();
  return Student.build({
    firstName: chance.first({gender: gender}),
    lastName: chance.last(),
    photo: randPhoto(gender),
    email: emails.pop(),
    gpa: 3.5,
  });
}


function generateUsers () {
    const Student = doTimes(numUsers, randUser);
    return Student;
  }


function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}

function createCampuses () {
  return Promise.map(campuses, school => school.save());
}


async function seed () {
  return  Promise.all([createUsers(), createCampuses()])
  //.then(createdUsers => createStories(createdUsers));
  //const [createdUsers, createdCampuses] = await Promise.all([createUsers(), createCampuses()])
}


console.log('Syncing database');

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });







