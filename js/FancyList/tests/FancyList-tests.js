module('Module', {
    setup: function(){
      fancyList = new FancyList('#fancylist-container', testData, 2, 6);
    },
    getFancyListContainer: function() {
      return $('#fancylist-container');
    }
});
QUnit.test( "List is created", function( assert ) {
  fancyList.render();
  assert.ok(this.getFancyListContainer().hasClass('fancyList'));
  assert.equal(this.getFancyListContainer().find('.fancyListEntry').length, 6);
  assert.equal($('.fancyListEntry:contains("title: Badass: Making Users Awesome")').length, 1);
});

QUnit.test( "Paginations: Controls are created", function( assert ) {
  fancyList.render();
  var pagination = this.getFancyListContainer().find('ul.pagination');
  assert.equal(pagination.length, 1);
  assert.equal(pagination.find('.pagination-button.previous').length, 1);
  assert.equal(pagination.find('.pagination-pageNumber:contains("1")').length, 1);
  assert.equal(pagination.find('.pagination-pageNumber:contains("2")').length, 1);
  assert.equal(pagination.find('.pagination-pageNumber:contains("3")').length, 1);
  assert.equal(pagination.find('.pagination-button.next').length, 1);
});

QUnit.test( "Paginations: Next button shows next page", function( assert ) {
  fancyList.render();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 0);

  var nextBtn = this.getFancyListContainer().find('.pagination-button.next');
  nextBtn.click();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 1);
});

QUnit.test( "Paginations: Clicking a page number takes to the respective page", function( assert ) {
  fancyList.render();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 0);

  var pageTwoBtn = this.getFancyListContainer().find('.pagination-pageNumber:contains("2")');
  pageTwoBtn.click();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 1);
});

QUnit.test( "Paginations: Previous button shows previous page", function( assert ) {
  fancyList.render();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 0);

  var nextBtn = this.getFancyListContainer().find('.pagination-button.next');
  nextBtn.click();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 1);

  var prevBtn = this.getFancyListContainer().find('.pagination-button.previous');
  prevBtn.click();
  assert.equal($('.fancyListEntry:contains("title: Pre-Accident Investigations: An Introduction to Organizational Safety")').length, 0);
});

QUnit.test( "Paginations: Previous button is disabled on first page", function( assert ) {
  fancyList.render();
  var prevBtn = this.getFancyListContainer().find('.pagination-button.previous');
  assert.ok(prevBtn.parent().hasClass('disabled'));
});

QUnit.test( "Paginations: Next button is disabled on last page", function( assert ) {
  fancyList.render();

  var pageThreeBtn = this.getFancyListContainer().find('.pagination-pageNumber:contains("3")');
  pageThreeBtn.click();

  var nextBtn = this.getFancyListContainer().find('.pagination-button.next');
  assert.ok(nextBtn.parent().hasClass('disabled'));
});
