// $.fn.bitly.defaults.url = 'https://www.industriallogic.com/maAPI/bitly/bitly.php';
// function infoHandler(data) {
//     var cth = new contentTypeHandler();
//     var prw = $('#preview');
//     cth.register('html', function(d) {
//         var thumb = d.thumbnail.medium;
//         prw.css('width', '256px')
//             .append('<h1>' + d.htmlTitle + '</h1>')
//             .append('<div>' + d.htmlMetaDescription + '</div>');
//         if(thumb) {
//             var img = new Image();
//             $(img).error(function(){})
//                 .attr('src', thumb)
//                 .load( function() {
//                     prw.append(this);
//                 });
//         }
//     });
//     cth.register('jpeg', function(d) {
//             prw.append('<img src="' + d.longUrl + '"/>');
//         });
//     cth.register('mpeg', function(d) {
//             for(var label in d.id3) {
//                 prw.append('<div><span>' + label + ':</span> ' + d.id3[label] + '</div>');
//             }
//             if(d.contentLength) {
//                 var size = Math.round( d.contentLegth / 1024);
//                 prw.append('<div>Size: ' + size + ' Kb</div>');
//             }
//         });
//     for(var key in data) {
//         cth.handle( data[key]);
//     }
// }
//
// function contentTypeHandler() {
//     this.contentTypeHandlers = new Array();
// }
//
// contentTypeHandler.prototype.register = function(type, func) {
//     this.contentTypeHandlers[type] = func;
// }
// contentTypeHandler.prototype.handle = function(d) {
//     var prw = $('#preview');
//     var longUrl = d.longUrl.replace('http://', '');
//
//     if( longUrl.length > 25) {
//         longUrl = longUrl.substring(0, 25) + '&raquo;';
//     }
//     var ct = d.contentType.split('/')[1];
//     if( typeof( this.contentTypeHandlers[ct]) != 'undefined') {
//         this.contentTypeHandlers[ct](d);
//     }
//     prw.append('<div>Source: ' + longUrl + '</div>');
// };
//
// function updateCounter(msg) {
//     if( typeof(msg) == 'string') {
//         $('#counter').html(msg);
//         return true;
//     }
//     $('#counter').html('Length: ' + $('#msg').val().length);
// }
// $(document).ready( function() {
//     updateCounter();
//     $('div.shortened a').addPreview(infoHandler, {'message':'Loading data...'});
//     $('#msg').keyup( function() {
//         updateCounter();
//     });
//     $('#shortenBtn').click( function() {
//         updateCounter('shortening...');
//         $('#msg').shortenUrl( function(data) {
//             updateCounter();
//         });
//     });
// });
