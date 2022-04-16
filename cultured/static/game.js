/**
 * Methods for creating, operating, and completing games in the client.
 */

const N_ATTEMPTS = 6;

/**
 * Constructs a word bank from the words used in all possible options.
 * 
 * @param {Array<JSON>} choices 
 * @returns {Array<string>} Array of all words in meme solutions
 */
export function buildWordBank(choices) {
    var wordBank = [];
    for (const meme of choices) {
        wordBank.push(...meme.solution);
    }
    return wordBank;
}

/**
 * Generates a new game with the options in `memeState`.
 * 
 * Game States are formatted like
 * ```json
 * {
 *      "boardState": [
 *          ["DRAKE", "BLING", "VIBE"],
 *          null, 
 *          null,
 *          null,
 *          null,
 *          null
 *      ],
 *      "evaluations": [
 *          ["correct", "present", "absent"],
 *          null,
 *          null,
 *          null,
 *          null,
 *          null
 *      ],
 *      "columns": 3,
 *      "gameStatus": "IN_PROGRESS",
 *      "hardMode": false,
 *      "rowIndex": 1,
 *      "meme": {
 *          "id": "181913649",
 *          "solution": ["DRAKE", "HOTLINE", "BLING"],
 *          "url": "https://i.imgflip.com/30b1gx.jpg"
 *      }
 * }
 * ```
 * 
 * @param {JSON} memeState 
 * @returns {JSON} State JSON
 */
export function buildNewGameState(memeState) {

    var gameState = {
        'gameStatus': "IN_PROGRESS",
        'hardMode': false,
        'rowIndex': 0,
        'meme': chooseRandom(memeState.choices)
    };
    gameState['wordBank'] = unique(buildWordBank(memeState));
    gameState['boardState'] = new Array(N_ATTEMPTS);
    gameState['evaluations'] = new Array(N_ATTEMPTS);
    gameState['columns'] = gameState.meme.solution.length;
    return gameState;
}
