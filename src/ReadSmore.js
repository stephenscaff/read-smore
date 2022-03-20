"use strict";

/**
 * Defaults
 */
const defaultOptions = {
  count: 70,
  moreText: "Read More",
  lessText: "Less Link",
  linkClass: 'read-more__link'
};

/**
 * ReadSmore
 * @param {HTML element} element
 * @param {Object} options
 * @returns
 */
function ReadSmore(element, options) {
  options = Object.assign({}, defaultOptions, options);

  settings = {
    originalContentArr: [],
    truncatedContentArr: []
  };

  /**
   * Init plugin
   * @public
   */
  function init() {
    console.log("init");
    
    truncateText(element);
  }

  /**
   * Count Words
   * Helper to handle word count.
   * @param {string} str - Target content string.
   */
  function countWords(str) {
    return str.split(/\s+/).length;
  }

  /**
   * Ellpise Content
   * @param {string} str - content string.
   * @param {number} wordsNum - Number of words to show before truncation.
   */
  function ellipseContent(str, wordsNum) {
    return str.split(/\s+/).slice(0, wordsNum).join(" ") + "...";
  }

  /**
   * Truncate Text
   * Truncate and ellipses contented content
   * based on specified word count.
   * Calls createLink() and handleClick() methods.
   */
  function truncateText(el) {
    for (let i = 0; i < el.length; i++) {
      const originalContent = el[i].innerHTML;
      const numberOfWords = el[i].dataset.readSmoreCount || options.count;
      const truncateContent = ellipseContent(originalContent, numberOfWords);
      const originalContentWords = countWords(originalContent);

      settings.originalContentArr.push(originalContent);
      settings.truncatedContentArr.push(truncateContent);

      if (numberOfWords < originalContentWords) {
        element[i].innerHTML = settings.truncatedContentArr[i];
        let self = i;
        createLink(self);
      }
    }
    handleClick(element);
  }

  /**
   * Create Link
   * Creates and Inserts Read More Link
   * @param {number} index - index reference of looped item
   */
  function createLink(index) {
    const linkWrap = document.createElement("span");

    linkWrap.className = "read-more__link-wrap";

    linkWrap.innerHTML = `<a id="read-more_${index}"
                             class="read-more__link"
                             style="cursor:pointer;">
                             ${options.moreText}
                         </a>`;

    // Inset created link
    element[index].parentNode.insertBefore(
      linkWrap,
      element[index].nextSibling
    );
  }

  /**
   * Handle Click
   * Toggle Click eve
   */
  function handleClick(el) {
    const readSmoreLink = document.querySelectorAll(`.${options.linkClass}`);

    for (let j = 0, l = readSmoreLink.length; j < l; j++) {
      readSmoreLink[j].addEventListener("click", function () {
        const moreLinkID = this.getAttribute("id");
        let index = moreLinkID.split("_")[1];

        el[index].classList.toggle("is-expanded");

        if (this.dataset.clicked !== "true") {
          el[index].innerHTML = settings.originalContentArr[index];
          this.innerHTML = options.lessText;
          this.dataset.clicked = true;
        } else {
          el[index].innerHTML = settings.truncatedContentArr[index];
          this.innerHTML = options.moreText;
          this.dataset.clicked = false;
        }
      });
    }
  }

  /**
   * Open All
   * Method to expand all instances on the page.
   * Will probably be useful with a destroy method.
   */
  function openAll() {
    const instances = document.querySelectorAll(".read-more__link");
    for (let i = 0; i < instances.length; i++) {
      content[i].innerHTML = options.truncatedContentArr[i];
      instances[i].innerHTML = options.moreLink;
    }
  }

  // API
  return {
    init: init,
  };
}

ReadSmore.options = defaultOptions;

export default ReadSmore;
