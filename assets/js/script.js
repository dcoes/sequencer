console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

//Organization I'm not particularly fond of, but it comes from a simple example that worked.
//It breaks up each row (div) of checkboxes into a separate instrument
const $rows = document.body.querySelectorAll('div > div'),
                notes = ['A5', 'B4', 'D3'];
                let index = 0;
			
      
      function playNote() {
				// create a synthetic computer generated sound.
				const synth = new Tone.Synth().toDestination();
				// play a note from that synth
				synth.triggerAttackRelease("C4", "8n");

			}

      function playSample(){
        //plays a sample sound file.        
        const sound = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
                
                Tone.loaded().then( () => {
	              sound.start();
				        } );
      }
    
      function playSequencer(){ 

                //right now, this is what's called an "instrument". We can replace this with a "Tone.Sampler" (see documentation)
                const synths = [
                  new Tone.Synth(),
                  new Tone.Synth(),
                  new Tone.Synth()
                ];
                
                //things specific to the synth. we can probably delete this once Tone.Sample is in place.
                synths[0].oscillator.type = 'triangle';
                synths[1].oscillator.type = 'sine';
                synths[2].oscillator.type = 'triangle';
                
                //Begins sequence using 8th notes
                Tone.Transport.scheduleRepeat(repeat, '8n');
                Tone.Transport.start();

      }


      //Function that cycles through the steps:
      function repeat(time) {
        let step = index % 8;
        for (let i = 0; i < $rows.length; i++) {
          let synth = synths[i],
              note = notes[i],
              $row = $rows[i],
              $input = $row.querySelector(`input:nth-child(${step + 1})`);
          if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
        }
        index++;
      }

            



			
			