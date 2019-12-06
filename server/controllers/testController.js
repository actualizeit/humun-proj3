const charities = require('./../controllers/charities');
const { Transactions, User } = require('../models');

// console.log(charities.charities);

// function to be run after completion of user onboarding, profile edit, or added charity
// sets donation defaults for review (on next login in case of charity add)

module.exports = {

  allocationCalc: function (req, res) {
    User.findById(req.user._id)
      .then(userResp => {
        const profileData = userResp.profileData;
        console.log(profileData);

        // const firstName = userResp.firstName;
        // const lastName = userResp.lastName;
        // const impactLoc = userResp.impactLoc;
        // const shortVlongTerm = userResp.shortVlongTerm;
        // const basicNeeds = userResp.basicNeeds;
        // const climateChange = userResp.climateChange;
        // const education = userResp.education;
        // const globalHealth = userResp.globalHealth;
        // const habitat = userResp.habitat;
        // const pollution = userResp.pollution;
        // const socialVenvironmental = userResp.socialVenvironmental;

        // const user = userResp;
        // console.log('charities: ' + JSON.stringify(charities.charities));

        // dynamically creates state object
const createState = (arr, max) => {
  const obj = {};
  const num = max / arr.length;
  for (const x of arr) {
    obj[x] = [num];
  }
  return obj;
};
        const userArray = Object.values(profileData);
          // .map(i => profileData[i]);
        const profileArray = Object.keys(profileData);
          // .map(i => profileData[i]);
        console.log('userArray: ' + userArray);
        console.log('profileArray: ' + profileArray);
        const SvERatio = profileData.socialVenvironmental / 6;
        const portions = [];
        const userCharTemp = [];
        for (let i = 1; i < userArray.length; i++) {
          if (i < 8) {
            portions.push(userArray[i] * SvERatio);
          } else {
            portions.push(userArray[i] * (1 - SvERatio));
          }
        }
        charities.charities.forEach(element => {
          const tempDiff = Math.abs(element.localVglobal - userArray[1]) + Math.abs(element.shortVlong - userArray[2]);
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
        console.log('userCharTemp: ' + JSON.stringify(userCharTemp));
        // API.post(userCharTemp);
        res.json({ success: true, userCharTemp });
        return userCharTemp;
      });
  }

  // allocationCalc(testUser, charities);

};
