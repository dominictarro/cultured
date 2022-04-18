/**
 * Generic methods for handling data.
 */

/**
 * Fisher-Yates shuffle algorithm.
 * @param {Array<Any>} array 
 * @returns Randomly sorted `array`
 */
 export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    array = deepClone(array);
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

/**
 * Array-filter method to determine if a value is its first occurrence.
 * @param {Any} value 
 * @param {Integer} index 
 * @param {Array<Any>} self 
 * @returns Boolean stating `index` points to the first occurence of `value`
 */
 export function onlyUnique(value, index, self) {
    // First occuring element == value's index is returned
    return self.indexOf(value) === index;
}

/**
 * Returns the unique values of an array.
 * @param {Array<Any>} array 
 * @returns `array`'s unique values
 */
 export function unique(array) {
    return array.filter(onlyUnique);
}

/**
 * Chooses a random value from `array`.
 * @param {Array<Any>} array 
 * @returns A random value
 */
 export function chooseRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Performs a deep clone of the data structure.
 * 
 * @param {Any} struct Any data structure
 * @returns A copy of the data structure
 */
export function deepClone(struct) {
    return JSON.parse(JSON.stringify(struct));
}

/**
 * Counts the number of occurrences of each value in an array.
 * 
 * @param {Array<String | Integer>} array 
 */
export function arrayCounts(array) {
    var counts = {};
    for (const el of array) {
        if (el in counts) {
            counts[el]++;
        } else {
            counts[el] = 1;
        }
    }
}

/**
 * Chooses `size` random elements from an array with no replacement.
 * @param {Array} array Array to select from
 * @param {Integer} size Number of elements to select
 * @returns {Array} Random subset of the array
 */
export function chooseRandomNoReplacement(array, size) {
    array = shuffle(array);
    var randomIndex = Math.floor(Math.random()*(array.length - size));
    return array.slice(randomIndex, randomIndex + size)
}