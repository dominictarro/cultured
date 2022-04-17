/**
 * Data layer of the client application. Read & write methods.
 */
import { buildNewGameState } from './game.js';

const gameStateKey = 'cultured-game-state';
const memeStateKey = 'cultured-meme-state';

/**
 * Gets the game's locally stored game state.
 * @returns {JSON} Game state JSON
 */
export function getLocalGameState() {
    try {
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
    window.localStorage.setItem(gameStateKey, JSON.stringify(gameState));
}

/**
 * Gets the `gameState`. Updates and returns if expired or not initialized.
 * 
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
    }
    // If it reaches here, the game expired or it is a new player
    const memeState = await getMemeState();
    gameState = buildNewGameState(memeState);
    updateLocalGameState(gameState);
    return gameState;
}

/**
 * Gets the memes' locally stored state.
 * @returns {JSON} Meme state JSON
 */
 export function getLocalMemeState() {
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
    window.localStorage.setItem(memeStateKey, JSON.stringify(memeState));
}


/**
 * Gets the `memeState`. Updates and returns if expired or not initialized.
 * 
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
    }
    // If it reaches here, the game expired or it is a new player
    memeState = await getRemoteMemeState();
    updateLocalMemeState(memeState);
    return memeState;
}
