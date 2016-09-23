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

function getThanksList() {
  var list = thanksTo.slice();
  list.sort();
  var lastPerson = list[list.length-1];
  list.pop();
  return list.join(', ') + ' and ' + lastPerson;
}
function addThanksTo(container) {
  var intro = "<strong>Made possible by the  generous translation assistance of:</strong>";
  var outro = "<p>If we missed anyone's name, please let us know so we can be sure to give them the credit they deserve.</p>";
  var html = '<p>' + intro + '<br/>' + getThanksList() + '.</p>' + outro;
  $(container).append(html);
}
