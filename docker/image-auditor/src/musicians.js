/**
 * Created by matthieu.villard on 04.05.2016.
 */
var instruments = require('./instruments');

exports.Musician = function (uuid, instrument) {
    this.uuid = uuid;
    this.instrument = instrument;
    this.activeSince = Date.now();
    this.lastActivity = Date.now();
}

exports.play = function (play) {
    var musician = findMusician(play.uuid);
    if(musician == null){
        musicians.push(play.uuid, instruments.findBySound(play.sound));
        console.log(play.uuid + " started emitting : " + play.sound);
    }
    else
        musician.lastActivity = Date.now();
    refreshMusicians();
}

exports.print = function () {
    var availables = [];
    for(var i = 0; i < musicians.length; i++){
        if(Date.now() - musicians[i].lastActivity > 5000) {
            array.splice(i, 1);
        }
        else{
            var musician = {
                uuid :  musicians[i].uuid,
                instrument :  musicians[i].instrument,
                activeSince :  musicians[i].activeSince
            };
            availables.push(musician);
        }
    }
    return JSON.stringify(availables);
}

function findMusician(uuid) {
    for(var i = 0; i < musicians.length; i++){
        if(musicians[i].uuid == uuid)
            return musicians;
    }
    return null;
}

function refreshMusicians() {
    for(var i = 0; i < musicians.length; i++){
        if(Date.now() - musicians[i].lastActivity > 5000) {
            console.log(musicians[i].uuid + " stopped emitting : " + musicians[i].instrument.sound);
            array.splice(i, 1);
        }
    }
}

var musicians = [];