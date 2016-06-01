//CONFIGURATION
var maxLoopDelay = 2000;
var minLoopDelay = 200;
var wheelDiameter = 0;
var wheelMargin = 30;
var dontRepeat = false;
var mode = null;
var prevMode = null;
var principles = [
	"Make People Awesome",
	"Deliver Value Continuously",
	"Make Safety a Prerequisite",
	"Experiment & Learn Rapidly"
];

//STATE MACHINE
var currentAngle = 0;
var currentPrinciple = 0;
var transitionDuration = 0;
var beginLoopingTime = 0;
var loopingSoundFor = 0;
var animating = false;
var tickFX = null;
var enableSoundFX = false;

var context = null;
var contents = null;

function loadAudioBuffer(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
			tickFX = buffer;
			enableSoundFX = true;
		}, function() {
			//Sound file can't be loaded.
		});
	}
	request.send();
}
function playAudioBuffer(buffer) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(0);
}
function rotateWheel() {
	if(animating)
		return;

	disableWheel();
	var randAngle = (360/principles.length) * Math.round((Math.random() * 24 +12));
	var newPrinciple = ((360-((currentAngle+randAngle) % 360))/90 + 2) % principles.length;
	if (mode == "landscape")
		newPrinciple = (newPrinciple + 1) % principles.length;
	if(dontRepeat && newPrinciple == currentPrinciple) {
		randAngle += 360/principles.length;
	}
	var anglePerMs = 1;
	transitionDuration = Math.round(randAngle/anglePerMs);
	var transition = "transform "+transitionDuration+"ms ease-out";
	var transform = "rotate("+(randAngle+currentAngle)+"deg)";
	currentAngle += randAngle;
	cssTransition('#wheel', transition);
	cssTransform('#wheel', transform);
	currentPrinciple = ((360-(currentAngle % 360))/90 + 2) % principles.length;
	if (mode == "landscape")
		currentPrinciple = ((360-(currentAngle % 360))/90 + 1) % principles.length;
	var lastBubble = document.querySelector('.bubble.in');
	if(lastBubble) {
		lastBubble.classList.add('out');
		lastBubble.classList.remove('in');
		setTimeout(removeBubble, 1000);
	}
	setTimeout(addBubble, Math.round(transitionDuration*0.7));
	setTimeout(enableWheel, transitionDuration);
	startSoundLoop();
}
function disableWheel() {
	animating = true;
}
function enableWheel() {
	animating = false;
}
function addBubble() {
	var bubbleTitle = principles[currentPrinciple];
	var bubbleContent = (tips[currentPrinciple].length > 0) ? tips[currentPrinciple][Math.round(Math.random()*(tips[currentPrinciple].length-1))] : '';

	var bubble = document.createElement('div');
	bubble.classList.add('bubble');
	bubble.classList.add('in');
	bubble.classList.add('principle-'+currentPrinciple);
	if(mode == "portrait") {
		bubble.style.top = '110%';
		bubble.style.width = wheelDiameter+'px';
		bubble.style.marginLeft = -wheelDiameter/2+'px';
	}
	else {
		bubble.style.left = '110%';
		bubble.style.top = '50%';
		bubble.style.width = (window.innerWidth-wheelDiameter-3*wheelMargin)+'px';
		bubble.style.transform = 'translateY(-50%)';
	}

	var titleTag = (bubbleContent === '') ? 'h1' : 'h3'
	bubble.innerHTML = '<'+ titleTag +'>'+bubbleTitle+'</'+ titleTag +'>'+bubbleContent;
	contents.appendChild(bubble);
	setTimeout(showBubble, 10);
}
function removeBubble() {
	var lastBubble = document.querySelector('.bubble.out');
	lastBubble.parentNode.removeChild(lastBubble);
}
function showBubble() {
	var bubble = document.querySelector('.bubble.in');
	if(bubble == null || window.getComputedStyle(bubble).height == 0) {
		setTimeout(showBubble, 10);
		return;
	}
	if(mode == "portrait") {
		bubble.style.top = '110%';
		bubble.style.top = wheelDiameter + 2*wheelMargin + 'px';
	}
	else {
		bubble.style.left = wheelDiameter + 2*wheelMargin + 'px';
	}
}
function cssTransition(selector, value) {
	var element = document.querySelector(selector);
	element.style.transition = value;
}
function cssTransform(selector, value) {
	var element = document.querySelector(selector);
	element.style.transform = value;
}
Math.easeInQuad = function(t, b, c, d) {
	var ts=(t/=d)*t;
	return b+c*(ts);
}
Math.easeInCubic = function(t, b, c, d) {
	var tc=(t/=d)*t*t;
	return b+c*(tc);
}
function startSoundLoop() {
	if(!enableSoundFX)
		return;
	beginLoopingTime = Date.now();
	loopSoundFX();
}
function loopSoundFX() {
	if(Date.now()-beginLoopingTime > transitionDuration)
		return;
	var delay = Math.easeInCubic(Date.now()-beginLoopingTime, minLoopDelay, maxLoopDelay, transitionDuration);
	setTimeout(playSoundFX, delay);
}
function playSoundFX() {
	if(Date.now()-beginLoopingTime > transitionDuration)
		return;
	playAudioBuffer(tickFX);
	loopSoundFX();
}
function setup() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
	loadAudioBuffer('tick.mp3');

	contents = document.getElementById("contents");

	window.addEventListener("resize", resizeApp);
	resizeApp();
}
function setWheelDiameter() {
	if(mode == "portrait")
		wheelDiameter = parseInt(window.getComputedStyle(contents).width) - 2*wheelMargin;
	else
		wheelDiameter = Math.round((parseInt(window.getComputedStyle(contents).height) - 2*wheelMargin)*.8);
}
function addWheel() {
	var wheel = document.getElementById('wheel');
	if(wheel) {
		wheel.parentNode.removeChild(wheel);
		currentAngle = 0;
	}
	var wheel = document.createElement('div');
	wheel.id = 'wheel';
	wheel.onclick = rotateWheel;
	if(mode == "portrait")
		wheel.style.marginLeft = -wheelDiameter/2+'px';
	else
		wheel.style.marginTop = -wheelDiameter/2+'px';
	wheel.style.width = wheelDiameter+'px';
	wheel.style.height = wheelDiameter+'px';
	contents.appendChild(wheel);
}
function resizeApp() {
	prevMode = mode || getMode();
	mode = getMode();
	setWheelDiameter();
	var emW = wheelDiameter * 0.8;
	var emH = emW * 0.06;
	if(mode == "landscape")
		emH *= 1.5;
	document.body.style.fontSize = emH+'px';

	if(mode == "portrait") {
		contents.classList.add('portrait');
		contents.classList.remove('landscape');
	}
	else {
		contents.classList.add('landscape');
		contents.classList.remove('portrait');
	}
	addWheel();
	var bubble = document.querySelector('.bubble');
	if(bubble) {
		bubble.parentNode.removeChild(bubble);
		setTimeout(rotateWheel, 100);
	}
}
function resizeBubble() {
	if(animating)
		return;
	var bubble = document.querySelector('.bubble');
	if(bubble) {
		var emW = wheelDiameter * 0.8;
		var emH = emW * 0.06;
		if(mode == "landscape")
			emH *= 1.5;
		document.body.style.fontSize = emH+'px';
	}
}
function getMode() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(height > width)
		return "portrait";
	return "landscape";
}
document.addEventListener('DOMContentLoaded', function(){
	setup();
	window.scrollTo(0,1);
}, false);
