// tslint:disable: no-console
import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import { Game } from './Game';
import { Oni } from './Oni';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));

const oni = new Oni();
const game: Game = new Game(oni);

const httpServer = http.createServer(app);
const io = socketIO(httpServer);

io.on('connection', socket => {
    console.log(`user ${socket.id} connected`);
    socket.on('disconnect', handleDisconnect(socket));
    socket.on('hit', handleHit(socket));
    handleConnect(socket)();
});

httpServer.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

setInterval(() => {
    if (oni.health >= 0) {
        io.emit('timer_updated', { timer: game.timer });
    }
}, 1000);

const handleConnect = (socket: socketIO.Socket) => () => {
    game.addPlayer(socket.id);
    socket.emit('welcome', {
        yourPlayerId: socket.id,
        game,
    });
    socket.broadcast.emit('player_joined', {
        id: socket.id,
    });
};

const handleDisconnect = (socket: socketIO.Socket) => () => {
    console.log(`user ${socket.id} disconnected`);
    game.removePlayer(socket.id);
    socket.broadcast.emit('player_left', { id: socket.id });
};

const handleHit = (socket: socketIO.Socket) => () => {
    game.hit(socket.id);
    io.emit('damage_applied', { health: oni.health, playerId: socket.id });
    if (game.oni.health <= 0) {
        io.emit('win');
    }
};
