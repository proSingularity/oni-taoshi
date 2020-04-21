import { Scene } from "phaser";
import * as io from "socket.io-client";
import { HealthBar } from "../components/HealthBar";
import { TimerText } from "../components/TimerText";
import { Player } from "../logic/Player";
import { GoodEndScene } from "./GoodEndScene";

interface IWelcomeEvent {
    game: {
        players: {
            [key: string]: {
                id: string;
                damage: number;
            };
        };
        oni: {
            health: number;
            maxHealth: number;
        };
        timer: number;
    };
    yourPlayerId: string;
}

interface IDamageAppliedEvent {
    health: number;
    playerId: string;
}

interface IPlayerJoinedEvent {
    id: string;
}
interface IPlayerLeftEvent {
    id: string;
}

interface ITimerUpdatedEvent {
    timer: number;
}

export class BattleScene extends Scene {
    private socket!: SocketIOClient.Socket;
    private healthBar: HealthBar;
    private players: Player[] = [];
    private myPlayerId = "N/A";
    private timer: TimerText;
    private player: Player;

    constructor() {
        super({
            key: "BattleScene",
        });
    }

    public create() {
        this.socket = io("http://92564877.ngrok.io");

        this.socket.on("welcome", (data: IWelcomeEvent) => {
            this.setHealth(data.game.oni.health);
            this.healthBar.setMaxHealth(data.game.oni.maxHealth);
            this.myPlayerId = data.yourPlayerId;
            this.players = Object.values(data.game.players).map(
                player => new Player(this, player.id)
            );
            this.player = this.players.find(p => p.id === this.myPlayerId);
            this.player.mark();
        });

        this.socket.on("player_joined", (data: IPlayerJoinedEvent) => {
            this.players.push(new Player(this, data.id));
        });

        this.socket.on("player_left", (data: IPlayerLeftEvent) => {
            const index = this.players.findIndex(x => x.id === data.id);
            this.players[index].destroy();
            this.players.splice(index, 1);
        });

        this.socket.on("timer_updated", (data: ITimerUpdatedEvent) => {
            this.timer.setTimer(data.timer);
        });

        this.socket.on("damage_applied", (data: IDamageAppliedEvent) => {
            this.setHealth(data.health);
            const attacker = this.players.find(p => p.id === data.playerId);
            attacker.hit();
        });

        this.socket.on("win", () => {
            this.scene.add("WinScene", GoodEndScene, true, {
                timer: this.timer.getTimer(),
            });
            this.scene.remove(this);
        });

        this.add.image(0, 0, "oni").setOrigin(0, 0);
        this.healthBar = new HealthBar(this);
        this.timer = new TimerText(this);
        this.input.on("pointerup", () => {
            this.player.hit();
            this.socket.emit("hit");
        });
    }

    public update() {
        this.timer.update();
        this.healthBar.update();
    }

    private setHealth(health: number) {
        this.healthBar.setHealth(health);
    }
}
