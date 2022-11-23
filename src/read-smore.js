import { getWordCount, getCharCount, trimSpaces } from './utils'
;('use strict')

/**
 * Defaults
 */
const defaultOptions = {
  blockClassName: 'read-smore',
  wordsCount: 1,
  charsCount: null,
  moreText: 'Read More',
  lessText: 'Read Less',
  isInline: false
}

/**
 * ReadSmore
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
   * Get Count of characters or words.
   * Favors Characters from data att, then option, then words.
   * @param {HTML Elmenent} el - single element instance
   * @returns {Number}
   */
  function getCount(el) {
    if (el.dataset.readSmoreChars) {
      return el.dataset.readSmoreChars
    }

    if (options.charsCount) {
      return options.charsCount
    }

    if (el.dataset.readSmoreWords) {
      return el.dataset.readSmoreWords
    }

    if (options.wordsCount) {
      return options.wordsCount
    }
  }

  /**
   * Ellpise Content
   * Handles content ellipse by words or charactes
   * @param {String} str - content string.
   * @param {Number} max - Number of words||chars2 to show before truncation.
   * @param {Bool} isChars - is by chars
   */
  function ellipse(str, max, isChars = false) {
    // Trim starting/ending empty spaces
    const trimedSpaces = trimSpaces(str)

    if (isChars) {
      return trimedSpaces.split('').slice(0, max).join('') + '...'
    }

    return trimedSpaces.split(/\s+/).slice(0, max).join(' ') + '...'
  }

  /**
   * Truncate we
   * @param {HTML Elmenent} el - single element instance
   * @param {Number} i - current instance index
   */
  function truncate(el, idx) {
    const totalCount = getCount(el)

    console.log(totalCount)
    const originalContent = el.innerHTML
    const truncateContent = ellipse(
      originalContent,
      totalCount,
      el.dataset.readSmoreChars ? true : false
    )
    const originalConctentCount = el.dataset.readSmoreWords
      ? getWordCount(originalContent)
      : getCharCount(originalContent)

    settings.originalContentArr.push(originalContent)
    settings.truncatedContentArr.push(truncateContent)

    if (totalCount < originalConctentCount) {
      el.innerHTML = settings.truncatedContentArr[idx]
      let self = idx
      createLink(self)
    }
  }

  /**
   * Create Link
   * Creates and Inserts Read More Link
   * @param {number} idx - index reference of looped item
   */
  function createLink(idx) {
    const linkWrap = document.createElement('span')
    linkWrap.className = `${options.blockClassName}__link-wrap`
    linkWrap.innerHTML = `<a id=${options.blockClassName}_${idx}
                             class=${options.blockClassName}__link
                             style="cursor:pointer;">
                             ${options.moreText}
                          </a>`

    // Inset created link
    element[idx].after(linkWrap)

    // Call link click handler
    handleLinkClick(idx)
  }

  /**
   * Link Click Listener
   * @param {number} index - index of clicked link
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
