
/**
 *  Read More JS
 *  truncates text via specfied character length with more/less actions.
 *  Maintains original format of pre truncated text.
 *  @author stephen scaff
 *  @todo   Add destroy method for ajaxed content support.
 *

 */
var ReadMore =  function() {
  var s;

  return {

    settings: function() {
      return {
        content: document.querySelectorAll('.js-read-more'),
        originalContentArr: [],
        truncatedContentArr: [],
        moreLink: "Read More",
        lessLink: "Less Link",
      }
    },

    init: function() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents: function() {
      ReadMore.truncateText();
    },

    /**
     * Count Words
     * Helper to handle word count.
     * @param {string} str - Target content string.
     */
    countWords: function(str) {
      return str.split(/\s+/).length;
    },

    /**
     * Ellpise Content
     * @param {string} str - content string.
     * @param {number} wordsNum - Number of words to show before truncation.
     */
    ellipseContent: function(str, wordsNum) {
      return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
    },

    /**
     * Truncate Text
     * Truncate and ellipses contented content
     * based on specified word count.
     * Calls createLink() and handleClick() methods.
     *
     */
    truncateText: function() {

      for (var i = 0; i < s.content.length; i++) {
        //console.log(s.content)
        var originalContent = s.content[i].innerHTML;
        var numberOfWords = s.content[i].dataset.rmWords;
        var truncateContent = ReadMore.ellipseContent(originalContent, numberOfWords);
        var originalContentWords = ReadMore.countWords(originalContent);

        s.originalContentArr.push(originalContent);
        s.truncatedContentArr.push(truncateContent);

        if (numberOfWords < originalContentWords) {
          s.content[i].innerHTML = s.truncatedContentArr[i];
          var self = i;
          ReadMore.createLink(self)
        }
      }
      ReadMore.handleClick(s.content);
    },

    /**
     * Create Link
     * Creates and Inserts Read More Link
     * @param {number} index - index reference of looped item
     */
    createLink: function(index) {
      var linkWrap = document.createElement('span');

      linkWrap.className = 'read-more__link-wrap';

      linkWrap.innerHTML = '<a id="read-more_'
        + index
        + '" class="read-more__link" style="cursor:pointer;">'
        + s.moreLink
        + '</a>';

      // Inset created link
      s.content[index].parentNode.insertBefore(linkWrap, s.content[index].nextSibling);

    },

    /**
     * Handle Click
     * Toggle Click eve
     */
    handleClick: function(el) {
      var readMoreLink = document.querySelectorAll('.read-more__link');

      for (var j = 0, l = readMoreLink.length; j < l; j++) {

        readMoreLink[j].addEventListener('click', function() {

          var moreLinkID = this.getAttribute('id');
          var index = moreLinkID.split('_')[1];

          el[index].classList.toggle('is-expanded');

          if (this.dataset.clicked !== 'true') {
             el[index].innerHTML = s.originalContentArr[index];
             this.innerHTML = s.lessLink;
             this.dataset.clicked = true;
          } else {
            el[index].innerHTML = s.truncatedContentArr[index];
            this.innerHTML = s.moreLink;
            this.dataset.clicked = false;
          }
        });
      }
    },

    /**
     * Open All
     * Method to expand all instances on the page.
     */
    openAll: function() {
      el = document.querySelectorAll('.read-more__link');
        for (var i = 0; i < el.length; i++) {
          content[i].innerHTML = s.truncatedContentArr[i];
          el[i].innerHTML = s.moreLink;
        }
      }
    }
  }();

// if (document.querySelector('.js-read-more')) {
//   ReadMore.init();
// }
