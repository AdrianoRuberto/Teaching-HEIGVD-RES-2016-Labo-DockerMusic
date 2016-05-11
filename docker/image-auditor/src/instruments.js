/**
 * Matthieu Villard & Adriano Ruberto
 * 11.05.2016
 */

/*
 * Let's define a javascript class for the instruments.
 */
exports.Instrument = function (name, sound){
    this.name = name;
    this.sound = sound;
};

/*
 * Let's define a javascript enum for the availables instruments.
 */
exports.Instruments = {
    piano: new exports.Instrument("piano", "ti-ta-ti"),
    trumpet: new exports.Instrument("trumpet", "pouet"),
    flute: new exports.Instrument("flute", "trulu"),
    violin: new exports.Instrument("violin", "gzi-gzi"),
    drum:new exports.Instrument("drum", "boum-boum")
};

exports.findBySound = function (sound) {
    var instrumentKey = Object.keys(exports.Instruments).filter(function(key) {
        return exports.Instruments[key].sound == sound;
    }).pop();
    if(instrumentKey == undefined)
        return null;
    return exports.Instruments[instrumentKey];
}


