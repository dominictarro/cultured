/**
 * Data layer of the client application. Read & write methods.
 */
import { buildNewGameState } from './game.js';

const gameStateKey = 'cultured-game-state';
const memeStateKey = 'cultured-meme-state';
const statisticsKey = 'cultured-statistics';

// GAME STATE
/**
 * Gets the game's locally stored game state.
 * @returns {JSON} Game state JSON
 */
export function getLocalGameState() {
    try {
        console.log("Getting local game state");
        return JSON.parse(window.localStorage.getItem(gameStateKey));
    } catch(e) {
        console.log(e);
        return null;
    }
}

/**
 * Updates the locally stored game state.
 * @param {JSON} gameState Game state JSON
 */
export function updateLocalGameState(gameState) {
    console.log("Updating local game state");
    window.localStorage.setItem(gameStateKey, JSON.stringify(gameState));
}

/**
 * Gets the `gameState`. Updates and returns if expired or not initialized.
 * @returns {JSON} Game state JSON
 */
export async function getGameState() {
    var gameState = getLocalGameState();
    // New player if false
    if (gameState !== null) {
        const today = new Date().getDay();
        // Automatically converts from UTC to local time
        const dayOfLastUpdate = new Date(gameState.updatedAt).getDay();
        // Expired game if false
        if (today === dayOfLastUpdate) {
            return gameState;
        }
        console.log("Game state expired");
    } else {
        console.log("Game state does not exist");
    }
    // If it reaches here, the game expired or it is a new player
    const memeState = await getMemeState();
    gameState = buildNewGameState(memeState);
    updateLocalGameState(gameState);
    return gameState;
}

// MEME STATE
/**
 * Gets the memes' locally stored state.
 * @returns {JSON} Meme state JSON
 */
export function getLocalMemeState() {
    console.log("Getting local meme state");
    try {
        return JSON.parse(window.localStorage.getItem(memeStateKey));
    } catch(e) {
        console.log(e);
        return null;
    }
}

/**
 * Requests the server's meme state.
 * @async
 * @returns {Promise<JSON>} Meme state JSON
 */
 export async function getRemoteMemeState() {
    console.log("Getting remote meme state");
    try {
        const response = await fetch('/today');
        return response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Updates the locally stored meme state.
 * @param {JSON} memeState Meme state JSON
 */
export function updateLocalMemeState(memeState) {
    console.log("Updating local meme state");
    window.localStorage.setItem(memeStateKey, JSON.stringify(memeState));
}

/**
 * Gets the `memeState`. Updates and returns if expired or not initialized.
 * @returns {JSON} Meme state JSON
 */
export async function getMemeState() {
    var memeState = getLocalMemeState();
    // New player if false
    if (memeState !== null) {
        const today = new Date().getDay();
        // Automatically converts from UTC to local time
        const dayOfLastUpdate = new Date(memeState.updatedAt).getDay();
        // Expired game if false
        if (today === dayOfLastUpdate) {
            return memeState;
        }
        console.log("Meme state expired");
    } else {
        console.log("Meme state does not exist");
    }
    // If it reaches here, the game expired or it is a new player
    memeState = await getRemoteMemeState();
    updateLocalMemeState(memeState);
    return memeState;
}

// STATISTICS
/**
 * Gets the user's statistics data. If it does not exist, a blank statistics
 * object is stored and returned.
 * @returns {JSON} Statistics object
 */
export function getStatistics() {
    try {
        return JSON.parse(window.localStorage.getItem(statisticsKey));
    } catch (e) {
        console.log(e);
    }
    const statistics = {
        'currentStreak': 0,
        'maxStreak': 0,
        'distribution': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 'fail': 0},
        'lastWin': null
    };
    updateLocalStatistics(statistics);
    return statistics;
}

/**
 * Updates the locally store statistics object.
 * @param {*} statistics Statistics object
 */
export function updateLocalStatistics(statistics) {
    window.localStorage.setItem(statisticsKey, JSON.stringify(statistics));
}
