module.exports = {
  charities: [
    {
      name: 'Natural Resources Defense Council',
      link: 'https://www.nrdc.org/',
      description: 'to safeguard the Earth: its people, its plants and animals and the natural systems on which all life depends',
      ein: '13-2654926',
      category: 'pollution',
      shortVlong: 4,
      localVglobal: 6
    },
    {
      name: 'Coalition for Clean Air',
      link: 'https://www.ccair.org/',
      description: 'to reduce air pollution and increase air quality monitoring across the state of California',
      ein: '23-7120567',
      category: 'pollution',
      shortVlong: 3,
      localVglobal: 3
    },
    {
      name: 'Wildlife Conservation Society',
      link: 'https://www.wcs.org/',
      ein: '13-1740011',
      description: 'to save wildlife and wild places worldwide through science',
      category: 'habitat',
      shortVlong: 4,
      localVglobal: 3
    },
    {
      name: 'World Land Trust',
      link: 'https://www.worldlandtrust.org/',
      ein: '52-2109597',
      description: "to protect the world's most biologically important and threatened habitats acre by acre",
      category: 'habitat',
      shortVlong: 6,
      localVglobal: 6
    },
    {
      name: '350',
      link: '350.org',
      ein: '26-1150699',
      description: 'to build a global grassroots climate movement that can hold our leaders accountable to the realities of science and the principles of justice',
      category: 'climateChange',
      shortVlong: 3,
      localVglobal: 6
    },
    {
      name: 'Union of Concerned Scientists',
      link: 'https://www.ucsusa.org/',
      ein: '04-2535767',
      description: "to use rigorous, independent science to solve our planet's most pressing problems",
      category: 'climateChange',
      shortVlong: 5,
      localVglobal: 6
    },
    {
      name: 'Raising the Village',
      link: 'https://www.raisingthevillage.org/',
      ein: '47-2168119',
      description: 'to support ultra-poor households to become economically self-sufficient',
      category: 'basicNeeds',
      shortVlong: 1,
      localVglobal: 5
    },
    {
      name: 'Opportunity Junction',
      link: 'https://opportunityjunction.org/',
      ein: '68-0459131',
      description: 'to help low-income Contra Costa residents gain the skills and confidence they need to get and keep jobs that support themselves and their families',
      category: 'basicNeeds',
      shortVlong: 1,
      localVglobal: 2
    },
    {
      name: 'Jumpstart',
      link: 'https://www.jstart.org/',
      ein: '04-3262046',
      description: 'to provide language, literacy, and social-emotional programming for preschool children from under-resourced communities and promote quality early learning for all',
      category: 'education',
      shortVlong: 3,
      localVglobal: 2
    },
    {
      name: 'World Literacy Foundation',
      link: 'https://worldliteracyfoundation.org/',
      ein: '46-1201100',
      description: "To improve, through education, life opportunities for some of the world's poorest children living in remote and marginalised communities",
      category: 'education',
      shortVlong: 3,
      localVglobal: 5
    },
    {
      name: 'Caring Voice Coalition',
      link: 'http://www.caringvoice.org/',
      ein: '26-0058446',
      description: 'to empower patients who live with a life-threatening chronic disease through comprehensive outreach programs and services aimed at financial, emotional and educational support',
      category: 'globalHealth',
      shortVlong: 3,
      localVglobal: 1
    },
    {
      name: 'Americares',
      link: 'https://www.americares.org/',
      ein: '06-1008595',
      description: 'to respond to people affected by poverty or disaster with life-changing medicine, medical supplies and health programs',
      category: 'globalHealth',
      shortVlong: 0,
      localVglobal: 6
    }
  ],

  testUser: {
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
  }
};
