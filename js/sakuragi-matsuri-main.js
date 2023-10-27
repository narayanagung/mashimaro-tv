// Audio timestamp
const lyricTimestamps = [
	//
];

// Media player with Howler.js instead of native Javascript audio
const audio = new Howl({
	src: ["audio.mp3"],
	html5: true,
});

function playAudio() {
	audio.play();
	document.title = "Miruku o Koboshite"; //todo

	disableButton();

	for (const timestamp of lyricTimestamps) {
		timeoutIds.push(setTimeout(() => showLyrics(timestamp.id), timestamp.start * 1000)); // 1000 = 1 second
		timeoutIds.push(setTimeout(() => hideLyrics(timestamp.id), timestamp.end * 1000));
	}
}

function stopAudio() {
	audio.stop();
	document.title = "Sakuragi Matsuri Character Song"; //todo

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

		document.title = "Sakuragi Matsuri Character Song"; //todo
	}, 99999); // 1000 = 1 second
}

// Restore Play button when Stop is pressed
function enablePlayButton() {
	playButton.disabled = false;

	clearTimeout(timeoutIdStop);
}
