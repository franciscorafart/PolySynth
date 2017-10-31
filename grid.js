// This app is a grid interface to play a synth with your computer keyboard. It has polyphonic funcionality, meaning it keeps track of
// different oscillators, allowing the user to play multiple notes at a time. Built with the Web Audio API

var total = 0;
var x=0;
var pow12 = (1/12);
var a = Math.pow(2,pow12);
var freq = 0;
var initialFreq = 200;
var initialVol = 0;
var animIndex = 0;

//Polyphonic variables
//Create 8 oscillators and connect them

//oscillator
//Audio API 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
// create Oscillator and gain node
var oscillatorArray = [];
var gainNodeArray = [];

var arrayKeys = [0,0,0,0,0,0,0,0];//to keep track of the key associated with each oscillator
var keyAllowed = {};//To allow multiple keystrokes without repeating

//Array of gain nodes and oscillators
for (var i = 0; i < 8; i++) {
  oscillatorArray[i] = audioCtx.createOscillator();
  gainNodeArray[i] = audioCtx.createGain();
}
//Here I'm going to connect each gain and oscillator, and connect that to the aucdioCtx destination

for (var i=0; i < 8; i++){
  oscillatorArray[i].connect(gainNodeArray[i]);
  gainNodeArray[i].connect(audioCtx.destination);
  gainNodeArray[i].gain.value = 0; //set
  oscillatorArray[i].start(0);
  oscillatorArray[i].frequency.value = initialFreq;
  oscillatorArray[i].type = 'sawtooth';
}


$(document).ready(function(){
  
//Fade in of logo
  $('img').fadeIn(4000);
  const animationId = setInterval(startAnimation,60);

  //A button grid animation to start off the user experience
  function startAnimation(){
    if(animIndex > 31){
      $('.grid>span')[31].style.background = 'black';
      // $('h2').fadeIn(1000);
      clearInterval(animationId);

    } else {
      $('.grid>span')[animIndex].style.background = 'yellow';

      if(animIndex>0){
        const prev = animIndex - 1;
        $('.grid>span')[prev].style.background = 'black';
      }
      animIndex +=1;
    }
  }
});

