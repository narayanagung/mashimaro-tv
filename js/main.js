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
  { id: "Adlib1-2", start: 90, end: 93 }, // 01:30-01:33
];

// Media control
function replayAudio() {
  audio.play();
  audio.currentTime = 0;
  document.title = "🎵 Sore Wa Suteki Na Showtime";

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
