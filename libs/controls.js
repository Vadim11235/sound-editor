let audioContext;

window.addEventListener('mousedown', function(event) {
	if(!event.target.classList.contains('js-control')) return;
	if(!audioContext) {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
	}

	// Создаём узел контроля громкости (усиления)
	const gainNode = audioContext.createGain();
	gainNode.gain.value = 1;

	const folder = event.target.dataset.type;
	const song = event.target.dataset.id;
	if(!song) return;

	const audio = new Audio(`samples/${folder}/${song}`);
	audio.src = `samples/${folder}/${song}`;
	// audio.controls = true;
	// audio.loop = true;
	audio.autoplay = true;
	// document.body.appendChild(audio);

	const source = audioContext.createMediaElementSource(audio);
	// source.connect(audioContext.destination);

	source.connect(gainNode);
	gainNode.connect(audioContext.destination);
});


