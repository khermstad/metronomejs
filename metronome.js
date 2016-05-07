// metronome built using Tone.js
// krishermstad@gmail.com

var tempVolume; // holds previous volume while on mute
var mute = 0;   // flag to check for muted
var currentBeat = 0; // flag to keep track of currentBeat default:0 - 4/4 -- 1/2/3/4

// first set basic values, timesig, and bpm
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.bpm.value = 120; // default bpm

// click sound
// click built from Tone.NoiseSynth
var click = new Tone.NoiseSynth({
    "volume" : -10,
    "octaves": 14,
    "envelope" : {
        "attack" : 0.001,
        "decay" : 0.2,
        "sustain" : 0
    },
    "filterEnvelope" : {
        "attack" : 0.001,
        "decay" : 0.1,
        "sustain" : 0
    }
}).toMaster();

//loop for click
var loop = new Tone.Loop(function(time){
    click.triggerAttackRelease();
    updateBeat(); // updates currentBeat for Visual Metronome (and maybe other uses later?)
}, "4n").start(0);

//muteVolume():
// mute: 0 = mute off. mute: 1 = mute on.
// tempVolume holds volume before muting
// so that it can retain original volume on unmute
function muteVolume(){
    if (mute == 0){
        mute = 1;
        tempVolume = click.volume.value;
        click.volume.value = -100;
    }
    else {
        mute = 0;
        click.volume.value = tempVolume;
    }
}

//changeVolume(val):
// adjusts volume of click
function changeVolume(val){
    var currentVolume = click.volume.value;
    var newVolume = currentVolume + val;
    if (newVolume < -60){
        newVolume = -60;
    }
    if (newVolume > 20){
        newVolume = 20;
    }
    click.volume.value = newVolume;
    return newVolume;
}

// changeBpm(val):
// adjusts Tone.Transport.bpm.value
function changeBpm(val) {
    var bpm = document.getElementById('bpm').value;
    var new_bpm = parseInt(bpm,10) + val;
    if (new_bpm < 0) {
        new_bpm = 0;
    }
    Tone.Transport.bpm.value = new_bpm; // update metronomes bpm
    document.getElementById('bpm').value = new_bpm;
    return new_bpm;
}

// play()
function play(){
    currentBeat = 1;
    Tone.Transport.start();
}

// stop()
function stop(){
    currentBeat = 0;
    updateBeat();
    Tone.Transport.stop();
}

// updateBeat():
// changes img of current visual metronome

function updateBeat(){
    if (currentBeat == 0){
        document.getElementById('circle1').src = "./img/circle50x50e.png";
        document.getElementById('circle2').src = "./img/circle50x50e.png";
        document.getElementById('circle3').src = "./img/circle50x50e.png";
        document.getElementById('circle4').src = "./img/circle50x50e.png";
    }
    if (currentBeat == 1){
        document.getElementById('circle1').src = "./img/circle50x50f.png";
        document.getElementById('circle4').src = "./img/circle50x50e.png";
        currentBeat = 2;
    }
    else if (currentBeat == 2){
        document.getElementById('circle2').src = "./img/circle50x50f.png";
        document.getElementById('circle1').src = "./img/circle50x50e.png";
        currentBeat = 3;
    }
    else if (currentBeat == 3){
        document.getElementById('circle3').src = "./img/circle50x50f.png";
        document.getElementById('circle2').src = "./img/circle50x50e.png";
        currentBeat = 4;
    }
    else if (currentBeat == 4){
        document.getElementById('circle4').src = "./img/circle50x50f.png";
        document.getElementById('circle3').src = "./img/circle50x50e.png";
        currentBeat = 1;
    }
}

// reset():
// resets all values to default, also stops if playing.
function reset(){
    Tone.Transport.stop();
    click.volume.value = -10; // changes volume back to default value
    document.getElementById('bpm').value = 120; // sets new bpm to bpm textfield
    Tone.Transport.bpm.value = 120; // sets global bpm back to 120
    currentBeat = 0;
    updateBeat();
}
