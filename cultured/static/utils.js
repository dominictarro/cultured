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

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
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