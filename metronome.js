// metronome built using Tone.js
// krishermstad@gmail.com

var tempVolume; // holds previous volume while on mute
var currentBeat = 0; // flag to keep track of currentBeat default:0 - 4/4 -- 1/2/3/4

// first set basic values, timesig, and bpm
Tone.Transport.timeSignature = 4;
Tone.Transport.bpm.value = 120; // default bpm

// click sound
// click built from Tone.NoiseSynth
var click = new Tone.NoiseSynth({
    "volume" : -20,
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
    click.triggerAttackRelease(); // triggers click once each loop
    console.log(currentBeat); // prints currentBeat to console
}, "4n").start(0);


// update BPM as slider is adjsuted
function updateBPMfromSlider(){
    // set bpm value to whatever bpmslider is currently at
    document.getElementById('bpm').value = document.getElementById('bpmslider').value;
    // set Tone.Transport.bpm after bpm is updated
    Tone.Transport.bpm.value = document.getElementById('bpm').value;
}

// updateVolume()
// updates click volume as slider is adjusted
function updateVolume(){

}	

// play()
// global play button for metronome
function play(){
    Tone.Transport.start();
}

// stop()
// global stop button for metronome
function stop(){
    Tone.Transport.stop();
}


// reset():
// resets all values to default, also stops if playing.
function reset(){
    Tone.Transport.stop();
    click.volume.value = -20; // changes volume back to default value
    document.getElementById('bpmslider').value = 120; // sets new bpm to bpm textfield
    updateBPMfromSlider();
}
