import API from './../utils/Api';

const charities = [
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
  socialVenvironmental: 1,
  pollution: 20,
  habitat: 30,
  climateChange: 50,
  basicNeeds: 35,
  education: 35,
  globalHealth: 30,
  zipCode: 27517
};

// function to be run after completion of user onboarding, profile edit, or added charity
// sets donation defaults for review (on next login in case of charity add)

// module.exports = {

const allocationCalc = function (charities) {
  API.get().then((res) => {
    const user = res || testUser;
    console.log(user);
    const userArray = Object.keys(user).map(i => user[i]);
    const filteredUser = userArray.filter(e => typeof e === 'number' && e < 101);
    const SvERatio = filteredUser[2] / 6;
    const portions = [];
    const userCharTemp = [];
    // console.log(filteredUser);
    for (let i = 3; i < filteredUser.length; i++) {
      if (i < 6) {
        portions.push(filteredUser[i] * SvERatio);
      } else {
        portions.push(filteredUser[i] * (1 - SvERatio));
      }
    }
    charities.forEach(element => {
      const tempDiff = Math.abs(element.localVglobal - filteredUser[0]) + Math.abs(element.shortVlong - filteredUser[1]);
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
      userCharTemp.forEach(element => {
        switch (element.category) {
          case 'pollution': element.portion = portions[0];
            break;
          case 'habitat': element.portion = portions[1];
            break;
          case 'climateChange': element.portion = portions[2];
            break;
          case 'basicNeeds': element.portion = portions[3];
            break;
          case 'education': element.portion = portions[4];
            break;
          case 'globalHealth': element.portion = portions[5];
            break;
          default: console.log('Invalid portion operation');
        }
      });
    });
    console.log(userCharTemp);
    API.post(userCharTemp);
    return userCharTemp;
  });
};

allocationCalc(testUser, charities);

// };
