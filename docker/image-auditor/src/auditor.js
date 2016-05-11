/**
 * Matthieu Villard & Adriano Ruberto
 * 11.05.2016
 */

/**
 * Module dependencies.
 */
var protocol = require('./music-protocol');
var dgram = require('dgram');
var net = require('net');
var musicians = require('./musicians');

/**
 * Create a socket, which is used to listen for datagrams published in the multicast group
 * Each datagram is a sound played by a musician
 *
 */
var s = dgram.createSocket('udp4');
s.bind(protocol.PROTOCOL_PORT, function() {
    console.log("Auditor started listening...");
    s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

/*
 * This call back is invoked when a new datagram has arrived.
 */
s.on('message', function(msg, source) {
    musicians.play(msg);
});


/**
 * Let's define a socket for tcp requests
 *
 */
var	server = net.createServer();

server.listen(2205);

server.on('connection', request);

/**
 * Answer a tcp request, sending active musicians
 *
 * @param socket
 */
function request(socket) {
    socket.write(musicians.print());
    socket.destroy();
}