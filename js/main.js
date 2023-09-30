const audio = document.getElementById("Music");

// Media controll
function replayAudio() {
  audio.play();
  audio.currentTime = 0;
  document.title = "🎵 - Sore wa Suteki na Showtime";
  //ToDo
  setTimeout(showText, 1000);
  setTimeout(hideText, 15000);
}
function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  document.title = "⏹️ Stoped - Mashimaro TV";

  // Also stoped the lyric
  setTimeout(hideText, 0);
}

// Lyrics Visibility
const textElement = document.getElementById("Text");
function showText() {
  textElement.style.display = "block";
}
function hideText() {
  textElement.style.display = "none";
}
