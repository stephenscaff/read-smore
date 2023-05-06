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
  isInline: false,
  linkElement: 'a'
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
   * Is inline option
   * @private
   * @param {HTML element} el - element instance
   * @returns {Bool}
   */
  function isInline(el) {
    if (el.dataset.readSmoreInline !== undefined || options.isInline === true) {
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
    const isInlineLink = isInline(element[idx])
    const linkWrap = document.createElement('span')
    linkWrap.className = `${options.blockClassName}__link-wrap`
    linkWrap.innerHTML = linkTmpl(idx)

    if (isInlineLink) {
      handleInlineStyles(element[idx], linkWrap)
    }
    element[idx].after(linkWrap)
    setupToggleEvents(idx, isInlineLink)
  }

  /**
   * Read More Link Template
   * @param {Number} idx
   * @returns {String} - html string
   */
  function linkTmpl(idx) {
    return `
      <${options.linkElement} id="${options.blockClassName}_${idx}"
        class="${options.blockClassName}__link"
        style="cursor:pointer"
        aria-expanded="false"a
        tabIndex="0">
          ${options.moreText}
      </${options.linkElement}>
    `
  }

  /**
   * Sets up and calls click and keyup (enter key) events
   * @private
   * @param {Number} idx - index of clicked link
   * @param {Bool} isInlineLink - if link element is inline with content
   */
  function setupToggleEvents(idx, isInlineLink) {
    const link = document.querySelector(`#${options.blockClassName}_${idx}`)
    link.addEventListener('click', (event) =>
      handleToggle(event, idx, isInlineLink)
    )
    link.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) handleToggle(event, idx, isInlineLink)
    })
  }

  /**
   * Toggle event
   * @private
   * @param {Event} e - click | keyup event
   * @param {Number} idx - index of clicked link
   * @param {Bool} isInlineLink - if link element is inline with content
   */
  function handleToggle(e, idx, isInlineLink) {
    element[idx].classList.toggle('is-expanded')
    const target = e.currentTarget
    if (target.dataset.clicked !== 'true') {
      element[idx].innerHTML = settings.originalContentArr[idx]
      target.innerHTML = options.lessText
      target.dataset.clicked = true
      target.ariaExpanded = true
      if (isInlineLink) handleInlineStyles(element[idx])
    } else {
      element[idx].innerHTML = settings.truncatedContentArr[idx]
      target.innerHTML = options.moreText
      target.dataset.clicked = false
      target.ariaExpanded = false
      if (isInlineLink) handleInlineStyles(element[idx])
    }
  }

  /**
   * Add styles for inline option
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @param {HTML Elmenent} link - link wrapper element
   */
  function handleInlineStyles(el, link) {
    if (el) {
      el.lastElementChild.style.display = 'inline'
      el.style.display = 'inline'
    }
    if (link) link.style.display = 'inline'
  }

  // API
  return {
    init: init
  }
}

export default ReadSmore
