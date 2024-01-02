// Set the timestamp
audio.addEventListener("timeupdate", (e) => {
	const audio = document.querySelector("#audio");
	const lyrics = document.querySelector("#lyrics");

	const currentTime = audio.currentTime;

	for (let i = 0; i < lyrics.children.length; i++) {
		const line = lyrics.children[i];
		const nextLine = lyrics.children[i + 1];
		const startTime = parseFloat(line.getAttribute("timestamp"));
		const endTime = nextLine ? parseFloat(nextLine.getAttribute("timestamp")) : audio.duration;

		//When the lyrics timestamp is matching the audio time : highlight the lyric
		if (currentTime >= startTime && currentTime < endTime) {
			line.classList.add("active");
			if (autoScroll) {
				//Auto scroll using scrollIntoView
				line.scrollIntoView({
					block: "center",
				});
			}
		} else {
			line.classList.remove("active");
			line.style.opacity = "1";
		}
	}
});

//Auto scroll toggle
let autoScroll = false;

toggleAutoScroll.addEventListener("click", () => {
	const toggleAutoScroll = document.querySelector("#toggleAutoScroll");
	autoScroll = !autoScroll;
	if (autoScroll) {
		toggleAutoScroll.textContent = "🔒 Scroll";
		toggleAutoScroll.style.border = "solid 2px #f1f3f4";
		// Lock html scrollbar
		document.querySelector("html").style.overflowY = "clip";
	} else {
		toggleAutoScroll.textContent = "🔓 Scroll";
		toggleAutoScroll.style.border = "solid 2px #1a1a1a";
		document.querySelector("html").style.overflowY = "visible";
	}
});

// Repeat toggle
toggleRepeat.addEventListener("click", () => {
	const audio = document.querySelector("#audio");
	const toggleRepeat = document.querySelector("#toggleRepeat");
	audio.loop = !audio.loop;
	if (audio.loop) {
		toggleRepeat.textContent = "🔁 Repeat";
		toggleRepeat.style.border = "solid 2px #f1f3f4";
	} else {
		toggleRepeat.textContent = "🟦 Repeat";
		toggleRepeat.style.border = "solid 2px #1a1a1a";
	}
});

// Full screen toggle
document.addEventListener("fullscreenchange", () => {
	const overflow = document.querySelector("#overflow");
	if (document.fullscreenElement) {
		overflow.style.maxHeight = "78vh";
		toggleFullscreenButton.innerHTML = "<sup>↘</sup><sub>↖</sub>";
		toggleFullscreenButton.style.border = "solid 2px #f1f3f4";
	} else {
		overflow.style.maxHeight = "40vh";
		toggleFullscreenButton.innerHTML = "<sup>↖</sup><sub>↘</sub>";
		toggleFullscreenButton.style.border = "solid 2px #1a1a1a";
	}
});

// Clicking any lyrics will make the audio jump to their timestamp
lyrics.addEventListener("click", (e) => {
	if (e.target.tagName === "P") {
		const startTime = parseFloat(e.target.getAttribute("timestamp"));
		audio.currentTime = startTime;
	}
});

// Prevent the default behavior of space key on the keyboard (set the focus to the play audio)
document.addEventListener("keydown", function (e) {
	if (e.key === " ") {
		e.preventDefault();
		audio.focus();
	}
});

// Handle the fullscreen for most browser
const toggleFullscreenButton = document.querySelector("#toggleFullscreenButton");
const lyricsContainer = document.querySelector(".lyrics-container");

toggleFullscreenButton.addEventListener("click", () => {
	toggleFullscreen();
});

function toggleFullscreen() {
	if (document.fullscreenElement) {
		exitFullscreen();
	} else {
		enterFullscreen();
	}
}

function enterFullscreen() {
	if (lyricsContainer.requestFullscreen) {
		lyricsContainer.requestFullscreen();
	} else if (lyricsContainer.mozRequestFullScreen) {
		lyricsContainer.mozRequestFullScreen();
	} else if (lyricsContainer.webkitRequestFullscreen) {
		lyricsContainer.webkitRequestFullscreen();
	} else if (lyricsContainer.msRequestFullscreen) {
		lyricsContainer.msRequestFullscreen();
	}
}

function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}
