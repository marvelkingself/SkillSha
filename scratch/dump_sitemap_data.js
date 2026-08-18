const { COURSE_SLUG_MAP, COURSES_DATA } = require('./src/data/courses');
const { CITIES_LIST } = require('./src/data/cities');

console.log("Total Slugs:", Object.keys(COURSE_SLUG_MAP).length);
console.log("Slugs map:");
console.log(JSON.stringify(COURSE_SLUG_MAP, null, 2));

console.log("Total Cities:", CITIES_LIST.length);
console.log("Cities map:");
console.log(JSON.stringify(CITIES_LIST, null, 2));
