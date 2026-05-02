// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const textBox = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = document.querySelector('#explore button');
  const faceImage = document.querySelector('#explore > img');

  const synth = window.speechSynthesis;
  let voices = [];

  function loadVoices() {
    voices = synth.getVoices();
    // wipe out everything except the placeholder so we don't double up
    voiceSelect.innerHTML = '<option value="select" disabled selected>Select Voice:</option>';
    for (let i = 0; i < voices.length; i++) {
      const opt = document.createElement('option');
      opt.textContent = `${voices[i].name} (${voices[i].lang})`;
      opt.value = i;
      voiceSelect.appendChild(opt);
    }
  }

  // some browsers have voices ready right away, others fire voiceschanged later
  loadVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }

  talkButton.addEventListener('click', () => {
    const text = textBox.value;
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    const idx = voiceSelect.value;
    if (idx !== 'select' && voices[idx]) {
      utter.voice = voices[idx];
    }

    // open mouth while talking, close it when done
    faceImage.src = 'assets/images/smiling-open.png';
    utter.onend = () => {
      faceImage.src = 'assets/images/smiling.png';
    };

    synth.speak(utter);
  });
}
