#!/usr/bin/env node

/**
 * Matthieu Villard & Adriano Ruberto
 * 11.05.2016
 */

/**
 * Module dependencies.
 */
var protocol = require('./music-protocol');
var dgram = require('dgram');
var s = dgram.createSocket('udp4');
var instruments = require('./instruments');
var uuid = require('uuid');

/**
 * Let's define a javascript class for the musicians.
 *
 * @param instrument
 */
function Musician(instrument) {

    this.uuid = uuid.v1();
    this.instrument = instrument;

    /**
     * Play a sound and send it to auditor
     *
     */
    Musician.prototype.update = function() {
        // Create custom object to store necessqary informations to send
        var play = {
            uuid : this.uuid,
            sound: this.instrument.sound
        };
        // Serialize object
        var payload = JSON.stringify(play);

        message = new Buffer(payload);
        // Send message and display a message
        s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
            console.log("Playing sound : " + payload + " via port " + s.address().port);
        });

    }

    /*
     * Let's take and send a sound every 1000 ms
     */
    setInterval(this.update.bind(this), 1000);
}


/*
 * get the instrument
 */
const instrument = process.argv[2];
const sound = instrument && instruments.Instruments[instrument];
if(!sound){
    console.log("ERROR - Wrong instrument");
    process.exit(1);
}

/*
 * Let's create a new musician
 */
var m = new Musician(instruments.Instruments[instrument]);
