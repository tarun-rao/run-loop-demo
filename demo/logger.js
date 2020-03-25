export default class Logger {
  log() {
    console.log(...arguments);
    document.querySelector('#log').innerHTML += `${arguments[0]} ${arguments[1]}<br/>`;
  }
}