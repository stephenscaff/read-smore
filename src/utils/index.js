'use strict'

/**
 * Get Character Count
 * @param {string
 * @param {number}
 */
export function getCharCount(str) {
  return str.length
}

/**
 * Get Word Count
 * @param {string}
 * @param {number}
 */
export function getWordCount(str) {
  const words = removeTags(str).split(' ')
  return words.filter((word) => word.trim() !== '').length
}

/**
 * Trim whitespace
 * @param {string}
 * @param {string}
 */
export function trimSpaces(str) {
  return str.replace(/(^\s*)|(\s*$)/gi, '')
}

export function removeTags(str) {
  if (str === null || str === '') {
    return false
  }

  return str.replace(/<[^>]+>/g, '')
}
