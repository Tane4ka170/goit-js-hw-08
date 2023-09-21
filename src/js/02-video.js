import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerElement = document.querySelector('iframe')
const player = new Player(playerElement)
const localStorageKey = 'videoplayer-current-time';

let savedTime = localStorage.getItem(localStorageKey);
if (savedTime) {
  player.setCurrentTime(savedTime);
}
player.on(
  'timeupdate',
  throttle(function ({ duration, percent, seconds }) {
    localStorage.setItem(localStorageKey, seconds);
  }, 1000)
);