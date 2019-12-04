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
        // const userArray = Object.keys(userResp);
        // .map(i => userResp[i]);
        // console.log('userArray: ' + userArray);
        const filteredUser = userArray.filter(e => typeof e === 'number' && e < 101);
        const SvERatio = userResp.socialVenvironmental;
        const portions = [];
        const userCharTemp = [];
        console.log('filteredUser: ' + filteredUser);
        for (let i = 3; i < filteredUser.length; i++) {
          if (i < 6) {
            portions.push(filteredUser[i] * SvERatio);
          } else {
            portions.push(filteredUser[i] * (1 - SvERatio));
          }
        }
        charities.charities.forEach(element => {
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
        console.log('userCharTemp: ' + JSON.stringify(userCharTemp));
        // API.post(userCharTemp);
        res.json({ success: true, userCharTemp });
        return userCharTemp;
      });
  }

  // allocationCalc(testUser, charities);

};
