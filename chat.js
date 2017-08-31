var io = require('socket.io')(4567);


let messages = [];
let servConnections = {};
io.on('connection', function (socket) {
	socket.emit('messages', messages);
	servConnections[socket.id] = [];
	socket.on('pushMessage', function (message) {
		messages.push(message);
		io.emit('messages', messages);
	});
	socket.on('connections', function (conns) {
		console.log(conns);
		servConnections[socket.id] = conns;
		let newConns = [];
		for(item in servConnections){
			newConns = newConns.concat(servConnections[item].map(JSON.stringify));
		}
		newConns = newConns.filter(function(el,i,a){if(i==a.indexOf(el))return 1;return 0}).map(JSON.parse);
		io.emit("connections",newConns)
	});
});

