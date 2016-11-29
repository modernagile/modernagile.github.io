thanksTo = [
  "Joshua Kerievsky",
  "Miguel Peres",
  "Alexandre Freire",
  "Rafael Rodrigues",
  "Ingmar van Dijk",
  "Arturo Robles Maloof",
  "Di Cao",
  "Jon Brownstein, Mario",
  "Ola Ellnestam",
  "Alexey Krivitsky",
  "Amr Elssamadisy",
  "Amr Noaman",
  "Mohamed Ragab",
  "Frieh Maha",
  "Karim Mohamed Elsayed",
  "Masanori Kado",
  "Carmen Diaz Guadarrama",
  "Sergio Zamora Rubio",
  "Javier Tenorio Martínez",
  "Luis Raúl Mulato Millan",
  "Javier Garzas",
  "Ruud Wijnands",
  "Arunthep Sangvareethip",
  "Tanat Kitcharoen",
  "Jenjira Sangvareethip",
  "Pongrapee Jencharat",
  "Zuzi Sochova"
];

var thanksToUnique = thanksTo.filter(function(item, pos) {
    return thanksTo.indexOf(item) == pos;
});

function getThanksList() {
  var list = thanksToUnique.slice();
  list.sort();
  var lastPerson = list[list.length-1];
  list.pop();
  return list.join(', ') + ' and ' + lastPerson;
}

function addThanksTo(container) {
  var intro = '<strong>Made possible by the  generous translation assistance of:</strong>';
  var outro = '<p>If we missed anyone\'s name, please <a title="Contact Us" data-toggle="modal" data-target="#contactUsModal" style="cursor:pointer;">let us know</a> so we can be sure to give them the credit they deserve.</p>';
  var html = '<p>' + intro + '<br/>' + getThanksList() + '.</p>' + outro;
  $(container).append(html);
}
