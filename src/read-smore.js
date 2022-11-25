import { getWordCount, getCharCount, trimSpaces } from './utils'
;('use strict')

/**
 * Defaults
 */
const defaultOptions = {
  blockClassName: 'read-smore',
  wordsCount: 30,
  charsCount: null,
  moreText: 'Read More',
  lessText: 'Read Less',
  isInline: false
}

/**
 * ReadSmore
 * @author @stephenscaff
 * @param {HTML element} element
 * @param {Object} options
 * @returns
 */
function ReadSmore(element, options) {
  options = Object.assign({}, defaultOptions, options)

  // Internal Settings
  let settings = {
    originalContentArr: [],
    truncatedContentArr: []
  }

  /**
   * Init plugin
   * Loop over instances and begin truncation procress
   * @public
   */
  function init() {
    for (let i = 0, n = element.length; i < n; ++i) {
      truncate(element[i], i)
    }
  }

  /**
   * Is Characters
   * Utility to check if is chars mode
   *
   * @private
   * @param {HTML Elmenent} el - single element instance
   */
  function isChars(el) {
    if (
      el.dataset.readSmoreChars !== undefined ||
      options.charsCount !== null
    ) {
      return true
    }

    return false
  }

  /**
   * Get Count of characters or words.
   * Favors Characters from data att, then option, then words.
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @returns {Number}
   */
  function getCount(el) {
    if (el.dataset.readSmoreChars !== undefined) {
      return parseInt(el.dataset.readSmoreChars)
    }

    if (options.charsCount !== null) {
      return parseInt(options.charsCount)
    }

    if (el.dataset.readSmoreWords !== undefined) {
      return parseInt(el.dataset.readSmoreWords)
    }

    if (options.wordsCount !== null) {
      return parseInt(options.wordsCount)
    }
  }

  /**
   * Ellpise Content
   * Handles content ellipse by words or charactes
   * @private
   * @param {String} str - content string.
   * @param {Number} max - Number of words||chars2 to show before truncation.
   * @param {Bool} isChars - is by chars
   */
  function ellipse(str, max, isChars = false) {
    // Trim starting/ending empty spaces
    const trimedSpaces = trimSpaces(str)

    if (isChars) {
      return (
        trimedSpaces
          .split('')
          .slice(0, max - 1)
          .join('') + '...'
      )
    }

    return (
      trimedSpaces
        .split(/\s+/)
        .slice(0, max - 1)
        .join(' ') + '...'
    )
  }

  /**
   * Truncate logic
   * Gets user defined count for words/chars (set by data att, option or default),
   * gets content's count by words/chars, if defined is less than content, truncate
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @param {Number} i - current instance index
   */
  function truncate(el, idx) {
    const definedCount = getCount(el)
    const originalContent = el.innerHTML
    const truncateContent = ellipse(originalContent, definedCount, isChars(el))
    const originalContentCount = isChars(el)
      ? getCharCount(originalContent)
      : getWordCount(originalContent)

    settings.originalContentArr.push(originalContent)
    settings.truncatedContentArr.push(truncateContent)

    // bail if total count is less that original content count
    if (definedCount < originalContentCount) {
      el.innerHTML = settings.truncatedContentArr[idx]
      let self = idx
      createLink(self)
    }
  }

  /**
   * Creates and Inserts Read More Link
   * @private
   * @param {Number} idx - index reference of looped item
   */
  function createLink(idx) {
    const linkWrap = document.createElement('span')
    linkWrap.className = `${options.blockClassName}__link-wrap`
    linkWrap.innerHTML = linkTmpl(idx)
    // insert link
    element[idx].after(linkWrap)
    handleLinkClick(idx)
  }

  /**
   * Read More Link Template
   * @param {Number} idx
   * @returns {String} - html string
   */
  function linkTmpl(idx) {
    return `
      <a id="${options.blockClassName}_${idx}"
        class="${options.blockClassName}__link"
        style="cursor:pointer">
          ${options.moreText}
      </a>
    `
  }

  /**
   * More/Less Link click handler
   * @private
   * @param {Number} index - index of clicked link
   */
  function handleLinkClick(idx) {
    const link = document.querySelector(`#${options.blockClassName}_${idx}`)

    link.addEventListener('click', (e) => {
      element[idx].classList.toggle('is-expanded')
      const target = e.currentTarget
      if (target.dataset.clicked !== 'true') {
        element[idx].innerHTML = settings.originalContentArr[idx]
        target.innerHTML = options.lessText
        target.dataset.clicked = true
      } else {
        element[idx].innerHTML = settings.truncatedContentArr[idx]
        target.innerHTML = options.moreText
        target.dataset.clicked = false
      }
    })
  }

  // API
  return {
    init: init
  }
}

ReadSmore.options = defaultOptions

export default ReadSmore
