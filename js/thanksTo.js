thanksTo = [
  "Joshua Kerievsky",
  "Miguel Peres",
  "Alexandre Freire",
  "Rafael Rodrigues",
  "Ingmar van Dijk",
  "Arturo Robles Maloof",
  "@Reskiebak",
  "Di Cao",
  "Jon Brownstein, Mario",
  "Ola Ellnestam",
  "Alexey Krivitsky",
  "Amr Elssamadisy",
  "Amr Noaman",
  "Mohamed Ragab",
  "Frieh Maha",
  "Karim Mohamed Elsayed",
  "Masanori Kado"
];

function addThanksTo(container) {
  thanksTo.sort();
  var lastPerson = thanksTo[thanksTo.length-1];
  thanksTo.pop();
  var intro = "<strong>This  work would not be possible without the help of:</strong>";
  var html = '<p>' + intro + '<br/>' + thanksTo.join(', ') + ' and ' + lastPerson + '.</p>';
  $(container).append(html);
}
