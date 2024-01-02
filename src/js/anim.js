// Animation when load/scroll
const homeObserver = new IntersectionObserver((homeEntry) => {
	homeEntry.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}
	});
});

// Index/Homepage
const hiddenHomeElement = document.querySelectorAll(".hidden");
hiddenHomeElement.forEach((element) => homeObserver.observe(element));
