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
    now = Date.now();
    var musician = findMusician(play.uuid);
    if(musician == null){
        musicians.push(new exports.Musician(play.uuid, instruments.findBySound(play.sound)));
    }
    else
        musician.lastActivity = Date.now();
    refreshMusicians();
}

exports.print = function () {
    now = Date.now();
    var availables = [];
    for(var i = 0; i < musicians.length; i++){
        if(now - musicians[i].lastActivity > 5000) {
            musicians.splice(i, 1);
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
        if(now - musicians[i].lastActivity > 5000) {
            musicians.splice(i, 1);
        }
    }
}

var now;
var musicians = [];