//Add Keydown listeners
$( "body" ).keydown(function( event ) {


  //To allow different keys to be pressed without repeating the same when held down
  if (keyAllowed [event.which] === false) return;
  keyAllowed [event.which] = false;
  
  //Assign key to key array at indexOsci
  var indexHere = arrayKeys.indexOf(0); //We look for the 0
  arrayKeys[indexHere]= event.which; //We assign the key number to that index
  console.log("Key: "+arrayKeys[indexHere]);
  //Use indexHere to start the oscilator

  //switch that selects the individual keys. indexHere is to specify which oscillator of the array plays the note. In this way we can turn
  //off that particular oscillator when the key is released.
  switch (event.which){
    case 49://1
    playWithKey(0,indexHere);
    break;

    case 50://2
    playWithKey(1,indexHere);
    break;

    case 51://3
    playWithKey(2,indexHere);
    break;

    case 52://4
    playWithKey(3,indexHere);
    break;

    case 53://5
    playWithKey(4,indexHere);
    break;

    case 54://6
    playWithKey(5,indexHere);
    break;

    case 55://7
    playWithKey(6,indexHere);
    break;

    case 56://8
    playWithKey(7,indexHere);
    break;

    case 81://Q
    playWithKey(8,indexHere);
    break;

    case 87://W
    playWithKey(9,indexHere);
    break;

    case 69://E
    playWithKey(10,indexHere);
    break;

    case 82://R
    playWithKey(11,indexHere);
    break;

    case 84://T
    playWithKey(12,indexHere);
    break;

    case 89://Y
    playWithKey(13,indexHere);
    break;

    case 85://U
    playWithKey(14,indexHere);
    break;

    case 73://i
    playWithKey(15,indexHere);
    break;

    case 65://A
    playWithKey(16,indexHere);
    break;

    case 83://S
    playWithKey(17,indexHere);
    break;

    case 68://D
    playWithKey(18,indexHere);
    break;

    case 70://F
    playWithKey(19,indexHere);
    break;

    case 71://G
    playWithKey(20,indexHere);
    break;

    case 72://H
    playWithKey(21,indexHere);
    break;

    case 74://J
    playWithKey(22,indexHere);
    break;

    case 75://K
    playWithKey(23,indexHere);
    break;
    case 90://Z
    playWithKey(24,indexHere);
    break;

    case 88://X
    playWithKey(25,indexHere);
    break;

    case 67://C
    playWithKey(26,indexHere);
    break;

    case 86://V
    playWithKey(27,indexHere);
    break;

    case 66://B
    playWithKey(28,indexHere);
    break;

    case 78://N
    playWithKey(29,indexHere);
    break;

    case 77://M
    playWithKey(30,indexHere);
    break;

    case 188://,
    playWithKey(31,indexHere);
    break;
  }
  });

  //Keyup listener
  $( "body" ).keyup(function( event ){
    //Allowed back
    keyAllowed [event.which] = true;

    //Looking for the deactivated oscillator
    var keyOff = event.which;
    var indexHere = arrayKeys.indexOf(keyOff);
    arrayKeys[indexHere] = 0;

      //switch to stop notes of particular keys
    switch(event.which){
      case 49://1
      stopPlayWithKey(0,indexHere);
      break;

      case 50:
      stopPlayWithKey(1,indexHere);
      break;

      case 51:
      stopPlayWithKey(2,indexHere);
      break;

      case 52:
      stopPlayWithKey(3,indexHere);
      break;
      case 53://5
      stopPlayWithKey(4,indexHere);
      break;

      case 54://6
      stopPlayWithKey(5,indexHere);
      break;

      case 55://7
      stopPlayWithKey(6,indexHere);
      break;

      case 56://8
      stopPlayWithKey(7,indexHere);
      break;

      case 81://Q
      stopPlayWithKey(8,indexHere);
      break;

      case 87://W
      stopPlayWithKey(9,indexHere);
      break;

      case 69://E
      stopPlayWithKey(10,indexHere);
      break;

      case 82://R
      stopPlayWithKey(11,indexHere);
      break;

      case 84://T
      stopPlayWithKey(12,indexHere);
      break;

      case 89://Y
      stopPlayWithKey(13,indexHere);
      break;

      case 85://U
      stopPlayWithKey(14,indexHere);
      break;

      case 73://i
      stopPlayWithKey(15,indexHere);
      break;

      case 65://A
      stopPlayWithKey(16,indexHere);
      break;

      case 83://S
      stopPlayWithKey(17,indexHere);
      break;

      case 68://D
      stopPlayWithKey(18,indexHere);
      break;

      case 70://F
      stopPlayWithKey(19,indexHere);
      break;

      case 71://G
      stopPlayWithKey(20,indexHere);
      break;

      case 72://H
      stopPlayWithKey(21,indexHere);
      break;

      case 74://J
      stopPlayWithKey(22,indexHere);
      break;

      case 75://K
      stopPlayWithKey(23,indexHere);
      break;
      case 90://Z
      stopPlayWithKey(24,indexHere);
      break;

      case 88://X
      stopPlayWithKey(25,indexHere);
      break;

      case 67://C
      stopPlayWithKey(26,indexHere);
      break;

      case 86://V
      stopPlayWithKey(27,indexHere);
      break;

      case 66://B
      stopPlayWithKey(28,indexHere);
      break;

      case 78://N
      stopPlayWithKey(29,indexHere);
      break;

      case 77://M
      stopPlayWithKey(30,indexHere);
      break;

      case 188://,
      stopPlayWithKey(31,indexHere);
      break;
    }
  });

  //Function to allow multiple key strokes without repeating when held

  //Functions for playing sound from oscillator. Takes a number that represents a semitone from the fundamental, and an oscillator
  function playWithKey(x,osci){
    $('.grid>span')[x].style.background = 'yellow';
    //Calculate which frequency corresponds to that semitone number from the fundamental
    freq = 440*(Math.pow(a,x));
    oscillatorArray[osci].frequency.value = freq;
    gainNodeArray[osci].gain.value = 0.2;
  }
  function stopPlayWithKey(x,osci){
    $('.grid>span')[x].style.background = 'black';
    gainNodeArray[osci].gain.value = 0;
  }

//Functions to allow the user to play the notes with the mouse
//Call function with particular cell name with mouse
$(".grid>span").mousedown(
  function playCell(){
    var index = $( "span" ).index( this );
    var freq = 440*(Math.pow(a,index));
    $('span')[index].style.background = 'yellow';
    oscillatorArray[7].frequency.value = freq; //calling the last element in the array just in case they're playing with the hand too
    gainNodeArray[7].gain.value = 0.3;
  }
);
$(".grid>span").mouseup(
  function muteCell(){
    var index = $( "span" ).index( this );
    $('span')[index].style.background = 'black';
    gainNodeArray[7].gain.value = 0;
  }
);

