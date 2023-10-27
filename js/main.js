const lyrics = document.getElementById("lyrics");
const audio = document.getElementById("audio");

audio.addEventListener("timeupdate", (e) => {
	const currentTime = audio.currentTime;

	for (let i = 0; i < lyrics.children.length; i++) {
		const line = lyrics.children[i];
		const nextLine = lyrics.children[i + 1];
		const startTime = parseFloat(line.getAttribute("data-time"));
		const endTime = nextLine ? parseFloat(nextLine.getAttribute("data-time")) : audio.duration;

		if (currentTime >= startTime && currentTime < endTime) {
			line.classList.add("active");
		} else {
			line.classList.remove("active");
		}
	}
});

lyrics.addEventListener("click", (e) => {
	if (e.target.tagName === "P") {
		const startTime = parseFloat(e.target.getAttribute("data-time"));
		audio.currentTime = startTime;
	}
});
