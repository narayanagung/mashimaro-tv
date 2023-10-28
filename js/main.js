const audio = document.getElementById("audio");

audio.addEventListener("timeupdate", (e) => {
	const currentTime = audio.currentTime;
	const lyrics = document.getElementById("lyrics");

	for (let i = 0; i < lyrics.children.length; i++) {
		const line = lyrics.children[i];
		const nextLine = lyrics.children[i + line];
		const startTime = parseFloat(line.getAttribute("timestamp"));
		const endTime = nextLine ? parseFloat(nextLine.getAttribute("timestamp")) : audio.duration;

		if (currentTime >= startTime && currentTime < endTime) {
			line.classList.add("active");
			line.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		} else {
			line.classList.remove("active");
		}
	}
});

lyrics.addEventListener("click", (e) => {
	if (e.target.tagName === "P") {
		const startTime = parseFloat(e.target.getAttribute("timestamp"));
		audio.currentTime = startTime;
	}
});
