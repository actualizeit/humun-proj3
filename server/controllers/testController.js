const charities = require('./../controllers/charities');
const { User } = require('../models');

// console.log(charities.charities);

// function to be run after completion of user onboarding, Dashboard edit, or added charity
// sets donation defaults for review (on next login in case of charity add)

module.exports = {

  allocationCalc: function (req, res) {
    User.findById(req.user._id)
      .then(userResp => {
        const profileData = userResp.profileData;
        console.log(profileData);
        const userArray = Object.values(profileData);
        // .map(i => profileData[i]);
        const profileArray = Object.keys(profileData);
        // .map(i => profileData[i]);
        console.log('userArray: ' + userArray);
        console.log('profileArray: ' + profileArray);
        const SvERatio = profileData.socialVenvironmental / 6;
        const portions = [];
        const allocations = [];
        for (let i = 1; i < userArray.length; i++) {
          if (i < 8) {
            portions.push(userArray[i] * SvERatio);
          } else {
            portions.push(userArray[i] * (1 - SvERatio));
          }
        }
        charities.charities.forEach(element => {
          const tempDiff = Math.abs(element.localVglobal - userArray[1]) + Math.abs(element.shortVlong - userArray[2]);
          if (allocations.filter(e => e.category === element.category).length === 0) {
            allocations.push({
              name: element.name,
              category: element.category,
              diff: tempDiff
            });
          }
          if (allocations.some(e => e.category === element.category && e.diff > tempDiff)) {
            for (let i = 0; i < allocations.length; i++) {
              if (allocations[i].category === element.category) {
                allocations[i].name = element.name;
                allocations[i].diff = tempDiff;
                break;
              }
            }
          }
          allocations.forEach(element => {
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
        console.log('allocations: ' + JSON.stringify(allocations));
        User.findOneAndUpdate({ _id: req.user._id }, { $set: { allocations } }, { new: true })
          .then(user => {
            user.password = undefined;
            res.json({ success: true, user });
          })
          .catch(err => res.status(422).json(err));
      });
  }

  // allocationCalc(testUser, charities);

};
