import { Oni } from './Oni';
import { Player } from './Player';

export class Game {
    public players: { [key: string]: Player } = {};
    public timer = 0;

    constructor(public oni: Oni) {}

    public hit(playerId: string) {
        if (this.timer === 0) {
            this.timer += 1;
            setInterval(() => {
                this.timer += 1;
            }, 1000);
        }
        const player = this.players[playerId];
        this.oni.takeDamage(player.damage);
    }

    public addPlayer(id) {
        this.players[id] = new Player(id);
        console.log(this.players);
    }

    public removePlayer(id) {
        delete this.players[id];
        console.log(this.players);
    }
}
