console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") Tone.context.resume();
});

//Organization I'm not particularly fond of, but it comes from a simple example that worked.
//It breaks up each row (div) of checkboxes into a separate instrument
const rows = document.body?.querySelectorAll('div');
  console.log(rows);
  notes = ["A5", "B4", "D3"];
let index = 0;

function playNote() {
  // create a synthetic computer generated sound.
  const synth = new Tone.Synth().toDestination();
  // play a note from that synth
  synth.triggerAttackRelease("C4", "8n");
}


function playSample() {
  
  //plays a sample sound file.
  const sound = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3"
  ).toDestination();

  Tone.loaded().then(() => {
    sound.start();
  });
}

//Does work now. See console. Won't stop sound though.
function sequencer(){
  const osc = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
  
  Tone.Transport.scheduleRepeat((time) => {
    // use the callback time to schedule events
    osc.start(time).stop(time + 0.1);
  }, "8n");
  Tone.Transport.start();
}

/*
function sequencer(time){
  const sound = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3"
  ).toDestination();

    //Tone.js sequencer/timing function
  Tone.Transport.scheduleRepeat(repeat, "8n");
  // We need the line below to actually start the sequencer:
  Tone.Transport.start();
    //advances the step:
  function repeat(){
    let step = index % 8;
  }

  //checks if the checkbox is checked.
  let kickInputs = document.querySelector(".kick input:nth-child(${step + 1})");
  if(kickInputs.checked){
    kick.start();
  }
  index ++ ;

}
*/


function playSequencer(){
  const keys = new Tone.Players({
    urls: {
      0: "extra.mp3",
      1: "snare01.mp3",
      2: "kick01.mp3",
      3: "extra.mp3",
    },
    fadeOut: "64n",
    baseUrl: "assets/sound/"
  }).toDestination();
  
  //Change specifics
  document.querySelector("tone-play-toggle").addEventListener("start", () => Tone.Transport.start());
  document.querySelector("tone-play-toggle").addEventListener("stop", () => Tone.Transport.stop());
  document.querySelector("tone-slider").addEventListener("input", (e) => Tone.Transport.bpm.value = parseFloat(e.target.value));
  document.querySelector("tone-step-sequencer").addEventListener("trigger", ({ detail }) => {
    keys.player(detail.row).start(detail.time, 0, "16t");
  });
  
}


// function playSequencer() {
  

//   //DOES NOT KNOW WHAT INDEX IS, that is why it's giving the error.
//   //Begins sequence using 8th notes
//   console.log(index)
//   Tone.Transport.scheduleRepeat(repeat, "8n");
//   Tone.Transport.start();
// }

// console.log(index)
// //Function that cycles through the steps:
// function repeat(time) {
//   let step = index % 8;
//   const rows = document.body?.querySelectorAll('div > div');
//   console.log(rows);

// //right now, this is what's called an "instrument". We can replace this with a "Tone.Sampler" (see documentation)
// const synths = [new Tone.Synth(), new Tone.Synth(), new Tone.Synth()];

// //things specific to the synth. we can probably delete this once Tone.Sample is in place.
// synths[0].oscillator.type = "triangle";
// synths[1].oscillator.type = "sine";
// synths[2].oscillator.type = "triangle";

// //initializing array of synths
//   for (let i = 0; i < rows.length; i++) {
    
//     let synth = synths[i];
//       note = notes[i];
//       const row = rows[i];
//       console.log(row);
//       const input = row.querySelector(`input:nth-child(${step + 1})`);
//       console.log(input);
//     if (input.checked) synth.triggerAttackRelease(note, "8n", time);
//   }
//   index++;
// }
