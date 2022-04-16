/**
 * Methods for creating, operating, and completing games in the client.
 */
import { deepClone } from "./utils";
import { updateLocalGameState } from "./data";

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

/**
 * Evaluates the user's `response` against the game's true solution. Creates an array
 * of identical length populated by 'correct', 'present', or 'absent'.
 * 
 * 'correct'    = Words that are properly placed
 * 'present'    = Words that exist in the solution, but in a different place
 * 'absent'     = Words that should not be in the solution
 * 
 * Each word in the solution can be used for one evaluation. If that word is 'correct',
 * its reuse later in the response is not 'present'.
 * 
 * @param {Array<String>} gameSolution 
 * @param {Array<String>} response 
 * @returns {Array<String>} Array representing the user's results
 */
export function evaluateResponse(gameSolution, response) {
    var solution = deepClone(gameSolution);
    var evaluation = new Array(solution.length);
    var i;
    // Check 'correct' answers, then check 'present' or set 'absent'

    // Check 'correct'
    for (i = 0; i < solution.length; i++) {
        if (response[i] == solution[i]) {
            evaluation[i] = 'correct';
            // Setting the solution at index to null forces each word to be used once
            // for evaluations.
            // Example 1
            //      solution = ['HAPPY', 'GILLMORE', 'PRODUCTIONS']
            //      response = ['GILLMORE', 'HAPPY', 'GILLMORE']
            //      evaluation = ['present', 'present', 'absent']
            // 
            // If the solution contains the word more than once, it will still be
            // useable that exact number of occurences.
            // 
            // Example 2
            //      solution = ['OPRAH', 'YOU', 'GET', 'A', 'CAR', 'EVERYBODY', 'GETS', 'A', 'CAR']
            //      response = ['OPRAH', 'A', 'A', 'MOM', 'A', 'GETS', 'GILLMORE', 'CAR']
            //      evaluation = ['correct', 'present', 'present', 'absent', 'absent', 'correct', 'absent', 'correct']
            //
            // Example 3
            //      solution = ['HAPPY', 'GILLMORE', 'PRODUCTIONS']
            //      response = ['HAPPY', 'HAPPY', 'GILLMORE']
            //      evaluation = ['correct', 'absent', 'present']
            solution[i] = null;
        }
    }

    // Check for 'present' or 'absent'
    for (i = 0; i < solution.length; i++) {
        if (solution.includes(response[i])) {
            evaluation[i] = 'present';
        } else {
            evaluation[i] = 'absent';
        }
        solution[i] = null;
    }

    return evaluation;
}

/**
 * Checks if all elements of an `evaluation` are 'correct'. Returns true if so.
 * 
 * @param {Array<String>} evaluation A response's evaluation
 * @returns {Boolean} All elements == 'correct'
 */
export function evaluationIsCorrect(evaluation) {
    // Check each element of the evaluation
    // If the element is not correct, return false
    for (const el of evaluation) {
        if (el != 'correct') {
            return false;
        }
    }
    return true;
}

/**
 * Updates the `gameState` object and local instance with a response and
 * its evaluation.
 * 
 * @param {JSON} gameState 
 * @param {Array<String>} response 
 * @returns {Boolean} The response is correct
 */
export function tryResponse(gameState, response) {
    // RULE: 6 entries
    if (gameState.rowIndex > 5) {
        return false;
    }
    const responseEvaluation = evaluateResponse(gameState.meme.solution, response);
    gameState.boardState[gameState.rowIndex] = response;
    gameState.evaluations[gameState.rowIndex] = responseEvaluation;
    gameState.rowIndex++;
    const isCorrect = evaluationIsCorrect(evaluation);

    // Update status accordingly
    if (isCorrect) {
        gameState.gameStatus = "WIN";
    } else if (gameState.rowIndex > 5) {
        gameState.gameStatus = "LOSE";
    }

    // Call after evaluationIsCorrect
    // If something failed early on, will not affect local store and page can
    // be validly reloaded
    updateLocalGameState(gameState);
    return isCorrect;
}
