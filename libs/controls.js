/*
file:///home/ave11235/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/Works/Experiments/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/js%20-%20%D0%9C%D0%B8%D0%BA%D1%88%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%D0%BF%D1%83%D0%BB%D1%8C%D1%82/index.html
https://developer.mozilla.org/ru/docs/Web/API/Web_Audio_API
https://developer.mozilla.org/ru/docs/Web/API/AudioContext
https://www.w3schools.com/tags/ref_av_dom.asp
*/

const APP = {
	play: {}
};
const audio = new Audio();
let audioContext;

window.addEventListener('mousedown', function(event) {
	if(!event.target.classList.contains('js-control')) return;
	if(!audioContext) {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
	}

	const folder = event.target.dataset.type;
	const song = event.target.dataset.id;
	if(!song) return;

	audio.src = `samples/${folder}/${song}`;
	// stop(audio.src);
	stopAll();
	play(audio.src, event.target);

	// Создаём узел контроля громкости (усиления)
	const gainNode = audioContext.createGain();
	gainNode.gain.value = 1;


	const source = audioContext.createMediaElementSource(audio);
	// source.connect(audioContext.destination);

	source.connect(gainNode);
	gainNode.connect(audioContext.destination);

	audio.play();
});
audio.addEventListener('ended', function() {
	stop(this.src);
});
audio.addEventListener('timeupdate', function() {
	APP.play[this.src].track.style.height = (audio.currentTime / audio.duration).toFixed(2) * 100 + '%';
});

function play(key, button) {
	button.classList.add('active');
	const track = document.createElement('div');
	track.classList.add('time');
	button.appendChild(track);

	APP.play[key] = {
		button, track
	};
}
function stopAll() {
	for(const k in APP.play) {
		APP.play[k].button.classList.remove('active');
		APP.play[k].track.remove();
		delete APP.play[k];
	}
}
function stop(key) {
	if(!(key in APP.play)) return;
	APP.play[key].button.classList.remove('active');
	APP.play[key].track.remove();
	delete APP.play[key];
}
