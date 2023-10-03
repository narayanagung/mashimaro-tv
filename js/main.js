const audio = document.getElementById("Music");

const lyricsSections = [
  { id: "Intro1", start: 1, end: 6 }, // 00:01-00:06
  { id: "Intro2", start: 6, end: 11 },
  { id: "Intro3", start: 11, end: 15 },
  { id: "Intro4", start: 15, end: 27 },
  { id: "Intro5", start: 22, end: 27 },

  { id: "Verse1-1", start: 28, end: 35 },
  { id: "Verse1-2", start: 31, end: 35 },
  { id: "Verse2-1", start: 35, end: 42 },
  { id: "Verse2-2", start: 38, end: 42 },
  { id: "Verse3-1", start: 43, end: 54 },
  { id: "Verse3-1-1", start: 48, end: 54 },
  { id: "Verse3-2", start: 50, end: 54 },
  { id: "Verse4-1", start: 54.5, end: 61.5 }, // 00:55-01:01
  { id: "Verse4-1-1", start: 57, end: 61.5 },
  { id: "Verse4-2", start: 58.4, end: 61.5 },
  { id: "Verse4-2-1", start: 60.2, end: 61.5 },

  { id: "Chorus1-1", start: 61.5, end: 69 },
  { id: "Chorus1-2", start: 65, end: 69 },
  { id: "Chorus2-1", start: 69, end: 75.5 },
  { id: "Chorus2-1-1", start: 71, end: 75.5 },
  { id: "Chorus2-2", start: 73.5, end: 75.5 },
  { id: "Adlib1-1", start: 75.2, end: 77 },
  { id: "Chorus3-1", start: 75.5, end: 83 },
  { id: "Chorus3-2", start: 79, end: 83 },
  { id: "Chorus4-1", start: 83, end: 90 },
  { id: "Chorus4-1-1", start: 85, end: 90 },
  { id: "Chorus4-1-2", start: 87.5, end: 90 },
  { id: "Adlib1-2", start: 90, end: 93 }, // 01:30-01:33 ( full length = 01:42 = 102 seconds )
];

// Media control
function playAudio() {
  audio.play();
  document.title = "Sore Wa Suteki Na Showtime";

  disableButton();

  for (const section of lyricsSections) {
    timeoutIds.push(setTimeout(() => showLyrics(section.id), section.start * 1000)); // 1000 = 1 second
    timeoutIds.push(setTimeout(() => hideLyrics(section.id), section.end * 1000));
  }
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  document.title = "Mashimaro TV"; //todo

  clearTimeouts();
  hideAllLyrics();
}

// Lyrics visibility
function showLyrics(id) {
  const element = document.getElementById(id);

  if (element) {
    element.style.display = "block";
  }
}

function hideLyrics(id) {
  const element = document.getElementById(id);

  if (element) {
    element.style.display = "none";
  }
}

// Track timeout lyrics and reset when Stop is pressed
let timeoutIds = [];

function clearTimeouts() {
  for (const timeoutId of timeoutIds) {
    clearTimeout(timeoutId);
  }
  timeoutIds = [];
}

// Hide all the lyrics abruptly when Stop is pressed
function hideAllLyrics() {
  for (const section of lyricsSections) {
    hideLyrics(section.id);
  }
}

// Button press
const playButton = document.getElementById("PlayButton");
const stopButton = document.getElementById("StopButton");

if (playButton) {
  playButton.addEventListener("click", playAudio);
}

if (stopButton) {
  stopButton.addEventListener("click", stopAudio);
}

// Onclick event on button pressed
//
// Disable Play button after click
let playbutton = document.getElementById("PlayButton");
let timeoutIdStop;

function disableButton() {
  playbutton.disabled = true;

  clearTimeout(timeoutIdStop);

  timeoutIdStop = setTimeout(function () {
    playbutton.disabled = false;
  }, 102000); // 102 second = 01:42
}

// Restore Play button when Stop is pressed
function enablePlayButton() {
  playButton.disabled = false;

  clearTimeout(timeoutIdStop);
}
