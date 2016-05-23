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
  }
];
