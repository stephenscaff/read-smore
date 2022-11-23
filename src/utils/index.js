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
  const words = str.split('  ')
  return words.filter((word) => word !== '').length
}

/**
 * Trim whitespace
 * @param {string}
 * @param {string}
 */
export function trimSpaces(str) {
  return str.replace(/(^\s*)|(\s*$)/gi, '')
}
