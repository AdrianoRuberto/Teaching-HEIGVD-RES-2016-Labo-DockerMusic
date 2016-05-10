/**
 * Created by matthieu.villard on 04.05.2016.
 */
var protocol = require('./music-protocol');

/*
 * We use a standard Node.js module to work with UDP
 */
var dgram = require('dgram');
var net = require('net');
var musicians = require('./musicians');

/*
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by thermometers and containing measures
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
    musicians.play(JSON.parse(msg));
});

var	server = net.createServer();

//server.on('listening',	callbackFunctionToCallWhenSocketIsBound);
server.on('connection', request);

server.listen(2205);

/*function callbackFunctionToCallWhenSocketIsBound()	{
    console.log("The	socket	is	bound	and	listening");
    console.log("Socket	value:	%j",	server.address());
}*/

function request(socket) {
    socket.write(musicians.print());
    socket.pipe(socket);
}