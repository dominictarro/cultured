/**
 * Operations for altering and utilizing game statistics.
 */
import { updateLocalStatistics } from "./data";

/**
 * Returns the number of games lost.
 * @param {JSON} statistics Statistics object
 * @returns {Integer} Number of games lost
 */
export function gamesLost(statistics) {
    return statistics['fail'];
}

/**
 * Returns the number of games played.
 * @param {JSON} statistics Statistics object
 * @returns {Integer} Number of games played
 */
export function gamesPlayed(statistics) {
    return gamesWon(statistics) + gamesLost(statistics);
}

/**
 * Returns the number of games won.
 * @param {JSON} statistics Statistics object
 * @returns {Integer} Number of games won
 */
export function gamesWon(statistics) {
    return statistics[1]
    + statistics[2]
    + statistics[3]
    + statistics[4]
    + statistics[5]
    + statistics[6];
}

/**
 * Returns the percentage of games won.
 * @param {JSON} statistics 
 * @returns {Integer} Percentage of games won
 */
export function winPercentage(statistics) {
    const won = gamesWon(statistics);
    const lost = gamesLost(statistics);
    return Math.floor(won / (won + lost) * 100);
}

/**
 * Updates the guess distribution.
 * @param {JSON} statistics 
 * @param {JSON} gameState 
 * @returns {JSON} Statistics object
 */
export function updateDistribution(statistics, gameState) {
    if (gameState.status === 'WIN') {
        var guesses = 0;
        for (const row of gameState.boardState) {
            if (row === null) {
                break;
            }
            guesses++;
        }
        statistics.distribution[guesses]++;
    } else if (gameState.status === 'LOSE') {
        statistics.distribution['fail']++;
    }
    return statistics;
}

/**
 * Updates the win streak.
 * @param {JSON} statistics 
 * @param {JSON} gameState 
 * @returns {JSON} Statistics object
 */
export function updateStreak(statistics, gameState) {
    if (gameState.status === 'WIN') {
        if (statistics.lastWin === null) {
            statistics.currentStreak++;
        } else {
            // Increment if won yesterday, 1 if streak broken
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (new Date(statistics.lastWin).toDateString() === yesterday.toDateString()) {
                statistics.currentStreak++;
            } else {
                statistics.currentStreak = 1;
            }
        }
        statistics.lastWin = new Date().toISOString();
    } else if (gameState.status === 'LOSE') {
        statistics.currentStreak = 0;
    }
    if (statistics.currentStreak > statistics.maxStreak) {
        statistics.maxStreak = statistics.currentStreak;
    }
    return statistics;
}
