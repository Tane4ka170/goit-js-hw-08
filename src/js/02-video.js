import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerElement = document.querySelector('iframe')
const player = new Player(playerElement)
const localStorageKey = 'videoplayer-current-time';

const saveCurrentTime = throttle(async () => {
    try {
        const currentTime = await player.getCurrentTime();
        localStorage.setItem(localStorageKey, currentTime);
    } catch (error) {
        console.error('Failed to save current time:', error);
    }
}, 1000);

player.on('timeupdate', saveCurrentTime)

const savedTime = localStorage.getItem(localStorageKey);
if (savedTime !== null) {
    player.setCurrentTime(savedTime);
}
player.play();