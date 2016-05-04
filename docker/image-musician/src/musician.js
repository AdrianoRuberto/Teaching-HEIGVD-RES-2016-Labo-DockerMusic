#!/usr/bin/env node

/**
 * Module dependencies.
 */
var protocol = require('./music-protocol');
var dgram = require('dgram');
var s = dgram.createSocket('udp4');
var instruments = require('./instruments');
var uuid = require('uuid');

function Musician(instrument) {

    this.uuid = uuid.v1();
    this.instrument = instrument;


    Musician.prototype.update = function() {
        var play = {
            uuid : this.uuid,
            sound: this.instrument.sound
        };
        var payload = JSON.stringify(play);

        message = new Buffer(payload);
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
 * get a random instrument
 */
var instrument = instruments.Instruments[Math.floor((Math.random() * instruments.Instruments.length))]

/*
 * Let's create a new mucisian
 */
var m = new Musician(instrument);