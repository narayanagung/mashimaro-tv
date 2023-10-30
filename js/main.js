audio.addEventListener("timeupdate", (e) => {
	const audio = document.getElementById("audio");
	const lyrics = document.getElementById("lyrics");

	const currentTime = audio.currentTime;

	for (let i = 0; i < lyrics.children.length; i++) {
		const line = lyrics.children[i];
		const nextLine = lyrics.children[i + line];
		const startTime = parseFloat(line.getAttribute("timestamp"));
		const endTime = nextLine ? parseFloat(nextLine.getAttribute("timestamp")) : audio.duration;

		//When the lyrics timestamp is matching the audio time : highlight the lyric
		if (currentTime >= startTime && currentTime < endTime) {
			line.classList.add("active");
			document.getElementById("overflow").style.overflowY = "scroll";

			//Auto scroll the highlighted lyric if toggle button is "ON"
			//Extremely Buggy in mobile device
			if (autoScroll) {
				document.getElementById("overflow").style.overflowY = "hidden";
				line.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		} else {
			line.classList.remove("active");
		}
	}
});

//Auto scroll toggle button default "OFF"
let autoScroll = false;

toggleAutoScroll.addEventListener("click", () => {
	const toggleAutoScroll = document.getElementById("toggleAutoScroll");
	autoScroll = !autoScroll;
	toggleAutoScroll.textContent = autoScroll ? "🔒 Lyrics Auto Scrolll ON" : "🔓 Lyrics Auto Scroll OFF";
});

//Clicking any lyrics will make the audio jump to their timestamp
lyrics.addEventListener("click", (e) => {
	if (e.target.tagName === "P") {
		const startTime = parseFloat(e.target.getAttribute("timestamp"));
		audio.currentTime = startTime;
	}
});

// Prevent the default behavior of space button & set the focus to media control
document.addEventListener("keydown", function (e) {
	if (e.key === " ") {
		e.preventDefault();
		audio.focus();
	}
});
