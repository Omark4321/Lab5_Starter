// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // grab the horn dropdown + the big image that shows which horn is picked
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('#expose > img');
  const audio = document.querySelector('audio');

  hornSelect.addEventListener('change', () => {
    const value = hornSelect.value;
    if (value === 'air-horn') {
      hornImage.src = 'assets/images/air-horn.svg';
      hornImage.alt = 'Air horn';
      audio.src = 'assets/audio/air-horn.mp3';
    } else if (value === 'car-horn') {
      hornImage.src = 'assets/images/car-horn.svg';
      hornImage.alt = 'Car horn';
      audio.src = 'assets/audio/car-horn.mp3';
    } else if (value === 'party-horn') {
      hornImage.src = 'assets/images/party-horn.svg';
      hornImage.alt = 'Party horn';
      audio.src = 'assets/audio/party-horn.mp3';
    }
  });
}
