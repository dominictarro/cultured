/**
 * Data layer of the client application. Read & write methods.
 */

const gameStateKey = 'cultured-game-state';

/**
 * Gets the game's locally stored state.
 * @returns {JSON} State JSON
 */
export function getLocalGameState() {
    return window.localStorage.getItem(gameStateKey);
}

/**
 * Updates the locally stored state.
 * @param {JSON} gameState State JSON
 */
 export function updateLocalGameState(gameState) {
    window.localStorage.setItem(gameStateKey, gameState);
}

/**
 * Requests the server's meme state.
 * @async
 * @returns {Promise<JSON>} State JSON
 */
 export async function getRemoteMemeState() {
    const response = await fetch('/today');
    return await response.json();
}

/**
 * Gets the gameState. Returns null if expired or not initialized.
 * 
 * @returns {JSON} State JSON
 */
 export function getGameState() {
    var gameState = getLocalGameState();
    // New player if false
    if (gameState != null) {
        const today = new Date().getDay();
        // Automatically converts from UTC to local time
        const dayOfLastUpdate = new Date(gameState.updatedAt).getDay();
        // Expired game if false
        if (today == dayOfLastUpdate) {
            return gameState;
        }
    }
}


