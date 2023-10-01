const audio = document.getElementById("Music");
const lyricsSections = [
  { id: "Intro1", start: 1, end: 6 },
  { id: "Intro2", start: 6, end: 10 },
  { id: "Intro3", start: 10, end: 15 },
  { id: "Intro4", start: 15, end: 23 },
];

// Media control
function replayAudio() {
  audio.play();
  audio.currentTime = 0;
  document.title = "🎵 - Sore wa Suteki na Showtime";

  for (const section of lyricsSections) {
    setTimeout(() => showLyrics(section.id), section.start * 1000);
    setTimeout(() => hideLyrics(section.id), section.end * 1000);
  }
}

// Lyrics Visibility
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

// Attach event listener to call replayAudio when needed
const replayButton = document.getElementById("ReplayButton");
if (replayButton) {
  replayButton.addEventListener("click", replayAudio);
}
