/**
 * Matthieu Villard & Adriano Ruberto
 * 11.05.2016
 */

/**
 * Module dependencies.
 */
var instruments = require('./instruments');
var moment = require('moment');

/**
 * Let's define a javascript class for the musicians.
 *
 * @param uuid
 * @param instrument
 */
exports.Musician = function (uuid, instrument) {
    this.uuid = uuid;
    this.instrument = instrument;
    this.activeSince = moment();
    this.lastActivity = moment();
}

exports.play = function (play) {
    console.log("Earing sound : " + play);
    // Deserialize
    play = JSON.parse(play);
    var musician = findMusician(play.uuid);
    if(musician == null){
        musicians.push(new exports.Musician(play.uuid, instruments.findBySound(play.sound)));
    }
    else {
        musician.lastActivity = moment();
    }

}


/**
 * Transform the musicians list, keeping necessary informations to send for tcp request
 *
 */
exports.print = function () {
    var availables = [];
    for(var i = 0; i < musicians.length; i++){
        var musician = {
            uuid :  musicians[i].uuid,
            instrument :  musicians[i].instrument.name,
            activeSince :  musicians[i].activeSince.format("MM-DD-YYYY HH:mm:ss")
        };
        availables.push(musician);
    }
    return JSON.stringify(availables);
}

/**
 * Find in the musicians list the one corresponding to the uuid
 *
 * @param uuid
 */
function findMusician(uuid) {
    for(var i = 0; i < musicians.length; i++){
        if(musicians[i].uuid == uuid)
            return musicians[i];
    }
    return null;
}

/**
 * Refresh the musicians list keeping only the ones who have send a sound the last five seconds
 *
 */
function refreshMusicians() {
    var now = moment();
    for(var i = 0; i < musicians.length; i++){
        if(now.diff(musicians[i].lastActivity) > 5000) {
            musicians.splice(i, 1);
        }
    }
}

/*
 * Let's check musicians activities every 1000 ms
 */
setInterval(refreshMusicians, 1000);

// Initialize musicians list
var musicians = [];