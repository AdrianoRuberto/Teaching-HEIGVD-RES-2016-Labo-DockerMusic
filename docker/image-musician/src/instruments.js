/**
 * Created by matthieu.villard on 04.05.2016.
 */
/*
 * Let's define a javascript class for the instruments.
 */
exports.Instrument = function (name, sound){
    this.name = name;
    this.sound = sound;
};

/*
 * Let's define a javascript enum for the instruments.
 */
exports.Instruments = [
    new exports.Instrument("piano", "ti-ta-ti"),
    new exports.Instrument("trumpet", "pouet"),
    new exports.Instrument("flute", "trulu"),
    new exports.Instrument("flute", "trulu"),
    new exports.Instrument("drum", "boum-boum")
];

exports.findBySound = function (sound) {
    for(var i = 0; i < exports.Instruments.length; i++){
        if(exports.Instruments[i].sound == sound)
            return exports.Instruments[i];
    }
    return null;
}