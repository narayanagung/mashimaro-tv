// Audio timestamp
const lyricTimestamps = [
	{ id: "Intro1", start: 0.5, end: 8 }, // 00:01-00:06
	{ id: "Intro1-1", start: 4, end: 8 },
	{ id: "Intro2", start: 8, end: 15 },
	{ id: "Intro3", start: 11, end: 15 },
	{ id: "Intro4", start: 15, end: 27 },
	{ id: "Intro4-1", start: 15, end: 27 },
	{ id: "Intro5", start: 18, end: 27 },

	{ id: "Verse1-1", start: 28, end: 35 },
	{ id: "Verse1-2", start: 31, end: 35 },
	{ id: "Verse2-1", start: 35, end: 42.5 },
	{ id: "Verse2-2", start: 38, end: 42.5 },
	{ id: "Verse3-1", start: 42.5, end: 54 },
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
	{ id: "Adlib1-1", start: 75.3, end: 77 },
	{ id: "Chorus3-1", start: 75.5, end: 83 },
	{ id: "Chorus3-2", start: 79, end: 83 },
	{ id: "Chorus4-1", start: 83, end: 90 },
	{ id: "Chorus4-1-1", start: 85, end: 90 },
	{ id: "Chorus4-1-2", start: 87.5, end: 90 },
	{ id: "Adlib1-2", start: 90, end: 93 }, // 01:30-01:33
];

// Media player with Howler.js instead of native Javascript audio
const audio = new Howl({
	src: ["audio.mp3"],
	html5: true,
});

function playAudio() {
	audio.play();
	document.title = "(Old) Sore Wa Suteki Na Showtime"; //todo

	disableButton();

	for (const timestamp of lyricTimestamps) {
		timeoutIds.push(setTimeout(() => showLyrics(timestamp.id), timestamp.start * 1000)); // 1000 = 1 second
		timeoutIds.push(setTimeout(() => hideLyrics(timestamp.id), timestamp.end * 1000));
	}
}

function stopAudio() {
	audio.stop();
	document.title = "Itou Chika Character Song"; //todo

	clearTimeouts();
	hideAllLyrics();
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
	for (const timestamp of lyricTimestamps) {
		hideLyrics(timestamp.id);
	}
}

// Onclick event on button pressed
let playButtonOnClick = document.getElementById("PlayButton");
let timeoutIdStop;

// Disable Play button after click
function disableButton() {
	playButtonOnClick.disabled = true;

	clearTimeout(timeoutIdStop);

	timeoutIdStop = setTimeout(function () {
		playButtonOnClick.disabled = false;

		document.title = "Itou Chika Character Song"; //todo
	}, 102000); // 102 second = 01:42
}

// Restore Play button when Stop is pressed
function enablePlayButton() {
	playButton.disabled = false;

	clearTimeout(timeoutIdStop);
}
