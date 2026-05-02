// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // grab the horn dropdown + the big image that shows which horn is picked
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('#expose > img');
  const audio = document.querySelector('audio');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('#expose button');

  const confetti = new JSConfetti();

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

  // update the volume icon + actual audio volume as the slider moves
  volumeSlider.addEventListener('input', () => {
    const v = Number(volumeSlider.value);
    audio.volume = v / 100;

    if (v == 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
      volumeIcon.alt = 'Volume level 0';
    } else if (v < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
      volumeIcon.alt = 'Volume level 1';
    } else if (v < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
      volumeIcon.alt = 'Volume level 2';
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
      volumeIcon.alt = 'Volume level 3';
    }
  });

  playButton.addEventListener('click', () => {
    audio.play();
    // confetti only when the party horn is the picked one
    if (hornSelect.value === 'party-horn') {
      confetti.addConfetti();
    }
  });
}
