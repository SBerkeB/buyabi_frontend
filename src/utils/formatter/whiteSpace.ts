/**
 * Remove extra white spaces from string
 *
 * @param str string to remove white spaces
 * @returns string without extra white spaces
 */
export const removeExtraWhiteSpaces = (str: string) => {
    return str.replace(/\s+/g, ' ');
};