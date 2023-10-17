/**
 *  Capitalize the given string
 *
 * @param str string to capitalize
 * @returns capitalized string
 */
export const capitalizeString = (str: string) => {
    const lowerCaseStr = str.toLocaleLowerCase('TR');

    const capitalizedStrArray = lowerCaseStr
        .split(/\s+/g)
        .map((word) => word[0].toLocaleUpperCase('TR') + word.slice(1));

    return capitalizedStrArray.join(' ');
};