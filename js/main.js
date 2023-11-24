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

			if (autoScroll) {
				document.getElementById("overflow").style.overflowY = "hidden";

				//Auto scroll using scrollIntoView
				//Works badly in mobile device and jitters if we try to manually scroll while active
				//I found a way to maybe solve this and also implement smooth scroll using React
				//I want to make this simple and static so... no rebuild!
				line.scrollIntoView({
					block: "center",
				});
			}
		} else {
			line.classList.remove("active");
		}
	}
});

//Auto scroll toggle button
let autoScroll = false;

toggleAutoScroll.addEventListener("click", () => {
	const toggleAutoScroll = document.getElementById("toggleAutoScroll");
	autoScroll = !autoScroll;
	toggleAutoScroll.textContent = autoScroll ? "🔒 Lyrics Auto Scroll ON" : "🔓 Lyrics Auto Scroll OFF";
	toggleAutoScroll.style.border = autoScroll ? "solid 2px #f1f3f4" : "solid 1px lightslategray";
	toggleAutoScroll.style.color = autoScroll ? "#f1f3f4" : "lightslategray";
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
