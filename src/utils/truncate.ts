
  /**
 * Truncates a string to a specified length and appends an ellipsis if the string is too long.
 * @param {string} str - The string to be truncated.
 * @param {number} maxLength - The maximum length of the truncated string.
 * @param {string} [ellipsis='...'] - The string to append to the truncated string (default is '...').
 * @returns {string} The truncated string with ellipsis if applicable.
 */
export const truncateString = (str: string, maxLength: number, ellipsis = '...') => {
    if (str.length <= maxLength) {
      return str
    }
    return str.substring(0, maxLength - ellipsis.length) + ellipsis
  }