function getLearnMoreEntryThumbNail (filename) {
  return 'img/readingList/'+filename;
}

learnMoreEntries = [

  {
    thumbnail: getLearnMoreEntryThumbNail('badass.jpg'),
    title: 'Badass: Making Users Awesome',
    resume: null,
    categories: {
      makePeopleAwesome: true,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Badass-Making-Awesome-Kathy-Sierra/dp/1491919019'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('deliveringHapiness.jpg'),
    title: 'Delivering Happiness: A Path to Profits, Passion, and Purpose',
    resume: null,
    categories: {
      makePeopleAwesome: true,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Delivering-Happiness-Profits-Passion-Purpose/dp/160941280X'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('bookOfBusiness.jpg'),
    title: 'The Book of Business Awesome / The Book of Business UnAwesome',
    categories: {
      makePeopleAwesome: true,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Book-Business-Awesome-UnAwesome/dp/1118315227'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('simon_tavik_frantisek.jpg'),
    title: 'Psychological Safety and Learning Behavior in Work Teams',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Performance/Edmondson%20Psychological%20safety.pdf'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('whatGoogleLearned.jpg'),
    title: 'What Google Learned From Its Quest to Build the Perfect Team',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.nytimes.com/2016/02/28/magazine/what-google-learned-from-its-quest-to-build-the-perfect-team.html?_r=0'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('fiveKeys.jpg'),
    title: 'The Five Keys to a Successful Google Team',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'https://rework.withgoogle.com/blog/five-keys-to-a-successful-google-team/'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('preAccidentInvestigations.jpg'),
    title: 'Pre-Accident Investigations: An Introduction to Organizational Safety',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Pre-Accident-Investigations-Introduction-Organizational-Safety/dp/1409447820'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('justCulture.jpg'),
    title: 'Just Culture: Balancing Safety and Accountability',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Just-Culture-Balancing-Safety-Accountability/dp/1409440605/'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('driftIntoFailure.jpg'),
    title: 'Drift into Failure: From Hunting Broken Components to Understanding Complex Systems',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Drift-into-Failure-Components-Understanding/dp/1409422216'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('leanStartup.jpg'),
    title: 'The Lean Startup: How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses',
    cssClass: 'onTop',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: true,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898/'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('experimentationMatters.jpg'),
    title: 'Experimentation Matters: Unlocking the Potential of New Technologies for Innovation',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: true,
      deliverValueContinuously: false
    },
    url: 'http://www.amazon.com/Experimentation-Matters-Unlocking-Technologies-Innovation/dp/1578517508'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('continuousDelivery.jpg'),
    title: 'Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: true
    },
    url: 'http://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912/'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('kanban.jpg'),
    title: 'Kanban: Successful Evolutionary Change for Your Technology Business',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: true
    },
    url: 'http://www.amazon.com/Kanban-Successful-Evolutionary-Technology-Business/dp/0984521402'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('continuousDeplyment.jpg'),
    title: 'Continuous Deployment at IMVU: Doing the impossible fifty times a day',
    categories: {
      makePeopleAwesome: false,
      makeSafetyAPrerequisite: false,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: true
    },
    url: 'http://timothyfitz.com/2009/02/10/continuous-deployment-at-imvu-doing-the-impossible-fifty-times-a-day/'
  },
  {
    thumbnail: getLearnMoreEntryThumbNail('yourBrainAtWork.jpg'),
    title: 'Your Brain At Work: Strategies for overcoming distractaion, regaining focus, and working smarter all day long',
    cssClass: 'onTop',
    categories: {
      makePeopleAwesome: true,
      makeSafetyAPrerequisite: true,
      experimentAndLearnRapidly: false,
      deliverValueContinuously: false
    },
    url: 'http://www.your-brain-at-work.com/'
  }
];
