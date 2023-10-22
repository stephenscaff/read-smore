import { getWordCount, getCharCount, trimSpaces } from './utils'
;('use strict')

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
 * A simple Read More / Read Less js plugin that maintains origial markup.
 *
 * @author @stephenscaff
 * @param {HTML element} elements
 * @param {Object} options
 * @returns
 */
function ReadSmore(elements, options) {
  options = { ...defaultOptions, ...options }

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
    elements.forEach((element, idx) => {
      truncate(element, idx)
    })
  }

  /**
   * Is Characters
   * Utility to check if is chars mode
   *
   * @private
   * @param {HTML Elmenent} el - single element instance
   */
  function isChars(el) {
    return (
      el.dataset.readSmoreChars !== undefined || options.charsCount !== null
    )
  }

  /**
   * Is inline option
   * @private
   * @param {HTML element} el - element instance
   * @returns {Bool}
   */
  function isInline(el) {
    return el.dataset.readSmoreInline !== undefined || options.isInline === true
  }

  /**
   * Get Count of characters or words.
   * Favors Characters from data att, then option, then words.
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @returns {Number}
   */
  function getCount(el) {
    return (
      parseInt(el.dataset.readSmoreChars) ||
      parseInt(options.charsCount) ||
      parseInt(el.dataset.readSmoreWords) ||
      parseInt(options.wordsCount)
    )
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
    const trimmedSpaces = trimSpaces(str)

    if (isChars) {
      return trimmedSpaces.slice(0, max - 1) + '...'
    }

    const words = trimmedSpaces.split(/\s+/)
    return words.slice(0, max - 1).join(' ') + '...'
  }

  /**
   * Truncate logic
   * Gets user defined count for words/chars (set by data att, option or default),
   * gets content's count by words/chars, if defined is less than content, truncate
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @param {Number} idx - current instance index
   */
  function truncate(el, idx) {
    const definedCount = getCount(el)
    const originalContent = el.innerHTML
    const isCharMode = isChars(el)
    const truncateContent = ellipse(originalContent, definedCount, isCharMode)
    const originalContentCount = isCharMode
      ? getCharCount(originalContent)
      : getWordCount(originalContent)

    settings.originalContentArr.push(originalContent)
    settings.truncatedContentArr.push(truncateContent)

    if (definedCount < originalContentCount) {
      el.innerHTML = settings.truncatedContentArr[idx]
      createLink(idx)
    }
  }

  /**
   * Creates and Inserts Read More Link
   * @private
   * @param {Number} idx - index reference of looped item
   */
  function createLink(idx) {
    const isInlineLink = isInline(elements[idx])
    const linkWrap = document.createElement('span')
    linkWrap.className = `${options.blockClassName}__link-wrap`
    linkWrap.innerHTML = linkTmpl(elements[idx])

    if (isInlineLink) {
      handleInlineStyles(elements[idx], linkWrap)
    }
    elements[idx].after(linkWrap)
    setupToggleEvents(idx, isInlineLink)
  }

  /**
   * Read More Link Template
   * @param {HTML Element} el
   * @returns {String} - html string
   */
  function linkTmpl(el) {
    const moreTextData = el.dataset.readSmoreMoreText
    const moreText = moreTextData || options.moreText
    return `
      <${options.linkElement}
        class="${options.blockClassName}__link"
        style="cursor:pointer"
        aria-expanded="false"
        tabIndex="0">
          ${moreText}
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
    const link = elements[idx].nextSibling.firstElementChild
    link.addEventListener('click', (event) =>
      handleToggle(event, idx, isInlineLink)
    )
    link.addEventListener('keyup', (event) => {
      if (event.keyCode === 13 && options.linkElement === 'a')
        handleToggle(event, idx, isInlineLink)
    })
  }

  /**
   * Toggle event
   * @private
   * @param {Event} event - click | keyup event
   * @param {Number} idx - index of clicked link
   * @param {Bool} isInlineLink - if link element is inline with content
   */
  function handleToggle(event, idx, isInlineLink) {
    const moreTextData = elements[idx].dataset.readSmoreMoreText
    const lessTextData = elements[idx].dataset.readSmoreLessText
    const target = event.currentTarget
    const clicked = target.dataset.clicked === 'true'

    elements[idx].classList.toggle('is-expanded')
    elements[idx].innerHTML = clicked
      ? settings.truncatedContentArr[idx]
      : settings.originalContentArr[idx]
    target.innerHTML = clicked
      ? moreTextData || options.moreText
      : lessTextData || options.lessText
    target.dataset.clicked = !clicked
    target.ariaExpanded = !clicked

    if (isInlineLink) handleInlineStyles(elements[idx])
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
