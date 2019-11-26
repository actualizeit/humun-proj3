
const testCharities = [
  {
    name: 'pollutionCo',
    description: 'It does pollution stuff',
    category: 'pollution',
    shortVlong: 4,
    localVglobal: 6
  },
  {
    name: 'habitatCo',
    description: 'It does habitat stuff',
    category: 'habitat',
    shortVlong: 6,
    localVglobal: 3
  },
  {
    name: 'climateChangeCo',
    description: 'It does climateChange stuff',
    category: 'climateChange',
    shortVlong: 2,
    localVglobal: 2
  },
  {
    name: 'basicNeedsCo',
    description: 'It does basicNeeds stuff',
    category: 'basicNeeds',
    shortVlong: 0,
    localVglobal: 5
  },
  {
    name: 'educationCo',
    description: 'It does education stuff',
    category: 'education',
    shortVlong: 3,
    localVglobal: 6
  },
  {
    name: 'globalHealthCo',
    description: 'It does globalHealth stuff',
    category: 'globalHealth',
    shortVlong: 4,
    localVglobal: 0
  },
  {
    name: 'globalHealthCo2',
    description: 'It also does globalHealth stuff',
    category: 'globalHealth',
    shortVlong: 3,
    localVglobal: 6
  }
];

const testUser = {
  firstName: 'David',
  lastName: 'Bell',
  email: 'greenadvisor@gmail.com',
  password: '123456', // I use the same password for my luggage!
  date: '1/1/2019',
  impactLoc: 5,
  shortVlongTerm: 5,
  socialVenvironmental: 3,
  pollution: 20,
  habitat: 30,
  climateChange: 50,
  basicNeeds: 35,
  education: 35,
  globalHealth: 30,
  zipCode: 27517
};

let totCharShortvLong = 0;
let totCharLocvGlob = 0;

// functions to be run on addition of any charity to DB
// sets total value ratio

// const charTot = function (testCharities) {
//   let SvLTemp = 0;
//   let LvGTemp = 0;
//   testCharities.array.forEach(element => {
//     SvLTemp = SvLTemp + element.shortVlong;
//     LvGTemp = LvGTemp + element.localVglobal;
//   });
//   totCharShortvLong = SvLTemp;
//   totCharLocvGlob = LvGTemp;
// };

// const charPort = function (testCharities) {
//   testCharities.array.forEach(element => {
//     element.SvLPortion = element.shortVlong / totCharShortvLong;
//     element.LvGPortion = element.localVglobal / totCharLocvGlob;
//   });
// };

const userArray = Object.keys(testUser).map(i => testUser[i]);

const filteredUser = userArray.filter(e => typeof e === 'number' && e < 100);

// function to be run after completion of user onboarding, profile edit, or added charity
// sets donation defaults for review (on next login in case of charity add)

const allocationCalc = function (filteredUser, testCharities) {
  const userCharTemp = [];
  testCharities.array.forEach(element => {
    const tempDiff = element.localVglobal - filteredUser[0] + element.shortVlongTerm - filteredUser[1];
    if (userCharTemp.filter(e => e.category === element.category).length === 0) {
      userCharTemp.push({
        name: element.name,
        category: element.category,
        diff: tempDiff
      });
    }
    if (userCharTemp.some(e => e.category === element.category && e.diff > tempDiff)) {
      for (let i = 0; i < userCharTemp.length; i++) {
        if (userCharTemp[i].category === element.category) {
          userCharTemp[i].name = element.name;
          userCharTemp[i].diff = tempDiff;
          break;
        }
      }
    }
  });
};
