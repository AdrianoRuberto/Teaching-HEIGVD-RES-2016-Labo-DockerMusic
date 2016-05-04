

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');


const instruments = {
piano:"ti-ta-ti",
trumpet:"pouet",
flute:"trulu",
violin:"gzi-gzi",
drum:"boum-boum"
};

const instrument = process.argv[2];
const sound = instrument && instruments[instrument];
if(!sound){
	console.log("ERRROR");
	process.exit(1);
}

const soundBuffer = new Buffer(sound);

console.log(soundBuffer.toString());

function play() {

}