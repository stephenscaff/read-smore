'use strict';

/**
 * Count Words
 * Helper to handle word count.
 * @param {string} str - Target content string.
 */
export function countWords(str) {
  return str.split(/\s+/).length;
}

/**
 * Count Chars
 * Helper to count by character
 * @param {string} str - Target content string.
 */
export function getCharCount(str) {
  return str.length;
}

export function getWordCount(str) {
  return str.length;
}

export function noTags(str) {
  return str.replace(/(<([^>]+)>)/gi, '');
}

export function noSpacing(str) {
  return str.replace(/\s/g, '');
}

export function trimSpaces(str) {
  return str.replace(/(^\s*)|(\s*$)/gi, '');
}

export function getTagsCount(str) {
  const tags = /(<([^>]+)>)/gi;
  return ((str || '').match(tags) || []).length;
}
